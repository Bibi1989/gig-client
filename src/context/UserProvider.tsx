import React, { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext<any | null>(null);

const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const GET_USER = "GET_USER";
const ERRORS = "ERRORS";
const LOADING = "LOADING";

const initialState = {
  register_user: null,
  login_user: null,
  get_user: null,
  errors: null,
  loading: false,
};

interface IState {
  register_user: null | {};
  login_user: null | {};
  get_user: null | {};
  errors: null | {};
  loading: boolean;
}

interface IAction {
  payload: any;
  type: string;
}

interface UInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        register_user: { ...action.payload },
      };
    case LOGIN_USER:
      return {
        ...state,
        login_user: { ...action.payload },
      };
    case GET_USER:
      return {
        ...state,
        get_user: { ...action.payload },
      };
    case ERRORS:
      return {
        ...state,
        errors: { ...action.payload },
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

const URL = "https://gig-api.herokuapp.com/auth/v1";
// const URL = "http://localhost:5005/auth/v1";

const AuthConfiq = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = async (user: UInterface, history: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${URL}/register`, user, AuthConfiq);
      sessionStorage.setItem("gig_token", response.data.token);
      history.push("/");
      dispatch({ type: REGISTER_USER, payload: response.data.data });
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: ERRORS, payload: error.response });
      console.log(error.response);
    }
  };
  const loginUser = async (user: any, history: any) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${URL}/login`, user, AuthConfiq);
      sessionStorage.setItem("gig_token", response.data.token);
      history.push("/");
      dispatch({ type: LOGIN_USER, payload: response.data.data });
      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: ERRORS, payload: error.response });
      console.log(error.response);
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
