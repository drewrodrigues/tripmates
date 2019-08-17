// [{...tripDetails, ...creatorDetails}]
export const allTripsSelector = state => {
  const result = []
  Object.values(state.entities.trips).forEach(trip => {
    let thisTrip = trip
    thisTrip.creator = state.entities.users[trip.creatorId]
    result.push(thisTrip)
  })
  return result
}

// TODO: break apart selectors
export const tripsByStartDate = state => {
  let allTrips = allTripsSelector(state)
  return allTrips.sort((a, b) => {
    const aStart = new Date(a.startDate),
      bStart = new Date(b.startDate)
    return aStart - bStart
  })
}

export const selectTripById = (state, id) => {
  const trip = state.entities.trips[id]
  if (trip === undefined) return {}
  trip.creator = state.entities.users[trip.creatorId]
  return trip
}

export const selectAllOtherUsers = state => {
  const currentUserId = state.session.id
  const users = []
  Object.values(state.entities.users).forEach(user => {
    if (user.id !== currentUserId) {
      users.push(user)
    }
  })
  return users
}

// {friendId: true, friendId: true}
// check if key existss
export const selectAllFriendRequests = state => {
  const currentUserId = state.session.id
  const keyHash = {}
  Object.values(state.entities.friendRequests).forEach(friendRequest => {
    if (friendRequest.requesteeId === currentUserId) {
      keyHash[friendRequest.requesteeId] = true
    }
  })
  return keyHash
}

export const selectAllRequestedFriends = state => {
  const currentUserId = state.session.id
  const keyHash = {}
  Object.values(state.entities.friendRequests).forEach(friendRequest => {
    if (friendRequest.requesterId === currentUserId) {
      keyHash[friendRequest.requesteeId] = true
    }
  })
  return keyHash
}

const friendRequestArray = state => {
  const output = []
  Object.values(state.entities.friendRequests).forEach(friendRequest => {
    output.push(friendRequest)
  })
  return output
}

export const checkIfFriend = (state, userId) => {
  if (Object.values(state.entities.friends).length == 0) return
  let isFriend = false

  Object.values(state.entities.friends).forEach(friendRecord => {
    if (
      friendRecord.friendOneId == userId ||
      friendRecord.friendTwoId == userId
    ) {
      isFriend = true
    }
  })

  return isFriend
}

export const friendRecordId = (state, userId) => {
  let id = null
  const currentUserId = state.session.id

  Object.values(state.entities.friends).forEach(friendRecord => {
    if (
      (friendRecord.friendOneId == userId ||
        friendRecord.friendTwoId == userId) &&
      (friendRecord.friendOneId == currentUserId ||
        friendRecord.friendTwoId == currentUserId)
    ) {
      id = friendRecord.id
    }
  })

  return id
}

export const friendRequestId = (state, userId) => {
  let id = null
  const currentUserId = state.session.id

  Object.values(state.entities.friendRequests).forEach(friendRequest => {
    if (
      (friendRequest.requesteeId == userId ||
        friendRequest.requesterId == userId) &&
      (friendRequest.requesteeId == currentUserId ||
        friendRequest.requesterId == currentUserId)
    ) {
      id = friendRequest.id
    }
  })

  return id
}

export const checkIfRequested = (state, userId) => {
  // FIXME: come up with a better way to do this
  const currentUserId = state.session.id
  const friendRequests = friendRequestArray(state)
  for (let i = 0; i < friendRequests.length; i++) {
    if (
      friendRequests[i].requesterId === currentUserId &&
      friendRequests[i].requesteeId === userId
    ) {
      return true
    }
  }
  return false
}

export const checkIfFriendRequestPending = (state, userId) => {
  // FIXME: come up with a better way to do this
  const currentUserId = state.session.id
  const friendRequests = friendRequestArray(state)
  for (let i = 0; i < friendRequests.length; i++) {
    if (
      friendRequests[i].requesterId === userId &&
      friendRequests[i].requesteeId === currentUserId
    ) {
      return true
    }
  }
  return false
}

export const selectFriendRequest = (state, userId) => {
  const currentUserId = state.session.id
  let friendRequest = {}
  const friendRequests = friendRequestArray(state)
  for (let i = 0; i < friendRequests.length; i++) {
    if (
      (friendRequests[i].requesterId === userId &&
        friendRequests[i].requesteeId === currentUserId) ||
      (friendRequests[i].requesterId === currentUserId &&
        friendRequests[i].requesteeId === userId)
    ) {
      return friendRequests[i]
    }
  }
  return friendRequest
}

export const isRequestingAttendance = (state, trip) => {
  let requestedAttendance = false

  Object.values(state.entities.attendRequests).forEach(request => {
    if (request.userId == state.session.id && request.tripId == trip.id) {
      requestedAttendance = true
    }
  })

  return requestedAttendance
}