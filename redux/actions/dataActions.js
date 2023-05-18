import axios from 'axios'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../constants/index'


export const getPosts = () => dispatch =>{
    dispatch({ type: LOADING_DATA });
    axios.get('/post')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}
export const likepost = (postId) => dispatch => {
    axios.get(`/post/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}
export const unlikepost = (postId) => dispatch => {
    axios.get(`/post/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}