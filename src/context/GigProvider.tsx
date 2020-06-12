import React, { createContext, useReducer } from "react";
import axios from "axios";

export const GigContext = createContext<any | null>(null);

const FETCH_GIGS = "FETCH_GIGS";
const ADD_GIGS = "ADD_GIGS";
const SEARCH_GIG_LOCATION = "SEARCH_GIG_LOCATION";
const SEARCH_GIG_PROF = "SEARCH_GIG_PROF";
const SEARCH_GIG_TECH = "SEARCH_GIG_TECH";
const LOADING = "LOADING";

const initialState = {
  gigs: [],
  loading: false,
};

interface IAction {
  FETCH_GIGS: string;
}

interface IState {
  gigs: any[];
  loading: boolean;
}

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case FETCH_GIGS:
      return {
        ...state,
        gigs: [...action.payload],
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

// const URL = "https://gig-api.herokuapp.com/api/v1/gig";
const URL = "http://localhost:5005/api/v1/gig";

export const GigProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchGigLocation = async (text: string) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.get(`${URL}/search?location=${text}`);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: SEARCH_GIG_LOCATION, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const searchGigProficiency = async (text: string) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.get(`${URL}/search?proficiency=${text}`);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: SEARCH_GIG_PROF, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const searchGigTech = async (text: string) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.get(`${URL}/search?tech=${text}`);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: SEARCH_GIG_TECH, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const fetchGig = async () => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.get(`${URL}`);
      dispatch({ type: FETCH_GIGS, payload: response.data.data });
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const addGig = async (gig: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${URL}`, gig, {
        headers: {
          "Content-type": "application/json",
        },
      });
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: ADD_GIGS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  return (
    <GigContext.Provider
      value={{
        fetchGig,
        gigs: state.gigs,
        loading: state.loading,
        addGig,
        searchGigLocation,
        searchGigProficiency,
        searchGigTech,
      }}
    >
      {children}
    </GigContext.Provider>
  );
};
