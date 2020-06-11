import React, { createContext, useReducer } from "react";
import axios from "axios";

export const GigContext = createContext<any | null>(null);

const FETCH_GIGS = "FETCH_GIGS";
const ADD_GIGS = "ADD_GIGS";
const SEARCH_GIG_LOCATION = "SEARCH_GIG_LOCATION";
const SEARCH_GIG_PROF = "SEARCH_GIG_PROF";
const SEARCH_GIG_TECH = "SEARCH_GIG_TECH";

const initialState = {
  gigs: [],
  store: [],
};

interface IAction {
  FETCH_GIGS: string;
}

interface IState {
  gigs: any[];
  store: any[];
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

    default:
      return state;
  }
};

const URL = "https://gig-api.herokuapp.com/api/v1/gig";

export const GigProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchGigLocation = async (text: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/v1/gig/search?location=${text}`
      );
      dispatch({ type: SEARCH_GIG_LOCATION, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
    }
  };
  const searchGigProficiency = async (text: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/v1/gig/search?proficiency=${text}`
      );
      dispatch({ type: SEARCH_GIG_PROF, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
    }
  };
  const searchGigTech = async (text: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/v1/gig/search?tech=${text}`
      );
      dispatch({ type: SEARCH_GIG_TECH, payload: response.data.data });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchGig = async () => {
    const response = await axios.get("http://localhost:5005/api/v1/gig");
    dispatch({ type: FETCH_GIGS, payload: response.data.data });
  };

  const addGig = async (gig: any) => {
    const response = await axios.post("http://localhost:5005/api/v1/gig", gig, {
      headers: {
        "Content-type": "application/json",
      },
    });
    dispatch({ type: ADD_GIGS, payload: response.data.data });
    dispatch({ type: SEARCH_GIG_PROF, payload: response.data.data });
  };
  return (
    <GigContext.Provider
      value={{
        fetchGig,
        gigs: state.gigs,
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
