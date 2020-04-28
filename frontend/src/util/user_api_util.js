import axios from 'axios';

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`)
}


export const getCurUser = (id) => {
  return axios.get(`/api/users/current`)
}