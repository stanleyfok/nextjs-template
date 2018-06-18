import { combineReducers } from 'redux';
import show from './show';
import shows from './shows';

export default combineReducers({
  ...show,
  ...shows,
});
