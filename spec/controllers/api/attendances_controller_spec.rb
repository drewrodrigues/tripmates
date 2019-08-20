require "rails_helper"

RSpec.describe Api::AttendancesController, type: :controller do
  render_views

  let(:setup) do
    leader = create(:user)
    user = create(:user)
    FriendRequest.create(requester: leader, requestee: user)
    Friend.create(friend_one_id: leader.id, friend_two_id: user.id)
    trip = create(:trip, creator: leader)
    AttendRequest.create(trip: trip, user: user)
  end

  let(:create_attender) do
    setup
    attend_request = AttendRequest.last
    Attendance.create(user: attend_request.user, trip: attend_request.trip)
  end

  let(:leader) { User.first }
  let(:attender) { User.last }

  describe "authentication" do
    it "protects all actions from signed out users" do
      [
        "post :create, format: :json",
        "get :index, format: :json, params: { trip_id: 1_000_000 }",
        "delete :destroy, format: :json, params: { id: 1_000_000 }",
      ].each do |method|
        eval(method)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST #create" do
    before do
      setup
    end

    context "when user is leader" do
      before do
        subject.login!(leader)
        post :create, format: :json, params: { id: AttendRequest.last.id }
      end

      it "creates the record" do
        expect(Attendance.count).to eq(1)
      end

      it "has :ok status code" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when user isn't leader" do
      it "raises an error" do
        subject.login!(attender)
        expect do
          post :create, format: :json, params: { id: AttendRequest.last.id }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "GET #index" do
  end

  describe "DELETE #destroy" do
    before do
      create_attender
    end

    context "when user is leader" do
      before do
        subject.login!(leader)
        expect(Attendance.count).to eq(1)
        delete :destroy, params: { id: Attendance.last.id }
      end

      it "destroys the record" do
        expect(Attendance.count).to eq(0)
      end

      it "has :ok status code" do
        expect(response).to have_http_status(:ok)
      end

      it "returns {}" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when user is attendee" do
      before do
        subject.login!(attender)
        expect(Attendance.count).to eq(1)
        delete :destroy, params: { id: Attendance.last.id }
      end

      it "destroys the record" do
        expect(Attendance.count).to eq(0)
      end

      it "has :ok status code" do
        expect(response).to have_http_status(:ok)
      end

      it "returns {}" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when user is not leader or attendee" do
      it "returns error" do
        subject.login!(create(:user))
        expect(Attendance.count).to eq(1)
        delete :destroy, params: { id: Attendance.last.id }
        expect(JSON.parse(response.body)).to eq("errors" => ["Failed to leave trip"])
      end
    end
  end
end
