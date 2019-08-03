namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start test server'
  task :test do
    exec `
      RAILS_ENV=test rails db:drop db:create db:migrate
      foreman start -f Procfile.test
    `
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end
end
task :start => 'start:development'