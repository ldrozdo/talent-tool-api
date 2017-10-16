class AddNameAndRoleToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :username, :string
    add_column :users, :role, :string
    add_index :users, :username
  end
end
