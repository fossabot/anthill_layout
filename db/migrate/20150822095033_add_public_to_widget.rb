class AddPublicToWidget < ActiveRecord::Migration[5.0]
  def change
    add_column :author_widgets, :public, :boolean, default: false
    Author::Widget.all.each {|w| w.update(public: w.is_external?)}
  end
end
