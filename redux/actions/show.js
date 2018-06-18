import ApiClient from 'lib/api-client';

export const SHOW_IS_LOADING = 'SHOW_IS_LOADING';
export const SHOW_FETCH_DATA_SUCCESS = 'SHOW_FETCH_DATA_SUCCESS';
export const SHOW_FETCH_DATA_ERROR = 'SHOW_FETCH_DATA_ERROR';

export const showIsLoading = bool => ({
  type: SHOW_IS_LOADING,
  isLoading: bool,
});

export const showFetchDataSuccess = show => ({
  type: SHOW_FETCH_DATA_SUCCESS,
  show,
  isLoading: false,
  error: null,
});

export const showFetchDataError = error => ({
  type: SHOW_FETCH_DATA_ERROR,
  isLoading: false,
  error,
});

export const showFetchData = id => async (dispatch) => {
  dispatch(showIsLoading(true));

  try {
    const apiClient = new ApiClient();
    const res = await apiClient.getShow(id);
    dispatch(showIsLoading(false));
    dispatch(showFetchDataSuccess(res));
  } catch (error) {
    dispatch(showIsLoading(false));
    dispatch(showFetchDataError(error));
  }
};
