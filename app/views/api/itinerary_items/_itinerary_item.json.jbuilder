json.set! itinerary_item.id do
  json.extract! itinerary_item,
                :id,
                :trip_id,
                :title,
                :start_time,
                :end_time,
                :start_date,
                :end_date,
                :description,
                :position
  json.photo url_for(itinerary_item.photo) if itinerary_item.photo.attached?

  if itinerary_item.files.attached?
    files = []

    itinerary_item.files.each do |file|
      # if Rails.env.development? || Rails.env.test? # get files from disk
      #   url = ActiveStorage::Blob.service.send(:path_for, file.blob.key)
      #   file_object = { "name" => file.blob.filename, "url" => url }
      # else
        file_object = { "name" => file.blob.filename, "url" => rails_blob_path(file.blob, disposition: 'attachment') }
      # end
      files << file_object
    end

    json.files files
  end
end