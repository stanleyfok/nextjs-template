import ApiClient from '../../lib/api-client';

export const SHOWS_IS_LOADING = 'SHOWS_IS_LOADING';
export const SHOWS_FETCH_DATA_SUCCESS = 'SHOWS_FETCH_DATA_SUCCESS';
export const SHOWS_FETCH_DATA_ERROR = 'SHOWS_FETCH_DATA_ERROR';

export const showsIsLoading = bool => ({
  type: SHOWS_IS_LOADING,
  isLoading: bool,
});

export const showsFetchDataSuccess = shows => ({
  type: SHOWS_FETCH_DATA_SUCCESS,
  shows,
  isLoading: false,
  error: null,
});

export const showsFetchDataError = error => ({
  type: SHOWS_FETCH_DATA_ERROR,
  isLoading: false,
  error,
});

export const showsFetchData = keyword => async (dispatch) => {
  dispatch(showsIsLoading(true));

  try {
    const apiClient = new ApiClient();
    const res = await apiClient.getShows(keyword);

    dispatch(showsIsLoading(false));
    dispatch(showsFetchDataSuccess(res));
  } catch (error) {
    dispatch(showsIsLoading(false));
    dispatch(showsFetchDataError(error));
  }
};
