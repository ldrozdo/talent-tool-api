class CreateQueries < ActiveRecord::Migration[5.1]
  def change
    create_table :queries do |t|
      t.string :name
      t.references :user
      t.text :text_of_query
      t.timestamps
    end
  end
end
