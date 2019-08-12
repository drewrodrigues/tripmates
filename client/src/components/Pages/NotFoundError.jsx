import React from "react"
import notFound from "../../assets/404.png"
import { Link } from "react-router-dom";

const NotFoundError = () => {
  return <div className="ErrorPage">
    <img src={notFound} alt="Forest" className="ErrorPage-image" />
    <h4 className="ErrorPage-title">404 Not Found</h4>
    <p className="ErrorPage-description">Oh noes, we couldn't find the thing!</p>
    <Link to="/" className="ErrorPage-button button button-heavy button-green">Go to Dashboard</Link>
  </div>
}

export default NotFoundError