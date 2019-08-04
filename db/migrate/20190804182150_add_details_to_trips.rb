class AddDetailsToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :details, :text, null: false, default: ""
  end
end
