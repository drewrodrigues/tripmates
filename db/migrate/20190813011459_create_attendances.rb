class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.integer :user_id, null: false
      t.integer :trip_id, null: false

      t.timestamps
    end

    add_index :attendances, %i[user_id trip_id], unique: true
  end
end
