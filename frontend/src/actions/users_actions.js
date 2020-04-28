import { getUser, watchMovie, unWatchMovie, getCurUser } from '../util/user_api_util';


export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const WATCH_MOVIE = 'WATCH_MOVIE'
export const UNWATCH_MOVIE = 'UNWATCH_MOVIE'




export const receiveAUser = user => ({
  type: RECEIVE_SINGLE_USER,
  user
})





export const requestSingleUser = userId => (dispatch) => (
  getUser(userId).then(user => dispatch(receiveAUser(user)))
)




export const getTheCurUser = () => (dispatch) => {
  
  return (getCurUser().then(user => dispatch(receiveAUser(user))))
}