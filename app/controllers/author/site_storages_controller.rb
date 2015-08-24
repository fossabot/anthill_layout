require 'fileutils'
require 'uuid'

class Author::SiteStoragesController < Author::AuthorController

  include Author

  before_action :authenticate_user!, except: [:show]
  before_action :set_author_site_storage,
                only: [
                    :show, :edit, :update, :activate, :destroy, :publish
                ]

  layout :resolve_layout

  # GET /author/site_storages
  # GET /author/site_storages.json
  def index
    @author_site_storages = current_user.author_site_storages.includes(
        :author_site_type,
        :author_widgets,
        :author_site_versions
    ).all.order(:key)
  end

  # GET /author/site_storages/1
  # GET /author/site_storages/1.json
  def show
    @storage = {}
    if File.exist?(@target_path)
      @storage = @author_site_storage.fetch_data

      mode = SiteType.find_by_name(params[:mode])
      @storage[:mode] = mode.name unless mode.nil?

      activated = @author_site_storage.get_activated

      unless activated.nil?
        @storage[:version] = activated.version
        @storage[:content] = activated.content
      end

    end unless @author_site_storage.nil?
  end

  # GET /author/site_storages/new
  def new
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.new
    render action: :form
  end

  # GET /author/site_storages/1/edit
  def edit
    render action: :form
  end

  # POST /author/site_storages
  # POST /author/site_storages.json
  def create

    uuid = UUID.new

    @author_site_storage = current_user.author_site_storages.build(author_site_storage_params)
    @author_site_storage[:uuid] = uuid.generate

    versions = @author_site_storage.author_site_versions
    versions.build(
        version: versions.length + 1,
        activated: true
    )

    target = get_target_url(@author_site_storage.key)
    FileUtils.cp_r "#{Rails.root}/lib/tasks/site/default", target

    respond_to do |format|
      if File.exist?(target)
        if @author_site_storage.save
          format.html { redirect_to author_site_storages_path, notice: t('success_create') }
          format.json { render :index, status: :created, location: @author_site_storage }
        else
          FileUtils.rm_r(target)
          format.html { render :form }
          format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :not_found }
      end
    end
  end

  # PATCH/PUT /author/site_storages/1
  # PATCH/PUT /author/site_storages/1.json
  def update

    versions = @author_site_storage.author_site_versions

    if request.xhr?
      versions.build({
                         version: versions.length + 1,
                         user_id: current_user.id,
                         content: params[:author_site_storage][:content],
                         activated: params[:activate] == 'true'
                     })
      params[:author_site_storage][:publish] = false
    else
      @activated = versions.where(id: params[:author_site_storage][:activated_version]).first
      params[:author_site_storage].delete :activated_version
    end

    respond_to do |format|
      if update_handler(versions)
        notice = t('success_update')
        if request.xhr?
          version = versions.last
          data = {
              storage: {
                  key: @author_site_storage.key,
                  content: version.content
              },
              version: version.version,
              activated: version.activated,
              mode: @author_site_storage.author_site_type.name,
              notice: notice
          }
          format.json {
            render json: data, status: :ok
          }
        else
          format.html { redirect_to author_site_storages_path, notice: notice }
          format.json { render :index, status: :ok, location: @author_site_storage }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      end
    end
  end

  def publish
    published = @author_site_storage.publish
    if @author_site_storage.update({publish: !published})
      respond_to do |format|
        format.html { redirect_to author_site_storages_path, notice: t('success_update') }
        format.json if request.xhr?
      end
    else
      format.json { render json: @author_site_storage.errors, status: :unprocessable_entity } if request.xhr?
      format.html { redirect_to author_site_storages_path, status: :unprocessable_entity }
    end
  end

  def activate

    respond_to do |format|
      if update_activation
        notice = t('success_activation')
        if request.xhr?
          data = {
              storage: {
                  key: @author_site_storage.key,
                  content: @version.content
              },
              version: @version.version,
              activated: @version.activated,
              mode: @author_site_storage.author_site_type.name,
              notice: notice
          }
          format.json {
            render json: data, status: :ok
          }
        else
          format.html { redirect_to author_site_storages_path, notice: notice }
          format.json { render :index, status: :ok, location: @author_site_storage }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      end

    end

  end

  # DELETE /author/site_storages/1
  # DELETE /author/site_storages/1.json
  def destroy
    FileUtils.rm_r(@target_path) if File.exist?(@target_path)

    @author_site_storage.destroy
    respond_to do |format|
      format.html { redirect_to author_site_storages_url, notice: t('success_delete') }
      format.json { head :no_content }
    end
  end

  private

  def resolve_layout
    case action_name
      when 'show'
        'application'
      else
        'author'
    end
  end

  def update_handler(versions)
    updated = false

    update_widget_connections unless request.xhr?

    author_site_storage_params[:user_id] = current_user.id

    if @author_site_storage.update(author_site_storage_params)
      updated = update_version_activation(
          @activated.nil? ?
              versions.where({activated: true}).last.version : @activated.version
      )
    end
    updated
  end

  def update_widget_connections

    widget_ids = params[:author_site_storage][:author_site_storage_widget_ids]
    widgets = Widget.find(widget_ids.reject(&:blank?)) rescue []

    @author_site_storage.author_site_storage_widgets.delete_all
    @author_site_storage.author_widgets << widgets unless widgets.blank?
    @author_site_storage.author_site_storage_widgets.update_all({user_id: current_user.id})
    params[:author_site_storage].delete :author_site_storage_widget_ids

  end

  def update_version_activation(version)

    activated = @author_site_storage.author_site_versions.where(
        activated: true
    ).first

    @version = @author_site_storage.author_site_versions.where(
        version: version
    ).first

    if activated.nil?
      puts t('undefined_activation')
      updated = false
    else
      if activated == @version
        updated = true
      else
        if activated.update({activated: false})
          updated = true
          if @version.nil?
            puts t('undefined_version')
            updated = false
          else
            updated = @version.update(
                {
                    activated: true,
                    user_id: current_user.id
                }
            ) unless activated == @version
          end
        else
          updated = false
        end
      end
    end
    updated
  end

  def update_activation

    mode = SiteType.where(
        name: params[:author_site_type][:name]
    ).first

    updated = update_version_activation(params[:author_site_version][:version])

    if mode.nil?
      puts t('undefined_mode')
      updated = false
    else
      updated = @author_site_storage.update(
          {
              site_type_id: mode.id,
              user_id: current_user.id
          }
      ) unless @author_site_storage.author_site_type == mode if updated
    end

    updated
  end

  def get_target_url(key)
    "#{Rails.root}/app/assets/javascripts/public/#{key}"
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_site_storage
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.where(key: params[:key]).first ||
        SiteStorage.where(key: params[:id]).first
    @target_path = get_target_url(@author_site_storage.key) unless @author_site_storage.nil?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_storage_params
    params.require(:author_site_storage).permit(
        :key,
        :site_type_id,
        :publish,
        :activated_version,
        author_site_storage_widget_ids: [],
        author_site_versions_attributes: [
            :id,
            :version,
            :activated
        ],
        author_site_types_attributes: [
            :name
        ]
    )
  end

end
