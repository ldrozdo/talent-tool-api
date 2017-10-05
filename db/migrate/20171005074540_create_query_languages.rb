class CreateQueryLanguages < ActiveRecord::Migration[5.1]
  def change
    create_table :query_languages do |t|
      t.belongs_to :query, index: true
      t.belongs_to :language, index: true
      t.timestamps
    end
  end
end
