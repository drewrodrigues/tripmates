require 'rails_helper'

RSpec.describe Api::ItineraryItemsController, type: :controller do
  let(:setup) do
    leader = create(:user)
    user = create(:user)
    FriendRequest.create!(requester: leader, requestee: user)
    Friend.create!(friend_one_id: leader.id, friend_two_id: user.id)
    trip = create(:trip, creator: leader)
    AttendRequest.create(trip: trip, user: user)
    Attendance.create!(trip: trip, user: User.last)
  end

  let(:leader) { @leader ||= User.first }
  let(:attendee) { @attendee ||= User.last }
  let(:trip) { @trip ||= Trip.first }
  let(:itinerary_item) { @itinerary_item ||= ItineraryItem.last }

  describe "authentication" do
    it "protects #create and #destroy from signed out users" do
      [
        "post :create, format: :json, params: { trip_id: 1_000_000, itinerary_item: {} }",
        "delete :destroy, format: :json, params: { id: 1_000_000, trip_id: 2_000_000 }"
      ].each do |method|
        eval(method)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "authorization" do
    context "when user is guest" do
      context "and hitting #create or #destroy" do
        it "responds with unauthorized" do
          trip = create(:trip)
          user = create(:user)
          subject.login!(user)

          [
            "post :create, format: :json, params: { trip_id: #{trip.id}, itinerary_item: {} }",
            "delete :destroy, format: :json, params: { id: 1_000_000, trip_id: #{trip.id} }"
          ].each do |method|
            eval(method)
            expect(response).to have_http_status(:unauthorized)
          end
        end
      end
    end
  end

  describe "POST #create" do
    before do
      setup
    end

    context "when leader" do
      before do
        subject.login!(leader)
        post :create, format: :json, params: { trip_id: trip.id, itinerary_item: { title: "Something" } }
      end

      it "creates the record" do
        expect(ItineraryItem.count).to eq(1)
      end

      it "responds with :ok" do
        expect(response).to have_http_status(:ok)
      end

      it "renders :show" do
        expect(response).to render_template(:show)
      end
    end

    context "when attendee" do
      before do
        subject.login!(attendee)
        post :create, format: :json, params: { trip_id: trip.id, itinerary_item: { title: "Something" } }
      end

      it "creates the record" do
        expect(ItineraryItem.count).to eq(1)
      end

      it "responds with :ok" do
        expect(response).to have_http_status(:ok)
      end

      it "renders :show" do
        expect(response).to render_template(:show)
      end
    end
  end

  describe "GET #index" do
    before do
      setup
      get :index, format: :json, params: { trip_id: trip.id }
    end

    it "responds with :ok" do
      expect(response).to have_http_status(:ok)
    end

    it "renders :index" do
      expect(response).to render_template(:index)
    end
  end

  describe "DELETE #destroy" do
    before do
      setup
      ItineraryItem.create!(title: "Something", trip: trip)
      expect(ItineraryItem.count).to eq(1)
    end

    context "when leader" do
      before do
        subject.login!(leader)
        delete :destroy, format: :json, params: { id: itinerary_item.id, trip_id: itinerary_item.trip_id }
      end

      it "deletes the record" do
        expect(ItineraryItem.count).to eq(0)
      end

      it "renders :show" do
        expect(response).to render_template(:show)
      end
    end

    context "when attendee" do
      before do
        subject.login!(attendee)
        delete :destroy, format: :json, params: { id: itinerary_item.id, trip_id: itinerary_item.trip_id }
      end

      it "deletes the record" do
        expect(ItineraryItem.count).to eq(0)
      end

      it "renders :show" do
        expect(response).to render_template(:show)
      end
    end
  end
end
