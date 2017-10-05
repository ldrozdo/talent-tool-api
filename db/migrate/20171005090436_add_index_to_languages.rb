class AddIndexToLanguages < ActiveRecord::Migration[5.1]
  def change
    add_index :languages, :name, unique: true
  end
end
