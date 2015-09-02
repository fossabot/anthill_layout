class AuthorSiteStoragesUsers < ActiveRecord::Migration
  def change
    create_table :author_site_storages_users, id: false do |t|
      t.belongs_to :site_storage, index: true
      t.belongs_to :user, index: true
    end
    add_column :author_site_storages, :creator_id, :integer unless column_exists?(:author_site_storages, :creator_id)
    remove_column :author_site_storages, :user_id, :integer if column_exists?(:author_site_storages, :user_id)
  end
end