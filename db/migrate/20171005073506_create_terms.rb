class CreateTerms < ActiveRecord::Migration[5.1]
  def change
    create_table :terms do |t|
      t.string :operator
      t.belongs_to :query, index: true
      t.belongs_to :category, index: true
      t.timestamps
    end
  end
end
