class CreateItineraryItems < ActiveRecord::Migration[5.2]
  def change
    create_table :itinerary_items do |t|
      t.string :title, null: false
      t.text :description
      t.date :start_date
      t.date :end_date
      t.time :start_time
      t.time :end_time
      t.integer :position
      t.references :trip, foreign_key: true
      t.string :location

      t.timestamps
    end
  end
end
