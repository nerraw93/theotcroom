import { RSAA } from "redux-api-middleware";

export const GET_PROFILE = "auth:get_profile";
export const GET_PROFILE_SUCCESS = "auth:get_profile_success";
export const GET_PROFILE_FAILURE = "auth:get_profile_failure";
export const UPDATE_PROFILE = "auth:update_profile";
export const UPDATE_PROFILE_SUCCESS = "auth:update_profile_success";
export const UPDATE_PROFILE_FAILURE = "auth:update_profile_failure";
export const UPLOAD_PHOTO = "auth:upload_photo";
export const UPLOAD_PHOTO_SUCCESS = "auth:upload_photo_success";
export const UPLOAD_PHOTO_FAILURE = "auth:upload_photo_failure";
export const CHANGE_PASSWORD = "auth:change_password";
export const CHANGE_PASSWORD_SUCCESS = "auth:change_password_success";
export const CHANGE_PASSWORD_FAILURE = "auth:change_password_failure";
export const RECENT_USERS = "auth:recent_users";
export const RECENT_USERS_SUCCESS = "auth:recent_users_success";
export const RECENT_USERS_FAILURE = "auth:recent_users_failure";
export const ALL_USERS = "auth:all_users";
export const ALL_USERS_SUCCESS = "auth:all_users_success";
export const ALL_USERS_FAILURE = "auth:all_users_failure";
export const BANNED_DISBANNED_USER = "auth::banned_disbanned_user";
export const BANNED_DISBANNED_USER_SUCCESS = "auth::banned_disbanned_user_success";
export const BANNED_DISBANNED_USER_FAILURE = "auth::banned_disbanned_user_failure";

export function getProfile(username) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/profile/${username}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE]
            }
        })
    }
}

export function update(data) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data),
                types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE]
            }
        })
    }
}

export function uploadPhoto(photo) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/photo`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: photo,
                types: [UPLOAD_PHOTO, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE]
            }
        })
    }
}

export function changePassword(data) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/change-password`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                types: [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE]
            }
        })
    }
}

export function getRecentUsers() {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/recent-users`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [RECENT_USERS, RECENT_USERS_SUCCESS, RECENT_USERS_FAILURE]
            }
        })
    }
}

export function getAllUsers() {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/all-users`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [ALL_USERS, ALL_USERS_SUCCESS, ALL_USERS_FAILURE]
            }
        })
    }
}

export function searchRecentUsers(name) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/recent-users/${name}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [RECENT_USERS, RECENT_USERS_SUCCESS, RECENT_USERS_FAILURE]
            }
        })
    }
}

export function toggleUserBannedOrDisbanned(id) {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();

        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/member/${id}/toggle/banned`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                    "Content-Type": "application/json; charset=UTF-8",
                },
                types: [BANNED_DISBANNED_USER, BANNED_DISBANNED_USER_SUCCESS, BANNED_DISBANNED_USER_FAILURE]
            }
        })
    }
}

const ACTION_HANDLERS = {
    [GET_PROFILE]: state => ({ ...state, gettingProfile: true, gettingProfileSuccess: false }),
    [GET_PROFILE_SUCCESS]: (state, action) => ({ ...state, gettingProfile: false, gettingProfileSuccess: true, user: action.payload.user }),
    [GET_PROFILE_FAILURE]: state => ({ ...state, gettingProfile: false, gettingProfileSuccess: false }),

    [UPDATE_PROFILE]: state => ({ ...state, updatingProfile: true, updatingProfileSuccess: false }),
    [UPDATE_PROFILE_SUCCESS]: state => ({ ...state, updatingProfile: false, updatingProfileSuccess: true, updatingProfileError: false }),
    [UPDATE_PROFILE_FAILURE]: state => ({ ...state, updatingProfile: false, updatingProfileSuccess: false, updatingProfileError: true }),

    [UPLOAD_PHOTO]: state => ({ ...state, photo: { processing: true, success: false, error: false } }),
    [UPLOAD_PHOTO_SUCCESS]: (state, action) => ({ ...state, photo: { processing :false, success: true, error: false, uploadedPhoto: action.payload.photo } }),
    [UPLOAD_PHOTO_FAILURE]: state => ({ ...state, photo: { processing: false, success: false, error: true } }),

    [CHANGE_PASSWORD]: state => ({ ...state, password: { processing: true, success: false, error: false } }),
    [CHANGE_PASSWORD_SUCCESS]: state => ({ ...state, password: { processing: false, success: true, error: false } }),
    [CHANGE_PASSWORD_FAILURE]: state => ({ ...state, password: { processing: false, success: false, error: true } }),

    [RECENT_USERS]: state => ({ ...state, recent_users: { processing: true, success: false, error: false } }),
    [RECENT_USERS_SUCCESS]: (state, action) => ({ ...state, recent_users: { processing: false, success: true, error: false, users: action.payload.recent_users } }),
    [RECENT_USERS_FAILURE]: state => ({ ...state, recent_users: { processing: false, success: false, error: true } }),

    [ALL_USERS]: state => ({ ...state, all_users: { processing: true, success: false, error: false } }),
    [ALL_USERS_SUCCESS]: (state, action) => ({ ...state, all_users: { processing: false, success: true, error: false, users: action.payload.all_users } }),
    [ALL_USERS_FAILURE]: state => ({ ...state, all_users: { processing: false, success: false, error: true } }),

    [BANNED_DISBANNED_USER]: state => ({ ...state, all_users: { processing: true, success: false, error: false } }),
    [BANNED_DISBANNED_USER_SUCCESS]: (state, action) => ({ ...state, all_users: { processing: false, success: true, error: false, users: action.payload.all_users } }),
    [BANNED_DISBANNED_USER_FAILURE]: state => ({ ...state, all_users: { processing: false, success: false, error: true } }),

};

const initialState = {
    gettingProfile: false,
    gettingProfileSuccess: false,
    user: null,

    updatingProfile: false,
    updatingProfileSuccess: false,
    updatingProfileError: false,

    photo: {
        processing: false,
        success: false,
        error: false,
        uploadedPhoto: null,
    },

    password: {
        processing: false,
        success: false,
        error: false,
    },

    recent_users: {
        processing: false,
        success: false,
        error: false,
        users: null
    },

    all_users: {
        processing: false,
        success: false,
        error: false,
        users: null
    }
};

export default function users (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
