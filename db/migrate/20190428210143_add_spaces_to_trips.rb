class AddSpacesToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :spaces, :integer, null: false
  end
end
