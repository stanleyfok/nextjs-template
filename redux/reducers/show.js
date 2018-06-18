import serializeError from "serialize-error";
import {
  SHOW_IS_LOADING,
  SHOW_FETCH_DATA_SUCCESS,
  SHOW_FETCH_DATA_ERROR
} from "../actions/show";

const initialState = {
  isLoading: false,
  show: {},
  error: null
};

const show = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SHOW_FETCH_DATA_SUCCESS:
      return { ...state, show: action.show };
    case SHOW_FETCH_DATA_ERROR:
      return { ...state, error: serializeError(action.error) };
    default:
      return state;
  }
};

export default {
  show
};
