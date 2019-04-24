class RemoveImageUrlFromTrips < ActiveRecord::Migration[5.2]
  def change
    remove_column :trips, :image_url
  end
end
