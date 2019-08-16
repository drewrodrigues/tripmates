class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :friend_one_id, null: false
      t.integer :friend_two_id, null: false

      t.timestamps
    end

    add_index :friends, %i[friend_one_id friend_two_id]
  end
end
