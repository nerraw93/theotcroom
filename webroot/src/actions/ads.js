import { RSAA } from "redux-api-middleware";

export const FETCH_ADS = "auth:fetch_ads";
export const FETCH_ADS_SUCCESS = "auth:fetch_ads_success";
export const FETCH_ADS_FAILURE = "auth:fetch_ads_failure";
export const FETCH_ICO_DETAIL = "auth:fetch_ico_detail";
export const FETCH_ICO_DETAIL_SUCCESS = "auth:fetch_ico_detail_success";
export const FETCH_ICO_DETAIL_FAILURE = "auth:fetch_ico_detail_failure";
export const CREATE_ICO = "auth:create_ico";
export const CREATE_ICO_SUCCESS = "auth:create_ico_success";
export const CREATE_ICO_FAILURE = "auth:create_ico_failure";
export const FETCH_COMMENTS = "auth:fetch_comments";
export const FETCH_COMMENTS_SUCCESS = "auth:fetch_comments_success";
export const FETCH_COMMENTS_FAILURE = "auth:fetch_comments_failure";
export const WRITE_COMMENT = "auth:write_comment";
export const WRITE_COMMENT_SUCCESS = "auth:write_comment_success";
export const WRITE_COMMENT_FAILURE = "auth:write_comment_failure";
export const MY_ORDERS = "auth:my_orders";
export const MY_ORDERS_SUCCESS = "auth:my_orders_success";
export const MY_ORDERS_FAILURE = "auth:my_orders_failure";
export const TOGGLE_ORDER_HIDE_SHOW = "auth:toggle_order_hide_show";
export const TOGGLE_ORDER_HIDE_SHOW_SUCCESS = "auth:toggle_order_hide_show_success";
export const TOGGLE_ORDER_HIDE_SHOW_FAILURE = "auth:toggle_order_hide_show_failure";
export const ADD_NOTE = "auth:add_note";
export const ADD_NOTE_SUCCESS = "auth:add_note_success";
export const ADD_NOTE_FAILURE = "auth:add_note_failure";

export function fetchAds(name = null) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        let endpoint = `${process.env.REACT_APP_API_HOST}/icos/all/`;

        if (name) {
            endpoint += name;
        }

        return dispatch({
            [RSAA]: {
                endpoint,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [FETCH_ADS, FETCH_ADS_SUCCESS, FETCH_ADS_FAILURE]
            }
        })
    }
}

export function createIco(data) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/icos`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data),
                types: [CREATE_ICO, CREATE_ICO_SUCCESS, CREATE_ICO_FAILURE]
            }
        })
    }
}

export function fetchIcoDetails(id) {

    return dispatch => {
        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/order/${id}`,
                method: "GET",
                headers: {
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [FETCH_ICO_DETAIL, FETCH_ICO_DETAIL_SUCCESS, FETCH_ICO_DETAIL_FAILURE]
            }
        })
    }
}

export function fetchComments(id, userId) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/icos/${id}/comments/${userId}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [FETCH_COMMENTS, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE]
            }
        })
    }
}

export function writeComments(id, message) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/icos/${id}/comment`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(message),
                types: [WRITE_COMMENT, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE]
            }
        })
    }
}

export function myOrders() {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/my-orders`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [MY_ORDERS, MY_ORDERS_SUCCESS, MY_ORDERS_FAILURE]
            }
        })
    }
}

export function toggleIcoHideShow(id) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/icos/${id}/toggle`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                    "Content-Type": "application/json; charset=UTF-8",
                },
                types: [TOGGLE_ORDER_HIDE_SHOW, TOGGLE_ORDER_HIDE_SHOW_SUCCESS, TOGGLE_ORDER_HIDE_SHOW_FAILURE]
            }
        })
    }
}

export function addNote(data) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/icos/${data.id}/update-notes`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data),
                types: [ADD_NOTE, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE]
            }
        })
    }
}

