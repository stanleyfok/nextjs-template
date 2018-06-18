const showsHasErrored = (state = false, action) => {
  switch (action.type) {
  case 'SHOWS_HAS_ERRORED':
    return action.hasErrored;

  default:
    return state;
  }
};

const showsIsLoading = (state = false, action) => {
  switch (action.type) {
  case 'SHOWS_IS_LOADING':
    return action.isLoading;

  default:
    return state;
  }
};

const shows = (state = [], action) => {
  switch (action.type) {
  case 'SHOWS_FETCH_DATA_SUCCESS':
    return action.shows;

  default:
    return state;
  }
};

export default {
  showsHasErrored,
  showsIsLoading,
  shows,
};
