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
export const selectCategory = value => {
  return {
    type: types.SELECT_CATEGORY,
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

export const getJournals = () => async dispatch => {
  dispatch({ type: types.FETCH_JOURNALS });
  try {
    const AxiosData = await loggedInAxios().get(
      "http:localhost:3000/api/journals"
    );
    dispatch(success(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};

export const addJournal = data => async dispatch => {
  dispatch({ type: types.ADD_JOURNAL });
  dispatch(selectCategory(data.category));
  try {
    await loggedInAxios().post("http:localhost:3000/api/journals", data);
    dispatch(getJournals());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const deleteJournal = id => async dispatch => {
  dispatch({ type: types.DELETE_JOURNAL });
  try {
    await loggedInAxios().delete(`http:localhost:3000/api/journals/${id}`);
    dispatch(getJournals());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const updateJournal = (id, data) => async dispatch => {
  dispatch({ type: types.UPDATE_JOURNAL });
  try {
    await loggedInAxios().put(`http:localhost:3000/api/journals/${id}`, data);
    dispatch(getJournal());
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const getJournal = id => async dispatch => {
  dispatch({ type: types.GET_JOURNAL });
  try {
    const AxiosData = await loggedInAxios().get(
      `http:localhost:3000/api/journals/${id}`
    );
    dispatch(success(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};
export const getReps = (id, repId) => async dispatch => {
  dispatch({ type: types.GET_REP });
  try {
    const AxiosData = await loggedInAxios().get(
      `http:localhost:3000/api/journals/${id}/rep/${repId}`
    );
    dispatch(succes(AxiosData.data));
  } catch {
    dispatch(failure(AxiosData.statusText));
  }
};
export const addReps = (id, data) => async dispatch => {
  // for the short reps use only (data)
  dispatch({ type: types.ADD_REPS });
  try {
    await loggedInAxios().post(`http:localhost:3000/api/journals/${id}`, data);
    // await loggedInAxios().post(`http:localhost:3000/api/reps`, data)
    dispatch(getJournal(id));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

// ask the backend guy if it best to use the long url or the short url
export const deleteReps = (id, repId) => async dispatch => {
  // (repId)
  dispatch({ type: types.DELETE_REPS });
  try {
    await loggedInAxios().delete(
      `http:localhost:3000/api/journals/${id}/reps/${repId}`
    );
    // await loggedInAxios().post(`http:localhost:3000/api/reps/${repId}`)
    dispatch(getJournal(id));
  } catch (err) {
    dispatch(failure(err.message));
  }
};

export const updateReps = (id, repId, data) => async dispatch => {
  // (repId , data)
  dispatch({ type: types.UPDATE_REPS });
  try {
    await loggedInAxios().put(
      `http:localhost:3000/api/journals/${id}/reps/${repId}`,
      data
    );
    dispatch(getReps(id, repId));
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
