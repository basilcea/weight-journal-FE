import * as types from "./actionTypes";
import axios from "axios";
// const url = 'https://weight-journal-backend.herokuapp.com'
const url ='http://localhost:7000'
const loggedInAxios = () => {
  const token = localStorage.getItem("token") || false;
  const instance = axios.create({
    headers: {
      Authorization: token
    }
  });
  return instance;
};
export const success = value => {
  return {
    type: types.SUCCESS,
    payload: value
  };
};
export const successful = value => {
  return {
    type: types.SUCCESSFUL,
    payload: value
  };
};

export const failure = value => {
  return {
    type: types.FAILURE,
    payload: value
  };
};

export const register = data => async dispatch => {
  dispatch({ type: types.REGISTER });
  try {
    const AxiosData = await axios.post(`${url}/api/register`, data);
    localStorage.setItem('token', AxiosData.data.token)
    dispatch(success());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const login = (data) => async dispatch => {
  dispatch({ type: types.LOGIN });
  
  try {
    const AxiosData = await axios.post(`${url}/api/login`, data);
    localStorage.setItem("token", AxiosData.data.token);
    dispatch(success());
  } catch(err) {
    dispatch(failure(err.message));
  }
};
export const getProfile = userId => async dispatch => {
  dispatch({ type: types.GET_USER });
  try {
    const AxiosData = await loggedInAxios().get(
      `${url}/api/users/${userId}`
    );
    dispatch(success(AxiosData.data));
  } catch(err) {
    dispatch(failure(err.message));
  }
};
// export const deleteProfile = (userId) => async dispatch => {

// }
export const updateProfile = (userId ,data)=> async dispatch => {
  dispatch({ type: types.UPDATE_USER });
  try {
    await loggedInAxios().put(`http://localhost:3000/api/user/${userId}`, data);
    dispatch(getProfile(userId));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const getExercises = (id) => async dispatch => {
  dispatch({ type: types.FETCH_EXERCISES });
  try {
    const AxiosData = await loggedInAxios().get(`${url}/api/users/${id}/lifts`);
      dispatch(success(AxiosData.data));
  } catch(err) {
      dispatch(failure(err.message));
}
}

export const addExercises = (id,data) => async dispatch => {
  dispatch({ type: types.ADD_EXERCISE });
  try {
    await loggedInAxios().post(`${url}/api/lifts`, data);
    dispatch(getExercises(id));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const deleteExercises = (id,exerciseId) => async dispatch => {
  dispatch({ type: types.DELETE_EXERCISE });
  try {
    await loggedInAxios().delete(
      `${url}/api/lifts/${exerciseId}`
    );
    dispatch(getExercises(id));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const updateExercises = (id,exerciseId, data) => async dispatch => {
  dispatch({ type: types.UPDATE_EXERCISE });
  try {
    await loggedInAxios().put(
      `${url}/api/lifts/${exerciseId}`,
      data
    );

    dispatch(getExercises(id));
  } catch (err) {
    dispatch(failure(err.message));
  }
};


export const getExercise = (userId, name) => async dispatch => {
  dispatch({ type: types.GET_EXERCISE });
  try {
    const AxiosData = await loggedInAxios().get(
      `${url}/api/users/${userId}/${name}`
     
    );
      dispatch(successful(AxiosData.data));
   
  } catch (err){
    setTimeout(() => {
      dispatch(failure(err.message));
    }, 3000);
    
  }
};

export const logout = () => async dispatch => {
  // check if backend guy implemented a route for token blacklisting with redis
  // if backend guy did then
  try {
    /* await loggedInAxios().get(
            `http:localhost:3000/api/logout `

        ) */
    localStorage.clear("token");
    dispatch(success(false));
  } catch (err) {
    dispatch(failure(err.message));
  }
};
