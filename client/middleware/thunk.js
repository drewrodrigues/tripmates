const thunk = ({dispatch}) => next => action => {
  if (typeof action === 'function') {
    console.log('hit thunk');
    console.log(typeof action);
    return action(dispatch);
  };
  next(action);
};

export default thunk;