class Test::DatabasesController < ApplicationController
  def clean_database
    tables = ActiveRecord::Base.connection.tables
    tables.delete 'schema.migrations'
    tables.each do |t|
      ActiveRecord::Base.connection.execute("TRUNCATE #{t} CASCADE")
    end
    render plain: 'Truncated database'
  end

  def seed_database
    Rails.application.load_seed
    render plain: 'Seeded database'
  end
end
