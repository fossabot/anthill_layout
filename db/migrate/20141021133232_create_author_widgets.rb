class CreateAuthorWidgets < ActiveRecord::Migration[5.0]
  def change
    create_table :author_widgets do |t|
      t.integer :widget_category_id
      t.string :uuid
      t.string :name
      t.text :description, limit: 16777215
      t.text :thumbnail, limit: 16777215
      t.integer :width
      t.integer :height
      t.string :resource
      t.boolean :is_external, default: false
      t.string :external_resource
      t.boolean :visible

      t.timestamps
    end
  end
end
