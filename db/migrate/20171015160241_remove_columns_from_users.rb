class RemoveColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :name, :string
    remove_column :users, :password_digest, :string
    remove_column :users, :isAdmin, :boolean
  end
end
