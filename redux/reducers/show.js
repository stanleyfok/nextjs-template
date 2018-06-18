const showHasErrored = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_HAS_ERRORED':
    return action.hasErrored;

  default:
    return state;
  }
};

const showIsLoading = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_IS_LOADING':
    return action.isLoading;

  default:
    return state;
  }
};

const show = (state = {}, action) => {
  switch (action.type) {
  case 'SHOW_FETCH_DATA_SUCCESS':
    return action.show;

  default:
    return state;
  }
};

export default {
  showHasErrored,
  showIsLoading,
  show,
};
