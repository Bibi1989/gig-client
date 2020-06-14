import React, { createContext, useReducer, useState } from "react";
import axios from "axios";

export const GigContext = createContext<any | null>(null);

const FETCH_GIGS = "FETCH_GIGS";
const FETCH_PROFILE = "FETCH_PROFILE";
const ADD_GIGS = "ADD_GIGS";
const CURRENT_GIG = "CURRENT_GIG";
const UPDATE_GIG = "UPDATE_GIG";
const DELETE_GIG = "DELETE_GIG";
const SEARCH_GIG_LOCATION = "SEARCH_GIG_LOCATION";
const SEARCH_GIG_PROF = "SEARCH_GIG_PROF";
const SEARCH_GIG_TECH = "SEARCH_GIG_TECH";
const LOADING = "LOADING";

const initialState = {
  gigs: [],
  gig: [],
  current: {},
  update: {},
  delete_gig: {},
  loading: false,
};

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

const reducer = (state: IState, action: IAction) => {
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

const URL = "https://gig-api.herokuapp.com/api/v1/gig";
// const URL = "http://localhost:5005/api/v1/gig";

const AuthConfiq = {
  headers: {
    "Content-Type": "application/json",
    auth: sessionStorage.getItem("gig_token"),
  },
};

export const GigProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [skillError, setSkillError] = useState(false);

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

  const fetchProfileGig = async () => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.get(`${URL}/profile`, AuthConfiq);
      dispatch({ type: FETCH_PROFILE, payload: response.data.data });
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const addGig = async (gig: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${URL}`, gig, AuthConfiq);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: ADD_GIGS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const updateGig = async (id: number, gig: any) => {
    if (!gig.location || !gig.stack || !gig.proficiency || !gig.technologies) {
      setSkillError(true);
    }
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.patch(`${URL}/${id}`, gig, AuthConfiq);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: UPDATE_GIG, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const updateImage = async (id: number, file: any, gig: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.patch(`${URL}/upload/${id}`, { file, gig });
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: UPDATE_GIG, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const deleteGig = async (id: number) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.delete(`${URL}/${id}`, AuthConfiq);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: DELETE_GIG, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const currentGig = (gig: any) => {
    dispatch({ type: CURRENT_GIG, payload: gig });
  };
  return (
    <GigContext.Provider
      value={{
        fetchGig,
        fetchProfileGig,
        currentGig,
        updateGig,
        deleteGig,
        updateImage,
        gigs: state.gigs,
        gig: state.gig,
        current: state.current,
        update: state.update,
        delete_gig: state.delete_gig,
        loading: state.loading,
        skillError,
        setSkillError,
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
