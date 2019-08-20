require "rails_helper"

RSpec.describe Api::MessagesController, type: :controller do
  render_views

  let(:setup) do
    leader = create(:user)
    user = create(:user)
    FriendRequest.create!(requester: leader, requestee: user)
    Friend.create!(friend_one_id: leader.id, friend_two_id: user.id)
    trip = create(:trip, creator: leader)
    AttendRequest.create(trip: trip, user: user)
    Attendance.create!(trip: trip, user: User.last)
  end

  let(:create_message) do
    setup
    Message.create!(trip: Trip.last, user: attendee, body: "Do the things")
  end

  let(:leader) { @leader ||= User.first }
  let(:attendee) { @attendee ||= User.last }

  describe "authentication" do
    before do
      @methods = [
        "post :create,
          format: :json,
          params: { trip_id: 1_000_000, message: { body: 'something' } }",
        "get :index,
          format: :json,
          params: { trip_id: 1_000_000, message: {} }",
        "delete :destroy,
          format: :json,
          params: { id: 2_000_000 }",
      ]
    end

    it "protects all actions from signed out users" do
      @methods.each do |method|
        eval(method)
        expect(response).to have_http_status(:unauthorized)
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
        post :create,
             format: :json,
             params: {
               trip_id: Trip.last.id,
               message: { body: "Do the things" },
             }
      end

      it "creates the record" do
        expect(Message.count).to eq(1)
      end

      it "responds with :ok" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when attendee" do
      before do
        subject.login!(attendee)
        post :create,
             format: :json,
             params: {
               trip_id: Trip.last.id,
               message: { body: "Do the things" },
             }
      end

      it "creates the record" do
        expect(Message.count).to eq(1)
      end

      it "responds with :ok" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when neither" do
      it "raises error" do
        subject.login!(create(:user))
        expect do
          post :create,
               format: :json,
               params: {
                 trip_id: Trip.last.id,
                 message: { body: "Do the things" },
               }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "with invalid params" do
      it "raises error" do
        subject.login!(create(:user))
        expect do
          post :create,
               format: :json,
               params: {
                 trip_id: 1_000_000,
                 message: { body: "Do the things" },
               }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "GET #index" do
    before do
      create_message
    end

    context "when leader" do
      before do
        subject.login!(leader)
        get :index, format: :json, params: { trip_id: Trip.last.id }
      end

      it "responds with :ok status code" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when attendee" do
      before do
        subject.login!(attendee)
        get :index, format: :json, params: { trip_id: Trip.last.id }
      end

      it "responds with :ok status code" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when neither" do
      before do
        subject.login!(create(:user))
      end

      it "raises error" do
        expect do
          get :index, params: { trip_id: Trip.last.id }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "with invalid params" do
      it "raises error" do
        subject.login!(create(:user))
        expect do
          get :index, format: :json, params: { trip_id: 1_000_000 }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "DELETE #destroy" do
    before do
      create_message
    end

    context "when leader" do
      before do
        subject.login!(leader)
        expect(Message.count).to eq(1)
        delete :destroy, params: { id: Message.last.id }
      end

      it "deletes the record" do
        expect(Message.count).to eq(0)
      end

      it "responds with status_code :ok" do
        expect(response).to have_http_status(:ok)
      end

      it "responds with {}" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when attendee" do
      before do
        subject.login!(attendee)
        delete :destroy, params: { id: Message.last.id }
      end

      it "deletes the record" do
        expect(Message.count).to eq(0)
      end

      it "responds with status_code :ok" do
        expect(response).to have_http_status(:ok)
      end

      it "responds with {}" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when neither" do
      it "raises error" do
        subject.login!(create(:user))
        expect do
          delete :destroy, params: { id: Message.last.id }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "with invalid params" do
      it "raises error" do
        subject.login!(create(:user))
        expect do
          delete :destroy, format: :json, params: { id: 1_000_000 }
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
