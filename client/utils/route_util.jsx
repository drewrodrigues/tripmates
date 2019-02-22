const Auth = ({ component: Component, path, loggedIn, exact }) => {
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
}

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )}/>
);

const mapStateToProps = state => {
  return { loggedIn: Boolean(state.session.id) }
};

// connect auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
