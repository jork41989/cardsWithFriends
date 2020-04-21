import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import ReviewErrorsReducer from './reviews_errors_reducer';
import MovieErrorsReducer from './movie_errors_reducer';
import ActorErrorsReducer from './actors_error_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  review: ReviewErrorsReducer,
  movie: MovieErrorsReducer,
  actor: ActorErrorsReducer
});