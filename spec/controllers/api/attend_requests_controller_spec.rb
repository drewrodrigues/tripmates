require "rails_helper"

RSpec.describe Api::AttendRequestsController, type: :controller do
  render_views

  let(:setup) do
    leader = create(:user)
    user = create(:user)
    FriendRequest.create(requester: leader, requestee: user)
    Friend.create(friend_one_id: leader.id, friend_two_id: user.id)
    trip = create(:trip, creator: leader)
  end

  let(:create_attend_request) do
    leader = create(:user)
    user = create(:user)
    FriendRequest.create(requester: leader, requestee: user)
    Friend.create(friend_one_id: leader.id, friend_two_id: user.id)
    trip = create(:trip, creator: leader)
    attend_request = AttendRequest.create(trip: trip, user: user)
  end

  describe "authentication" do
    it "protects all actions from signed out users" do
      [
        "post :create, format: :json",
        "get :index, format: :json",
        "delete :destroy, format: :json, params: { id: 2 }",
      ].each do |method|
        eval(method)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "authorization" do
    context "DELETE #destroy" do
      context "when user doesn't own the record" do
        it "returns an error" do
          leader = create(:user)
          user = create(:user)
          FriendRequest.create(requester: leader, requestee: user)
          Friend.create(friend_one_id: leader.id, friend_two_id: user.id)
          trip = create(:trip, creator: leader)
          attend_request = AttendRequest.create(trip: trip, user: user)

          random_user = create(:user)
          subject.login!(random_user)

          expect do
            delete :destroy, format: :json, params: { id: attend_request.id }
          end.to raise_error(ActiveRecord::RecordNotFound)
        end
      end
    end
  end

  describe "POST #create" do
    context "when trip exists" do
      before do
        setup
        subject.login!(User.last)
        post :create, format: :json, params: {
          attend_request: { trip_id: Trip.last.id },
        }
      end

      it "has success code" do
        expect(response).to have_http_status(:success)
      end

      it "creates the record" do
        expect(AttendRequest.count).to eq(1)
      end
    end

    context "when trip doesn't exist" do
      it "returns an error" do
        subject.login!(create(:user))

        post :create, params: { attend_request: { trip_id: 1_000_000 } }

        expect(JSON.parse(response.body)).to eq("errors" => ["Trip must exist"])
      end
    end
  end

  describe "GET #index" do
    before do
      create_attend_request
      subject.login!(User.last)

      get :index, format: :json
    end

    it "responds with success code" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    context "when record exists" do
      before do
        create_attend_request
        subject.login!(User.last)

        delete :destroy, format: :json, params: { id: AttendRequest.last.id }
      end

      it "deletes the record" do
        expect(AttendRequest.count).to eq(0)
      end

      it "responds with success code" do
        expect(response).to have_http_status(:success)
      end

      it "returns JSON" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when record doesn't exist" do
      it "responds with error" do
        subject.login!(create(:user))

        expect do
          delete :destroy, format: :json, params: { id: 1_000_000 }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
