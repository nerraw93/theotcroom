import { RSAA } from "redux-api-middleware";

export const RESERVE = "auth:reserve";
export const RESERVE_SUCCESS = "auth:reserve_success";
export const RESERVE_FAILURE = "auth:reserve_failure";
export const COUNT_RESERVATIONS = "auth:count_reservations";
export const COUNT_RESERVATIONS_SUCCESS = "auth:count_reservations_success";
export const COUNT_RESERVATIONS_FAILURE = "auth:count_reservations_failure";
export const FETCH_RESERVATIONS = "auth:fetch_reservations";
export const FETCH_RESERVATIONS_SUCCESS = "auth:fetch_reservations_success";
export const FETCH_RESERVATIONS_FAILURE = "auth:fetch_reservations_failure";
export const COUNT_DEALS = "auth:count_deals";
export const COUNT_DEALS_SUCCESS = "auth:count_deals_success";
export const COUNT_DEALS_FAILURE = "auth:count_deals_failure";
export const COUNT_USERS = "auth:count_users";
export const COUNT_USERS_SUCCESS = "auth:count_users_success";
export const COUNT_USERS_FAILURE = "auth:count_users_failure";
export const WEEKLY_USERS = "auth:weekly_users";
export const WEEKLY_USERS_SUCCESS = "auth:weekly_users_success";
export const WEEKLY_USERS_FAILURE = "auth:weekly_users_failure";

export function reserve(id) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/icos/${id}/reserve`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [RESERVE, RESERVE_SUCCESS, RESERVE_FAILURE]
      }
    })
  }
}

export function countReservations() {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/reservations/count`,
        method: "GET",
        headers: {
          "Accept": "application/json; charset=UTF-8",
        },
        types: [COUNT_RESERVATIONS, COUNT_RESERVATIONS_SUCCESS, COUNT_RESERVATIONS_FAILURE]
      }
    })
  }
}

export function fetchReservations(id) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/icos/${id}/reservations`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [FETCH_RESERVATIONS, FETCH_RESERVATIONS_SUCCESS, FETCH_RESERVATIONS_FAILURE]
      }
    })
  }
}

export function countDeals() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/me/count-deals`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [COUNT_DEALS, COUNT_DEALS_SUCCESS, COUNT_DEALS_FAILURE]
      }
    })
  }
}

export function countUsers() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/admin/dashboard/statistics`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [COUNT_USERS, COUNT_USERS_SUCCESS, COUNT_USERS_FAILURE]
      }
    })
  }
}

export function getWeeklyUsers() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/me/users/`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [WEEKLY_USERS, WEEKLY_USERS_SUCCESS, WEEKLY_USERS_FAILURE]
      }
    })
  }
}

export function getWeeklyUsersByDate(from, to) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/me/users/${from}/${to}`,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [WEEKLY_USERS, WEEKLY_USERS_SUCCESS, WEEKLY_USERS_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [RESERVE]: state => ({ ...state, reservations: { processing: true, success: false, error: false} }),
  [RESERVE_SUCCESS]: state => ({ ...state, reservations: { processing: false, success: true, error: false} }),
  [RESERVE_FAILURE]: state => ({ ...state, reservations: { processing: false, success: false, error: true} }),

  [COUNT_RESERVATIONS]: state => ({ ...state, reservations: { counting: true, successCounting: false } }),
  [COUNT_RESERVATIONS_SUCCESS]: (state, action) => ({ ...state, reservations: { counting: false, successCounting: true, total: action.payload.no_of_reservations } }),
  [COUNT_RESERVATIONS_FAILURE]: state => ({ ...state, reservations: { counting: false, successCounting: false } }),

  [FETCH_RESERVATIONS]: state => ({ ...state, reservations: { processing: true, success: false, error: false} }),
  [FETCH_RESERVATIONS_SUCCESS]: (state, action) => ({ ...state, reservations: { processing: false, success: true, error: false, list: action.payload.reservations } }),
  [FETCH_RESERVATIONS_FAILURE]: state => ({ ...state, reservations: { processing: false, success: false, error: true} }),

  [COUNT_DEALS]: state => ({ ...state, deals: { processing: true, success: false, error: false} }),
  [COUNT_DEALS_SUCCESS]: (state, action) => ({ ...state, deals: { processing: false, success: true, error: false, deals: action.payload.no_of_deals } }),
  [COUNT_DEALS_FAILURE]: state => ({ ...state, deals: { processing: false, success: false, error: true} }),

  [COUNT_USERS]: state => ({ ...state, total_users: { processing: true, success: false, error: false} }),
  [COUNT_USERS_SUCCESS]: (state, action) => ({ ...state, total_users: { processing: false, success: true, error: false, users: action.payload.total_no_of_users } }),
  [COUNT_USERS_FAILURE]: state => ({ ...state, total_users: { processing: false, success: false, error: true} }),

  [WEEKLY_USERS]: state => ({ ...state, users: { processing: true, success: false, error: false} }),
  [WEEKLY_USERS_SUCCESS]: (state, action) => ({ ...state, users: { processing: false, success: true, error: false, users: action.payload.no_of_users } }),
  [WEEKLY_USERS_FAILURE]: state => ({ ...state, users: { processing: false, success: false, error: true} }),
};

const initialState = {
  reservations: {
    processing: false,
    success: false,
    error: false,
    counting: null,
    list: null,
    total: 0
  },

  deals: {
    processing: false,
    success: false,
    error: false,
    total: 0
  },

  users: {
    processing: false,
    success: false,
    error: false,
    total: 0,
  },

  total_users: 0
};

export default function reservations(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
