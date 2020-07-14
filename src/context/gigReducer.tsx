import {
  FETCH_GIGS,
  FETCH_PROFILE,
  CURRENT_GIG,
  UPDATE_GIG,
  DELETE_GIG,
  ADD_GIGS,
  SEARCH_GIG_LOCATION,
  SEARCH_GIG_PROF,
  SEARCH_GIG_TECH,
  LOADING,
} from "./gigTypes";

interface IAction {
  type: string;
  payload: any;
}

interface IState {
  gigs: any;
  gig: any;
  current: any;
  update: any;
  delete_gig: any;
  loading: boolean;
}

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case FETCH_GIGS:
      return {
        ...state,
        gigs: [...action.payload],
      };
    case FETCH_PROFILE:
      return {
        ...state,
        gig: [...action.payload],
      };
    case CURRENT_GIG:
      return {
        ...state,
        current: { ...action.payload },
      };
    case UPDATE_GIG:
      return {
        ...state,
        update: { ...action.payload },
      };
    case DELETE_GIG:
      return {
        ...state,
        delete_gig: { ...action.payload },
      };
    case SEARCH_GIG_PROF:
      return {
        ...state,
        gigs: [...action.payload],
      };
    case ADD_GIGS:
      return {
        ...state,
        gigs: [...state.gigs, action.payload],
      };
    case SEARCH_GIG_LOCATION:
      return {
        ...state,
        gigs: [...action.payload],
      };
    case SEARCH_GIG_TECH:
      return {
        ...state,
        gigs: [...action.payload],
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
