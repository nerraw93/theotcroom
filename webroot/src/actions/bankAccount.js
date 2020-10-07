import { RSAA } from "redux-api-middleware";

export const CREATE_BANK_ACCOUNT = "auth:create_bank_account";
export const CREATE_BANK_ACCOUNT_SUCCESS = "auth:create_bank_account_success";
export const CREATE_BANK_ACCOUNT_FAILURE = "auth:create_bank_account_failure";

export function createBankAccount(data) {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();

    return dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_HOST}/bank-accounts`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
        types: [CREATE_BANK_ACCOUNT, CREATE_BANK_ACCOUNT_SUCCESS, CREATE_BANK_ACCOUNT_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [CREATE_BANK_ACCOUNT]: state => ({ ...state, bank: { processing: true, success: false, error: false } }),
  [CREATE_BANK_ACCOUNT_SUCCESS]: state => ({ ...state, bank: { processing: false, success: true, error: false } }),
  [CREATE_BANK_ACCOUNT_FAILURE]: state => ({ ...state, bank: { processing: false, success: false, error: true } }),
};

const initialState = {
  bank: {
    processing: false,
    success: false,
    error: false
  }
};

export default function settings(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}