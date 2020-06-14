import React, { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext<any | null>(null);

const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const GET_USER = "GET_USER";
const ERRORS = "ERRORS";
const INVALID_PASSWORD = "INVALID_PASSWORD";
const LOADING = "LOADING";

const initialState = {
  register_user: null,
  login_user: null,
  get_user: null,
  errors: null,
  invalid_password: null,
  loading: false,
};

interface IState {
  register_user: null | {};
  login_user: null | {};
  get_user: null | {};
  errors: null | {};
  invalid_password: null | {};
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
    case INVALID_PASSWORD:
      return {
        ...state,
        invalid_password: { ...action.payload },
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

// const URL = "https://gig-api.herokuapp.com/auth/v1";
const URL = "http://localhost:5005/auth/v1";

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
      console.log(error.response);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: ERRORS, payload: error.response.data.error });
    }
  };
  const loginUser = async (user: any, path: string) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${URL}/login`, user, AuthConfiq);
      sessionStorage.setItem("gig_token", response.data.token);
      dispatch({ type: LOADING, payload: false });
      window.location.href = path;
      dispatch({ type: LOGIN_USER, payload: response.data.data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
      dispatch({
        type: ERRORS,
        payload:
          error.response === undefined
            ? { network: "No network!!!" }
            : error.response.data.error,
      });
      if (error.response.data.status === "invalid")
        return dispatch({
          type: INVALID_PASSWORD,
          payload: { error: error.response.data.error },
        });
    }
  };
  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        loading: state.loading,
        errors: state.errors,
        invalid_password: state.invalid_password,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
