const thunk = ({dispatch}) => next => action => {
  console.log(typeof action);
  if (typeof action === 'function') {
    return action(dispatch);
  };
  next(action);
};

export default thunk;