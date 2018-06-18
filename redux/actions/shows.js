import ApiClient from '../../lib/api-client';

const apiClient = new ApiClient();

export const showsHasErrored = bool => ({
  type: 'SHOWS_HAS_ERRORED',
  hasErrored: bool,
});

export const showsIsLoading = bool => ({
  type: 'SHOWS_IS_LOADING',
  isLoading: bool,
});

export const showsFetchDataSuccess = shows => ({
  type: 'SHOWS_FETCH_DATA_SUCCESS',
  shows,
});

export const showsFetchData = keyword => (dispatch) => {
  dispatch(showsIsLoading(true));

  return apiClient.getShows(keyword).then((res) => {
    dispatch(showsIsLoading(false));
    dispatch(showsFetchDataSuccess(res.data));
  });
};
