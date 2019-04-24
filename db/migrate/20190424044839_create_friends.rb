class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :user_one_id, null: false
      t.integer :user_two_id, null: false

      t.timestamps
    end

    add_index :friends, :user_one_id
    add_index :friends, :user_two_id
    add_index :friends, [:user_one_id, :user_two_id], unique: true
  end
end
