class Author::SiteVersion < ActiveRecord::Base

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage',
             foreign_key: :site_storage_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  def self.fetch_data(user)
    joins(:author_item).
        includes(:author_site_storage).
        where('visible=true AND (public=true OR user_id=?)', user.id).
        order('author_items.updated_at DESC')
  end

  def is_current?(activated)
    activated.version == version unless activated.nil?
  end

  def self.get_last(site_key)
    User.current.author_site_storages.where(key: site_key).
        includes(:author_item).
        first.author_site_versions.last
  end

  def self.get_activated(site_key)
    User.current.author_site_storages.where(key: site_key).
        includes(:author_item).
        first.author_site_versions.where(activated: true).first
  end

  def self.get_published(site_key)
    User.current.author_site_storages.where(key: site_key).
        includes(:author_item).
        first.author_site_versions.where(published: true).first
  end

  def deactivate
    handle_activation(false)
    self
  end

  def activate
    handle_activation(true)
    self
  end

  def deactivate_other
    self.class.where.not(id: id).update_all(activated: false)
    self
  end

  def publish
    unpublish_other
    update({published: true})
  end

  def unpublish_other
    self.class.where.not(id: id).update_all(published: false)
  end

  private

  def handle_activation(activate)
    self.update(activated: activate)
  end

end