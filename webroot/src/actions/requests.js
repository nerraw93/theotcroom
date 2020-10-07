import { RSAA } from "redux-api-middleware";

export const FETCH_REQUESTS = "auth:fetch_requests";
export const FETCH_REQUESTS_SUCCESS = "auth:fetch_requests_success";
export const FETCH_REQUESTS_FAILURE = "auth:fetch_requests_failure";
export const APPROE_DENY_REQUEST = "auth:approve_deny_request";
export const APPROE_DENY_REQUEST_SUCCESS = "auth:approve_deny_request_success";
export const APPROE_DENY_REQUEST_FAILURE = "auth:approve_deny_request_failure";

export function fetchRequests(status = null) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    let endpoint = `${process.env.REACT_APP_API_HOST}/order/requests/`;

    if (status) {
      endpoint += status;
    }

    return dispatch({
      [RSAA]: {
        endpoint,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [FETCH_REQUESTS, FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE]
      }
    })
  }
}

export function approveOrDenyRequest(aid, oid, action) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/order/${aid}/requests/${oid}/${action}`,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json; charset=UTF-8",
        },
        types: [APPROE_DENY_REQUEST, APPROE_DENY_REQUEST_SUCCESS, APPROE_DENY_REQUEST_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [FETCH_REQUESTS]: state => ({ ...state, fetchingRequests: true, createSuccess: false, fetchingRequestsSuccess: false, changingRequestSuccess: false }),
  [FETCH_REQUESTS_SUCCESS]: (state, action) => ({ ...state, fetchingRequests: false, fetchingRequestsSuccess: true, requests: action.payload.requests }),
  [FETCH_REQUESTS_FAILURE]: state => ({ ...state, fetchingRequests: false, fetchingRequestsSuccess: false }),

  [APPROE_DENY_REQUEST]: state => ({ ...state, changingRequest: true, createSuccess: false }),
  [APPROE_DENY_REQUEST_SUCCESS]: (state, action) => ({ ...state, changingRequest: false, changingRequestSuccess: true }),
  [APPROE_DENY_REQUEST_FAILURE]: state => ({ ...state, changingRequest: false, changingRequestSuccess: false }),
};

const initialState = {
  fetchingRequests: false,
  fetchingRequestsSuccess: false,
  requests: null,

  changingRequest: false,
  changingRequestSuccess: false
};

export default function requests(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
