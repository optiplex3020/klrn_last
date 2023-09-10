import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST} from '../constants/index';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: actions.payload,
      };
  }
}
