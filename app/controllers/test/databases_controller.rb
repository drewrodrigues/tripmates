class Test::DatabasesController < ApplicationController
  def clean_database
    tables = ActiveRecord::Base.connection.tables
    tables.delete 'schema.migrations'
    tables.each do |t|
      ActiveRecord::Base.connection.execute("TRUNCATE #{t} CASCADE")
    end

    unless ['false', false].include?(params['database']['should_seed'])
      Rails.application.load_seed
    end

    render plain: 'Truncated and seeded database'
  end
end
