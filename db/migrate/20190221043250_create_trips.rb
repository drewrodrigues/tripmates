class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.string :image_url
      t.string :title, null: false
      t.string :location
      t.integer :creator_id, null: false

      t.timestamps
    end

    add_index :trips, :creator_id
    add_index :trips, :title
  end
end
