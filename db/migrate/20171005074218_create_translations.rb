class CreateTranslations < ActiveRecord::Migration[5.1]
  def change
    create_table :translations do |t|
      t.belongs_to :language, index: true
      t.belongs_to :category, index: true
      t.text :translated_query
      t.timestamps
    end
  end
end
