class CreateApiAttendRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :attend_requests do |t|
      t.integer :trip_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :attend_requests, [:trip_id, :user_id], unique: true
  end
end
