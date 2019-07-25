import * as types from "./actionTypes";
import axios from "axios";
import Decode from "jwt-decode";

// const url = 'https://weight-journal-backend.herokuapp.com'
const url ='http://localhost:7000'
const userId = Number(localStorage.getItem('userId'))
const loggedInAxios = () => {
  const token = localStorage.getItem("token") || false;
  const instance = axios.create({
    headers: {
      Authorization: token
    }
  });
  return instance;
};
export const exercisesSuccess = value => {
  return {
    type: types.EXERCISES_SUCCESS,
    payload: value
  };
};
export const exercisesFailure = value => {
  return {
    type: types.EXERCISE_FAILURE,
    payload: value
  };
};
export const exerciseSuccess = value => {
  return {
    type: types.EXERCISE_SUCCESS,
    payload: value
  };
};
export const exerciseFailure = value => {
  return {
    type: types.EXERCISE_FAILURE,
    payload: value
  };
};
export const userSuccess = value => {
  return {
    type: types.USER_SUCESS,
    payload: value
  };
};
export const userFailure = value => {
  return {
    type: types.USER_FAILURE,
    payload: value
  };
};
export const loginSuccess = value => {
  return {
    type: types.LOGIN_SUCESS,
    payload: value
  };
};
export const loginFailure = value => {
  return {
    type: types.LOGIN_FAILURE,
    payload: value
  };
};



export const register = data => async dispatch => {
  dispatch({ type: types.REGISTER });
  try {
    const AxiosData = await axios.post(`${url}/api/register`, data);
    localStorage.setItem('token', AxiosData.data.token)
    localStorage.setItem('userId', Decode(localStorage.getItem('token')).subject)
    dispatch(loginSuccess(true));
  } catch (err) {
    dispatch(loginFailure(err.response.status));
  }
};

export const login = (data) => async dispatch => {
  dispatch({ type: types.LOGIN });

  try {
    const AxiosData = await axios.post(`${url}/api/login`, data);
    localStorage.setItem("token", AxiosData.data.token);
    localStorage.setItem('userId', Decode(localStorage.getItem('token')).subject)
    dispatch(loginSuccess(true));
  } catch(err) {
    console.dir(err)
    dispatch(loginFailure(err.response.data.message));
  }
};
export const getProfile = () => async dispatch => {
  dispatch({ type: types.GET_USER });
  try {
    const AxiosData = await loggedInAxios().get(
      `${url}/api/users/${userId}`
    );
    dispatch(userSuccess(AxiosData.data));
  } catch(err) {
    dispatch(userFailure(err.message));
  }
};
 export const deleteProfile = () => async dispatch => {
   dispatch({type: types.DELETE_USER});
   dispatch({ type: types.UPDATE_USER });
  try {
    await loggedInAxios().delete(`${url}/api/users/${userId}`);
    localStorage.clear('token')
    dispatch(userSuccess());
    dispatch(logout())
  
  } catch (err) {
    dispatch(userFailure(err.message));
  }

 }
export const updateProfile = (data)=> async dispatch => {
  dispatch({ type: types.UPDATE_USER });
  try {
    await loggedInAxios().put(`${url}/api/users/${userId}`, data);
    dispatch(getProfile(userId));
  } catch (err) {
    dispatch(userFailure(err.message));
  }
};

export const getExercises = () => async dispatch => {
  dispatch({ type: types.FETCH_EXERCISES });
  try {
    const AxiosData = await loggedInAxios().get(`${url}/api/users/${userId}/lifts`);
      dispatch(exercisesSuccess(AxiosData.data));
  } catch(err) {
      dispatch(exercisesFailure(err.message));
}
}

export const addExercises = (data) => async dispatch => {
  dispatch({ type: types.ADD_EXERCISE });
  try {
    await loggedInAxios().post(`${url}/api/lifts`, data);
    dispatch(getExercises());
  } catch (err) {
    dispatch(exercisesFailure(err.message));
  }
};

export const deleteExercises = (exerciseId) => async dispatch => {
  dispatch({ type: types.DELETE_EXERCISE });
  try {
    await loggedInAxios().delete(
      `${url}/api/lifts/${exerciseId}`
    );
    dispatch(getExercises());
  } catch (err) {
    dispatch(exercisesFailure(err.message));
  }
};

export const updateExercises = (exerciseId, data) => async dispatch => {
  dispatch({ type: types.UPDATE_EXERCISE });
  try {
    await loggedInAxios().put(
      `${url}/api/lifts/${exerciseId}`,
      data
    );

    dispatch(getExercises());
  } catch (err) {
    dispatch(exerciseFailure(err.message));
  }
};


export const getExercise = (name) => async dispatch => {
  dispatch({ type: types.GET_EXERCISE });
  try {
    const AxiosData = await loggedInAxios().get(
      `${url}/api/users/${userId}/${name}`
     
    );
      dispatch(exerciseSuccess(AxiosData.data));
   
  } catch (err){
    setTimeout(() => {
      dispatch(exerciseFailure(err.message));
    }, 3000);
    
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.clear("token");
    dispatch(loginSuccess(false));
    // eslint-disable-next-line no-restricted-globals
    if(location.pathname !== `/`){
        // eslint-disable-next-line no-restricted-globals
      location.pathname=(`/`)
    }

   
 
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};
