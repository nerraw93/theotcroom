import { RSAA } from "redux-api-middleware";

export const LOGIN = "auth:login";
export const LOGIN_SUCCESS = "auth:login_success";
export const LOGIN_FAILURE = "auth:login_failure";

export const REGISTER = "auth:register";
export const REGISTER_SUCCESS = "auth:register_success";
export const REGISTER_FAILURE = "auth:register_failure";

export const ME = "auth:me";
export const ME_SUCCESS = "auth:me_success";
export const ME_FAILURE = "auth:me_failure";

export const LOGOUT = "auth:logout";
export const LOGOUT_SUCCESS = "auth:logout_failure";

export function login(data) {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_API_HOST}/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE]
    }
  }
}

export function register(data) {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_API_HOST}/register`,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE]
    }
  }
}

export function me() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    window.http.setToken(token);

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/me`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [ME, ME_SUCCESS, ME_FAILURE]
      }
    })
  }
}

export function logout() {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT,
    });
    await dispatch({
      type: LOGOUT_SUCCESS,
    });
    window.localStorage.removeItem("persist:root");
    window.location = '/';
  };
}

const ACTION_HANDLERS = {
  [LOGIN]: state => ({
    ...state,
    loggingIn: true,
    loginSuccess: false,
    loginError: false
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loggingIn: false,
    loginSuccess: true,
    loginError: false,
    token: action.payload.token,
    isGuest: false,
  }),
  [LOGIN_FAILURE]: state => ({
    ...state,
    loggingIn: false,
    loginSuccess: false,
    loginError: true,
  }),
  [REGISTER]: state => ({
    ...state,
    registering: true,
    registerSuccess: false,
    registerError: false
  }),
  [REGISTER_SUCCESS]: (state, action) => ({
    ...state,
    registering: false,
    registerSuccess: true,
    registerError: false,
    token: action.payload.token
  }),
  [REGISTER_FAILURE]: state => ({
    ...state,
    registering: false,
    registerSuccess: false,
    registerError: true
  }),
  [ME]: state => ({
    ...state,
    fetchingMe: true
  }),
  [ME_SUCCESS]: (state, action) => ({
    ...state,
    fetchingMe: false,
    myself: action.payload.user,
    isGuest: false,
  }),
  [ME_FAILURE]: state => ({
    ...state,
    fetchingMe: false
  })
};

const initialState = {
    myself: null,
    isGuest: true,
    loggingIn: false,
    loginSuccess: false,
    loginError: false,
    registering: false,
    registerSuccess: false,
    registerError: false,
    token: null
};

export default function auth(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
