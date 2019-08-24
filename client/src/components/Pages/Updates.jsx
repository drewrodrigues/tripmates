import React from 'react'

const Updates = () => {
  const complete = [
    "Clicking location links to Google Maps"
  ]

  const inProgress = [
    "Itinerary",
    "Itinerary photo upload",
    "Itinerary files/attachments uploads"
  ]

  const future = [
    "Inventory (keep track of what you and everyone is bringing)",
    "Invites",
    "Live updating messages (sockets)",
    "Inventory check list print out",
    "Itinerary print out",
    "Redesigning trip creation flow and form",
    "Show spaces left of how many total",
    "Trips public to non-friends setting",
    "Explore feature (finding and marking spots on map) w/ 3D imaging",
    "Showing up to 3 attendees on trip detail",
    "Clickable links in description",
    "Description WYSIWYG editor (lists, headers, bold, italics, etc)",
    "Showing multiple locations when locations added to Itinerary",
    "Photo albums",
    "Allowing a note when requesting to join a trip",
    "Profiles (w/ stats, map to show where you've been, and explorer achievements)",
    "Full trip print out (photo, description, attendees, check lists, itinerary, etc)",
    "Search for Users by location",
    "Finding trips from users near you",
    "Searching trips by destination/description/itinerary (ex: easily find a trip that's going to europe, a cruise, swimming holes, etc)",
    "Show locations from Itinerary linked to map",
    "User settings",
    "Password reset",
    "Notifications"
  ]

  const tenative = [
    "Financial tool (expense tracking w/ charts)"
  ]

  return (
    <ul className="updates">
      <header>
        If there are any features you would like, or have feedback, please email <a href="mailto:engineer@tripmates.io">engineering@tripmates.io</a>. We would love to hear from you!
      </header>

      <h3>Recently Added / Complete</h3>
      {complete.map(c => <>
        <input type="checkbox" checked /><li>{c}</li>
      </>)}

      <h3>In Progress</h3>
      {inProgress.map(c => <>
        <input type="checkbox" /><li>{c}</li>
      </>)}

      <h3>Future</h3>
      {future.map(c => <>
        <input type="checkbox" /><li>{c}</li>
      </>)}

      <h3>Tenative</h3>
      {tenative.map(c => <>
        <input type="checkbox" /><li>{c}</li>
      </>)}
    </ul>
  )
}

export default Updates