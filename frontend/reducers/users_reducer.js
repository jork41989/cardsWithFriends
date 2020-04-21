
import { RECEIVE_SINGLE_USER, WATCH_MOVIE, UNWATCH_MOVIE } from "../actions/users_actions"
import { REMOVE_REVIEW, RECEIVE_REVIEW } from "../actions/review_actions"
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'


export default (state = {}, action) => {
  Object.freeze(state);
  let review;
  let userId;
  let user;
  let newState;

  switch (action.type) {

    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, { [action.user.data.id]: action.user.data })
    case WATCH_MOVIE:
      return Object.assign({}, state, { [action.user.data.id]: action.user.data })
    case UNWATCH_MOVIE:
      return Object.assign({}, state, { [action.user.data.id]: action.user.data })
    case REMOVE_REVIEW:
      review = action.review;
      userId = review.user_id;
      newState = Object.assign({}, state);
      user = newState[userId._id];
      user.authored_reviews = user.authored_reviews.filter(rev => rev._id !== review._id);
      return newState
    case RECEIVE_REVIEW:
      review = action.review;
      userId = review.user_id;
      newState = Object.assign({}, state);
      user = newState[userId];
     
      user.authored_reviews.push(review);
      return newState;
    default:
      return state;
  }
}