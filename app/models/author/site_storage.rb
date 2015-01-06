class Author::SiteStorage < ActiveRecord::Base

  has_many :author_site_versions, :class_name => 'Author::SiteVersion'
  accepts_nested_attributes_for :author_site_versions, allow_destroy: true

  belongs_to :author_site_type, :class_name => 'Author::SiteType', :foreign_key => :site_type_id

  validates :key, presence: true, format: { with: /\A[a-z]+\z/ }

end