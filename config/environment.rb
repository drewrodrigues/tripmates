# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# Camel case api
Jbuilder.key_format camelize: :lower
