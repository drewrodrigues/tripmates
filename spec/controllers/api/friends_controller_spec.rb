require 'rails_helper'

RSpec.describe Api::FriendsController, type: :controller do
  render_views

  describe "authentication" do
    it "protects all actions from signed out users" do
      ["post :create, format: :json",
       "get :index, format: :json",
       "delete :destroy, format: :json, params: { id: 2 }"
      ].each do |method|
        eval(method)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST #create" do
    context "when current_user is requestee" do
      before do
        @user = create(:user)
        @other_user = create(:user)
        friend_request = FriendRequest.create(requester: @other_user, requestee: @user)
        subject.login!(@user)

        post :create, format: :json, params: { id: friend_request.id }
      end

      it "creates the record" do
        expect(Friend.count).to eq(1)
      end

      it "returns json" do
        last_friend_id = Friend.last.id
        expect(JSON.parse(response.body)).to eq({
          "friend" => {
            last_friend_id.to_s => {
              "id" => last_friend_id,
              "friendOneId" => @user.id,
              "friendTwoId" => @other_user.id
            }
          },
          "user" => {
            @other_user.id.to_s => {
              "id" => @other_user.id,
              "firstName" => @other_user.first_name,
              "lastName" => @other_user.last_name,
              "fullName" => @other_user.first_name + " " + @other_user.last_name,
              "email" => @other_user.email
            }
          }
        })
      end

      it "returns success response" do
        expect(response).to have_http_status(:success)
      end
    end

    context "when current_user is requester" do
      it "raises RecordNotFound" do
        user = create(:user)
        other_user = create(:user)
        @friend_request = FriendRequest.create(requester: user, requestee: other_user)
        subject.login!(user)

        expect {
          post :create, format: :json, params: { id: @friend_request.id }
        }.to raise_error(ActiveRecord::RecordNotFound)
        expect(Friend.count).to eq(0)
      end
    end
  end

  describe "GET #index" do
    before do
      @user = create(:user)
      @other_user = create(:user)
      FriendRequest.create(requester: @other_user, requestee: @user)
      subject.login!(@user)
      Friend.create(friend_one_id: @user.id, friend_two_id: @other_user.id)

      get :index, format: :json
    end

    it "returns success" do
      expect(response).to have_http_status :ok
    end

    it "returns json" do
      last_friend_id = Friend.last.id
      expect(JSON.parse(response.body)).to eq({
        "friends" => {
          last_friend_id.to_s => {
            "id" => last_friend_id,
            "friendOneId" => @user.id,
            "friendTwoId" => @other_user.id
          }
        },
        "users" => {
          @other_user.id.to_s => {
            "id" => @other_user.id,
            "firstName" => @other_user.first_name,
            "lastName" => @other_user.last_name,
            "fullName" => @other_user.first_name + " " + @other_user.last_name,
            "email" => @other_user.email
          }
        }
      })
    end
  end

  describe "DELETE #destroy" do
    context "when current_user owns the record" do
      before do
        user = create(:user)
        other_user = create(:user)
        FriendRequest.create(requester: user, requestee: other_user)
        subject.login!(user)
        Friend.create(friend_one_id: user.id, friend_two_id: other_user.id)

        delete :destroy, format: :json, params: { id: Friend.last.id }
      end

      it "returns success" do
        expect(response).to have_http_status(:success)
      end

      it "removes the record" do
        expect(Friend.count).to eq(0)
      end

      it "returns an empty object" do
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context "when current_user doesn't have the record" do
    end
  end
end
