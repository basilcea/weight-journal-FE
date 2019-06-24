import * as types from "./actionTypes";
import axios from "axios";

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
export const register = (data) => async dispatch => {
  dispatch({ type: types.REGISTER });
  try{
    await axios.post('http:localhost:3000/api/register', data)
    dispatch(success(data));
    dispatch(login(data.username, data.password))
    }
    catch(err){
      dispatch(failure(err.nessage))
    }
  }

export const login = (username, password) => async dispatch => {
  dispatch({ type: types.LOGIN });
  const AxiosData = await axios.post("http:localhost:3000/api/login", {
    username,
    password
  });
  try {
    localStorage.setItem("token", AxiosData.data);
    dispatch(success(true));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};

export const getExercises = () => async dispatch => {
  dispatch({ type: types.FETCH_EXERCISES });
  const AxiosData = await loggedInAxios().get(
    "http:localhost:3000/api/exercises"
  );
  try {

    dispatch(success(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};

export const addExercises = data => async dispatch => {
  dispatch({ type: types.ADD_EXERCISE });
  try {
    await loggedInAxios().post("http:localhost:3000/api/exercises", data);
    dispatch(getExercises());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const deleteExercises = exerciseId => async dispatch => {
  dispatch({ type: types.DELETE_EXERCISE });
  try {
    await loggedInAxios().delete(`http:localhost:3000/api/exercises/${exerciseId}`);
    dispatch(getExercises());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const updateExercises = (exerciseId, data) => async dispatch => {
  dispatch({ type: types.UPDATE_EXERCISE });
  try {
    await loggedInAxios().put(`http:localhost:3000/api/exercises/${exerciseId}`, data);
    dispatch(getExercise());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const getExercise = exerciseId => async dispatch => {
  dispatch({ type: types.GET_EXERCISE });
  const AxiosData = await loggedInAxios().get(
    `http:localhost:3000/api/exercises/${exerciseId}`
  );
  try {
    dispatch(success(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};
export const addWorkout = (exerciseId, data) => async dispatch => {
  // for the short reps use only (data)
  dispatch({ type: types.ADD_WORKOUT});
  try {
    await loggedInAxios().post(`http:localhost:3000/api/exercises/${exerciseId}`, data);
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
export const getWorkout = (exerciseId, workoutId) => async dispatch => {
  dispatch({ type: types.GET_WORKOUT});
  const AxiosData = await loggedInAxios().get(
    `http:localhost:3000/api/exercises/${exerciseId}/workout/${workoutId}`
  );
  try {
 
    dispatch(success(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};

export const updateReps = (exerciseId, workoutId, data) => async dispatch => {
  // (repId , data)
  dispatch({ type: types.UPDATE_WORKOUT });
  try {
    await loggedInAxios().put(
      `http:localhost:3000/api/exercise/${exerciseId}/workout/${workoutId}`,
      data
    );
    dispatch(getWorkout(exerciseId, workoutId));
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
