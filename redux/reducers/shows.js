import serializeError from "serialize-error";
import {
  SHOWS_IS_LOADING,
  SHOWS_FETCH_DATA_SUCCESS,
  SHOWS_FETCH_DATA_ERROR
} from "../actions/shows";

const initialState = {
  isLoading: false,
  shows: [],
  error: null
};

const shows = (state = initialState, action) => {
  switch (action.type) {
    case SHOWS_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SHOWS_FETCH_DATA_SUCCESS:
      return { ...state, shows: action.shows };
    case SHOWS_FETCH_DATA_ERROR:
      return {
        ...state,
        error: serializeError(action.error)
      };
    default:
      return state;
  }
};

export default {
  shows
};
