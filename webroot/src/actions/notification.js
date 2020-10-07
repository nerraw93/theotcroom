import { RSAA } from "redux-api-middleware";

export const NOTIFICATION = "app:notification";
export const NOTIFICATION_SUCCESS = "app:notification_success";
export const NOTIFICATION_FAILURE = "app:notification_failure";

export function getNotifications() {
    return (dispatch, getState) => {
        const { auth: { token } } = getState();
        return dispatch({
            [RSAA]: {
                endpoint: `${process.env.REACT_APP_API_HOST}/me/notification`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json; charset=UTF-8",
                },
                types: [NOTIFICATION, NOTIFICATION_SUCCESS, NOTIFICATION_FAILURE]
            }
        })
    }
}

const ping = () => {
    return (state, action) => ({
        ...state,
        all: action.payload.notifications,
        unread: action.payload.unreadNotifications,
    })
};

const ACTION_HANDLERS = {
    [NOTIFICATION]: state => ({...state}),
    [NOTIFICATION_SUCCESS]: ping(),
    [NOTIFICATION_FAILURE]: state => ({...state})
};

const initialState = {
    all: [],
    unread: [],
};

export default function notification(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
