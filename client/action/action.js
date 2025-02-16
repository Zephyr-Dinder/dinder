import { AUTH_ACTION_TYPE, BUSINESS_ACTION_TYPE, FAVORITE_ACTION_TYPE, BUSINESS_LIST_ACTION_TYPE } from './action_type';
import axios from 'axios';

const LOCATION_SEARCHED = '1600 Main St 1st floor, Venice, CA 90291';

export const getFav = user => dispatch => {
  dispatch({
    type: FAVORITE_ACTION_TYPE.GET_FAV_LOADING,
  });
  axios.post('/api/favorites/fav', {
    user
  })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: FAVORITE_ACTION_TYPE.GET_FAV_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: FAVORITE_ACTION_TYPE.GET_FAV_FAIL,
        error
      });
    });
};

export const addFav = (fav, username) => dispatch => {
  dispatch({
    type: FAVORITE_ACTION_TYPE.ADD_FAV_LOADING,
  });
  axios.post('/api/favorites', {
    business: fav,
    username
  }).then(res => {
    dispatch({
      type: FAVORITE_ACTION_TYPE.ADD_FAV_SUCCESS,
      payload: res.data
    });
  }).catch(error => {
    dispatch({
      type: FAVORITE_ACTION_TYPE.ADD_FAV_FAIL,
      payload: { error }
    });
  });
};

export const deleteFav = (username, id) => dispatch => {
  dispatch({
    type: FAVORITE_ACTION_TYPE.DELETE_FAV_LOADING,
  });
  axios.delete('/api/favorites', {
    currentUser: username,
    yelpid: id
  }).then(res => {
    dispatch({
      type: FAVORITE_ACTION_TYPE.DELETE_FAV_SUCCESS,
      payload: res.data
    });
  }).catch(error => {
    dispatch({
      type: FAVORITE_ACTION_TYPE.DELETE_FAV_FAIL,
      payload: { error }
    });
  });
};

export const getCurrentBusiness = id => dispatch => {
  dispatch({
    type: BUSINESS_ACTION_TYPE.BUSINESS_LOADING
  });
  axios
    .get(`/api/yelp/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: BUSINESS_ACTION_TYPE.BUSINESS_200,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: BUSINESS_ACTION_TYPE.BUSINESS_404,
        payload: { error }
      });
    });
};

export const getBusinessList = (location = LOCATION_SEARCHED) => dispatch => {
    dispatch({
      type: BUSINESS_LIST_ACTION_TYPE.BUSINESS_LIST_LOADING,
    });

    axios
      .get(`/api/yelp?location=${location}`)
      .then(res => {
        dispatch({
          type: BUSINESS_LIST_ACTION_TYPE.BUSINESS_LIST_200,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: BUSINESS_LIST_ACTION_TYPE.BUSINESS_LIST_404,
          payload: {
            error
          }
        });
      });

    // axios.get(
    //   `https://api.yelp.com/v3/businesses/search?location=${LOCATION_SEARCHED}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${key.API_KEY}`
    //     },
    //     params: {
    //       categories: 'restaurants, All',
    //       limit: 50
    //     }
    //   }
    // ).then(res => {
    //   let businessList = [];
    //   for (let restaurant of res.data.businesses) { // res.data.businesses is an array with objects
    //     const businessObj = {
    //       yelpid: restaurant.id,
    //       name: restaurant.name,
    //       address:
    //         restaurant.location.display_address[0] +
    //         ', ' +
    //         restaurant.location.display_address[1],
    //       imgurl: restaurant.image_url,
    //       yelpurl: restaurant.url
    //     };
    //     businessList.push(businessObj);
    //   }
    //   dispatch({
    //     type: BUSINESS_200,
    //     payload: businessList
    //   });
    // }).catch(error => {
    //   dispatch({
    //     type: BUSINESS_404,
    //     payload: {
    //       error
    //     }
    //   })
    // });
};

export const signOut = () => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPE.SIGN_OUT_LOADING
  });
  axios.post('/api/login/signOut', {
  }).then(res => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_OUT_SUCCESS,
    })
  }).catch(error => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_OUT_FAIL,
      payload: {
        error
      }
    })
  });
};

export const signIn = (username, password) => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPE.SIGN_IN_LOADING
  });
  axios.post('/api/login/signIn', {
    username,
    password
  }).then(res => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_SUCCESS,
      payload: res.data // should be ssid
    });
  }).catch(error => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_IN_FAIL,
      payload: {
        error
      }
    })
  });
};

export const signUp = (username, password) => dispatch => {
  console.log('sign up');
  console.log(username, password);
  dispatch({
    type: AUTH_ACTION_TYPE.SIGN_UP_LOADING
  });

  axios.post('/api/login/signUp', {
    username,
    password
  }).then(res => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_UP_SUCCESS,
      payload: res.data
    });
  }).catch(error => {
    dispatch({
      type: AUTH_ACTION_TYPE.SIGN_UP_FAIL,
      payload: {
        error
      }
    })
  });
};

