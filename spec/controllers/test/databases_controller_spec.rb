require "rails_helper"

RSpec.describe Test::DatabasesController, type: :controller do
  describe "GET #clean_database" do
    it "returns http success" do
      get :clean_database
      expect(response).to have_http_status(:success)
    end
  end
end
