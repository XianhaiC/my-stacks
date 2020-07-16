import axios from 'axios'

// TODO

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then(res => {
      console.log(res.data);

      setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.error("DATA", err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then(res => {
      console.log(res.data);

      setAuthorizationHeader(res.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(err => {
      console.error("DATA", err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    });
}


export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch(err => console.log(err));
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}
