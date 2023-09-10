import {UserContext} from '../Context/UserContext';
import {FirebaseContext} from '../Context/FirebaseContext';
import {PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  const productsData = [];
  const [post, setPost] = useState([]);


  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    post.forEach((posts) => {
      productsData.push(posts);
    });

    dispatch({type: PRODUCT_LIST_SUCCESS, payload: productsData});
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message,
    });
  }
};
