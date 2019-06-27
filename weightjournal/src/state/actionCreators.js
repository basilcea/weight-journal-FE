import * as types from "./actionTypes";
import axios from "axios";
const url = 'https://weight-journal-backend.herokuapp.com'
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
      `http://localhost:5000/user/${userId}`
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

export const getExercises = () => async dispatch => {
  dispatch({ type: types.FETCH_EXERCISES });
  try {
    const AxiosData = await loggedInAxios().get(
      `${url}/api/lifts`
    );

      dispatch(success(AxiosData.data));
  } catch(err) {
      dispatch(failure(err.message));
}
}

export const addExercises = data => async dispatch => {
  dispatch({ type: types.ADD_EXERCISE });
  try {
    await loggedInAxios().post("http://localhost:5000/exercises", data);
    debugger
    dispatch(getExercises());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const deleteExercises = exerciseId => async dispatch => {
  dispatch({ type: types.DELETE_EXERCISE });
  try {
    await loggedInAxios().delete(
      `http://localhost:3000/api/exercises/${exerciseId}`
    );
    dispatch(getExercises());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const updateExercises = (exerciseId, data) => async dispatch => {
  dispatch({ type: types.UPDATE_EXERCISE });
  try {
    await loggedInAxios().put(
      `http:localhost:3000/api/exercises/${exerciseId}`,
      data
    );
    dispatch(getExercise());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const getExercise = exerciseId => async dispatch => {
  dispatch({ type: types.GET_EXERCISE });
  try {
    const AxiosData = await loggedInAxios().get(
      `http:localhost:3000/api/exercises/${exerciseId}`
    );
    setTimeout(() => {
      dispatch(success(AxiosData.data));
    }, 3000); 
  } catch (err){
    setTimeout(() => {
      dispatch(failure(err.message));
    }, 3000);
    
  }
};
export const addWorkout = (exerciseId, data) => async dispatch => {
  // for the short reps use only (data)
  dispatch({ type: types.ADD_WORKOUT });
  try {
    await loggedInAxios().post(
      `http:localhost:3000/api/exercises/${exerciseId}`,
      data
    );
    // await loggedInAxios().post(`http:localhost:3000/api/reps`, data)
    dispatch(getExercise(exerciseId));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

// ask the backend guy if it best to use the long url or the short url
export const deleteWorkout = (exerciseId, workoutId) => async dispatch => {
  // (repId)
  dispatch({ type: types.DELETE_WORKOUT });
  try {
    await loggedInAxios().delete(
      `http:localhost:3000/api/exercises/${exerciseId}/workout/${workoutId}`
    );
    // await loggedInAxios().post(`http:localhost:3000/api/reps/${repId}`)
    dispatch(getExercise(exerciseId));
  } catch (err) {
    dispatch(failure(err.message));
  }
};
export const getWorkouts = (exerciseId) => async dispatch => {
  dispatch({ type: types.GET_WORKOUTS });
 
  try {
    const AxiosData = await loggedInAxios().get(
      `http:localhost:3000/api/exercises/${exerciseId}/workout`
    );
    dispatch(success(AxiosData.data));
  } catch(err) {
    dispatch(failure(err.message));
  }
};

export const updateWorkout = (exerciseId, workoutId, data) => async dispatch => {
  // (repId , data)
  dispatch({ type: types.UPDATE_WORKOUT });
  try {
    await loggedInAxios().put(
      `http:localhost:3000/api/exercise/${exerciseId}/workout/${workoutId}`,
      data
    );
    dispatch(getWorkouts(exerciseId, workoutId));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const logout = () => async dispatch => {
  // check if backend guy implemented a route for token blacklisting with redis
  // if backend guy did then
  try {
    /* await loggedInAxios().get(
            `http:localhost:3000/api/logout `

        ) */
    localStorage.clearItem("token");
    dispatch(success(false));
  } catch (err) {
    dispatch(failure(err.message));
  }
};
