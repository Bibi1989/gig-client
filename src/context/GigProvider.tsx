import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { reducer } from "./gigReducer";
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

export const GigContext = createContext<any | null>(null);

const initialState = {
  gigs: [],
  gig: [],
  current: {},
  update: {},
  delete_gig: {},
  loading: false,
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
      const response = await axios.get(
        `${URL}/search?location=${text.toLowerCase()}`
      );
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
  const updateImage = async (id: number, file: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.patch(`${URL}/upload/${id}`, file, {
        headers: {
          "content-type": "multipart/form-data",
          auth: sessionStorage.getItem("gig_token"),
        },
      });
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
