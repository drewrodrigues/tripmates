class AddPrivacyToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :privacy, :integer, null: false, default: 0
    add_index :trips, :privacy
  end
end
