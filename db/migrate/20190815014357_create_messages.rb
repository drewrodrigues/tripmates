class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.integer :user_id, null: false
      t.integer :trip_id, null: false

      t.timestamps
    end

    add_index :messages, :user_id
    add_index :messages, :trip_id
  end
end
