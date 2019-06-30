import * as types from "./actionTypes";

export const userReducer = (
  state = { gettingUser: false, updatingUser: false,deletingUser:false, user: [], error: null },
  action
) => {
  switch (action.type) {
    case types.GET_USER:
      return { ...state, gettingUser: true };
    case types.UPDATE_USER:
      return { ...state, updatingUser: true };
    case types.DELETE_USER:
     return {...state , deletingUser:true};
    case types.USER_SUCESS:
      return {
        ...state,
        user: action.payload,
        gettingUser: false,
        updatingUser: false,
        error: null
      };
    case types.USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        gettingUser: false,
        updatingUser: false
      };
    default:
      return state;
  }
};

export const loginReducer = (
  state = {
    registering:false,
    loggingIn: false,
    loggingOut: false,
    isLoggedIn: localStorage.getItem("token") && true,
    error: null
  },
  action
) => {
  switch (action.type) {
    case types.REGISTER:
      return { ...state, registering: true };
    case types.LOGIN:
      return { ...state, loggingIn: true };
    case types.LOGOUT:
      return { ...state, loggingOut: true };
    case types.LOGIN_SUCESS:
      return {
        ...state,
        loggingIn: false,
        loggingOut: false,
        isLoggedIn: true,
        error: null
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggingOut: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const exercisesReducer = (
  state = {
    addingExercise: false,
    fetchingExercises: false,
    deletingExercise: false,
    exercises: [],
    error: '',
  },
  action
) => {
  switch (action.type) {
    case types.ADD_EXERCISE:
      return {
        ...state,
        addingExercise: true
      };
    case types.FETCH_EXERCISES:
      return {
        ...state,
        fetchingExercises: true
      };
    case types.DELETE_EXERCISE:
      return {
        ...state,
        deletingExercise: true
      };
    case types.EXERCISES_SUCCESS:
      return {
        ...state,
        exercises: action.payload,
        addingExercise: false,
        fetchingExercises: false,
        deletingExercise: false,
        error: null
      };
    case types.EXERCISES_FAILURE:
      return {
        ...state,
        addingExercise: false,
        fetchingExercises: false,
        deletingExercise: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export const exerciseReducer = (
  state = {
    gettingExercise: "initial",
    updatingExercise: false,
    addingWorkout: false,
    deletingWorkout: false,
    error: null,
    exercise: [],
  },
  action
) => {
  switch (action.type) {
    case types.GET_EXERCISE:
      return {
        ...state,
        gettingExercise: true
      };
    case types.EXERCISE_SUCCESS:
      return {
        ...state,
        exercise: action.payload,
        gettingExercise: false,
        updatingExercise: false,
        addingWorkout: false,
        deletingWorkout: false,
        error: null
      };
    case types.EXERCISE_FAILURE:
      return {
        ...state,
        gettingExercise: false,
        updatingExercise: false,
        addingWorkout: false,
        deletingWorkout: false,
        error: action.payload
      };
    default:
      return state;
  }
};

