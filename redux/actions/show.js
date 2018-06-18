import ApiClient from 'lib/api-client';

const apiClient = new ApiClient();

export const showHasErrored = bool => ({
  type: 'SHOW_HAS_ERRORED',
  hasErrored: bool,
});

export const showIsLoading = bool => ({
  type: 'SHOW_IS_LOADING',
  isLoading: bool,
});

export const showFetchDataSuccess = show => ({
  type: 'SHOW_FETCH_DATA_SUCCESS',
  show,
});

export const showFetchData = id => (dispatch) => {
  dispatch(showIsLoading(true));

  return apiClient.getShow(id).then((res) => {
    dispatch(showIsLoading(false));
    dispatch(showFetchDataSuccess(res.data));
  });
};
