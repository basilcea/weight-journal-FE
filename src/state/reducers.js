import * as types from "./actionTypes";
const initialState = {
  loggingIn: false,
  loggingOut: false,
  isLoggedIn: false,
  users:[],
  registering:false,
  addingJournal: false,
  fetchingJournals: false,
  deletingJournal: false,
  updatingJournal: false,
  gettingJournal: false,
  addingReps: false,
  deletingReps: false,
  updatingReps: false,
  gettingRep: false,
  journals: [],
  journal: {},
  reps: {},
  error: null
};
export const registerReducer = (state = initialState , action) => {
  switch(action.type){
    case types.REGISTER:
      return{...state , registering:true}
    case types.SUCCESS:
      return{...state, users:state.users.concat(action.payload), error:null}
    case types.FAILURE:
      return{...state, error:action.payload}
    case types.LOGIN:
      return{...state, loggingIn:true}
    default:
      return state;
  }
}
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, loggingIn: true };
    case types.LOGOUT:
      return { ...state, loggingOut: true };
    case types.SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggingOut: false,
        isLoggedIn: action.payload,
        error: null
      };
    case types.FAILURE:
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

export const journalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_JOURNAL:
      return {
        ...state,
        addingJournal: true
      };
    case types.FETCH_JOURNALS:
      return {
        ...state,
        fetchingJournals: true
      };
    case types.DELETE_JOURNAL:
      return {
        ...state,
        deletingJournals: true
      };
    case types.SUCCESS:
      return {
        ...state,
        journals: action.payload,
        addingJournal: false,
        fetchingJournals: false,
        deletingJournal: false,
        error: null
      };
    case types.FAILURE:
      return {
        ...state,
        addingJournal: false,
        fetchingJournals: false,
        deletingJournal: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JOURNAL:
      return {
        ...state,
        gettingJournal: true
      };
    case types.UPDATE_JOURNAL:
      return {
        ...state,
        updatingJournal: true
      };
    case types.ADD_REPS:
      return {
        ...state,
        addingReps: true
      };
    case types.DELETE_REPS:
      return {
        ...state,
        deletingReps: true
      };
    case types.SUCCESS:
      return {
        ...state,
        journal: action.payload,
        gettingJournal: false,
        updatingJournal: false,
        addingReps: false,
        deletingReps: false,
        error: null
      };
    case types.FAILURE:
      return {
        ...state,
        gettingJournal: false,
        updatingJournal: false,
        addingReps: false,
        deletingReps: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const repsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REP:
      return {
        ...state,
        gettingRep: true
      };
    case types.UPDATE_REPS:
      return {
        ...state,
        updatingReps: true
      };
    case types.SUCCESS:
      return {
        ...state,
        reps: action.payload,
        gettingRep: false,
        updatingReps: false,
        error: null
      };
    case types.FAILURE:
      return {
        ...state,
        gettingRep: false,
        updatingReps: false,
        error: action.payload
      };
    default:
      return state;
  }
};