const ACTION_HANDLERS = {
    [FETCH_ADS]: state => ({ ...state, fetchingAds: true, createSuccess: false }),
    [FETCH_ADS_SUCCESS]: (state, action) => ({ ...state, fetchingAds: false, fetchingAdsSuccess: true, ads: action.payload.icos }),
    [FETCH_ADS_FAILURE]: state => ({ ...state, fetchingAds: false, fetchingAdsSuccess: false }),

    [FETCH_ICO_DETAIL]: state => ({ ...state, icoDetails: { processing: true, success: false } }),
    [FETCH_ICO_DETAIL_SUCCESS]: (state, action) => ({ ...state, icoDetails: { processing: false, success: true, error: false, data: action.payload.ico } }),
    [FETCH_ICO_DETAIL_FAILURE]: state => ({ ...state, icoDetails: { processing: false, success: false, error: true } }),

    [CREATE_ICO]: state => ({ ...state, creatingIco: true, creatingIcoSuccess: false, creatingIcoError: false }),
    [CREATE_ICO_SUCCESS]: (state, action) => ({ ...state, creatingIco: false, creatingIcoSuccess: true, creatingIcoError: false, ico: action.payload }),
    [CREATE_ICO_FAILURE]: state => ({ ...state, creatingIco: false, creatingIcoSuccess: false, creatingIcoError: true }),

    [FETCH_COMMENTS]: state => ({ ...state, comments: { processing: true, success: false, error: false}, comment: { processing: false } }),
    [FETCH_COMMENTS_SUCCESS]: (state, action) => ({ ...state, comments: { processing: false, success: true, error: false, comments: action.payload.comments} }),
    [FETCH_COMMENTS_FAILURE]: state => ({ ...state, comments: { processing: false, success: false, error: true} }),

    [WRITE_COMMENT]: state => ({ ...state, comment: { processing: true, success: false, error: false }, comments: { processing: false } }),
    [WRITE_COMMENT_SUCCESS]: state => ({ ...state, comment: { processing: false, success: true, error: false } }),
    [WRITE_COMMENT_FAILURE]: state => ({ ...state, comment: { processing: false, success: false, error: true} }),

    [MY_ORDERS]: state => ({ ...state, orders: { processing: true, success: false, error: false} }),
    [MY_ORDERS_SUCCESS]: (state, action) => ({ ...state, orders: { processing: false, success: true, error: false, orders: action.payload.my_orders } }),
    [MY_ORDERS_FAILURE]: state => ({ ...state, orders: { processing: false, success: false, error: true} }),

    [TOGGLE_ORDER_HIDE_SHOW]: state => ({ ...state, togglingIcoSuccess: false, togglingIcoError: false }),
    [TOGGLE_ORDER_HIDE_SHOW_SUCCESS]: (state, action) => ({ ...state, togglingIcoSuccess: true, togglingIcoError: false,
        orders: {
            processing: false,
            success: true,
            error: false,
            orders: action.payload.my_orders } }),
    [TOGGLE_ORDER_HIDE_SHOW_FAILURE]: state => ({ ...state, togglingIcoSuccess: false, togglingIcoError: true }),

    [ADD_NOTE]: state => ({ ...state, notes: { processing: true, success: false, error: false }}),
    [ADD_NOTE_SUCCESS]: (state, action) => ({ ...state, notes: {processing: false, success: true, error: false},
        orders: {
            processing: false,
            success: true,
            error: false,
            orders: action.payload.my_orders } }),
    [ADD_NOTE_FAILURE]: state => ({ ...state, notes: { processing: false, success: false, error: true }}),
};

const initialState = {
    fetchingAds: false,
    fetchingAdsSuccess: false,
    ads: null,

    creatingIco: false,
    creatingIcoSuccess: false,
    ico: null,

    icoDetails: {
        processing: false,
        success: false,
        error: false,
        reservations: null
    },

    comments: {
        processing: false,
        success: false,
        error: false,
        comments: null
    },

    comment: {
        processing: false,
        success: false,
        error: false
    },

    orders: {
        processing: false,
        success: false,
        error: false,
        orders: null
    },

    notes: {
        processing: false,
        success: false,
        error: false,
    },

    // Toggle ICO hide/show
    togglingIcoError: false,
    togglingIcoSuccess: false,
};

export default function ads(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
