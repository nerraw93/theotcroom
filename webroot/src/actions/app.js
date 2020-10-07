import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from "./auth";
import { CREATE_ICO, CREATE_ICO_FAILURE, CREATE_ICO_SUCCESS } from "./ads";
import { RESERVE, RESERVE_FAILURE, RESERVE_SUCCESS } from "./reservations";
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_FAILURE,
  UPLOAD_PHOTO_SUCCESS
} from "./users"
import { CREATE_BANK_ACCOUNT, CREATE_BANK_ACCOUNT_FAILURE, CREATE_BANK_ACCOUNT_SUCCESS } from "./bankAccount";

export const DELETE_FLASH_MESSAGE = "app:delete_flash_message";
export const SHOW_FLASH_MESSAGE = "app:show_flash_message";

const TYPE_PROCESSING = "processing";
const TYPE_SUCCESS = "success";
const TYPE_ERROR = "error";

const failureMessage = () => {
  return (state, action) => ({
    ...state,
    flashMessage: {
      message: action.payload.response.error,
      type: TYPE_ERROR
    }
  })
};

export function deleteFlashMessage() {
  return {
    type: DELETE_FLASH_MESSAGE
  }
}

export function showFlashMessage(message, status = 'success') {
    return {
      type: SHOW_FLASH_MESSAGE,
      message,
      status
    }
}

const showMessage = () => {
    return (state, action) => ({
        ...state,
        flashMessage: {
            message: action.message,
            type: action.status
        }
    })
};

const ACTION_HANDLERS = {
  [LOGIN]: state => ({ ...state, flashMessage: { "message": "Logging in...", "type": TYPE_PROCESSING } }),
  [LOGIN_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Welcome", "type": TYPE_SUCCESS } }),
  [LOGIN_FAILURE]: failureMessage(),

  [REGISTER]: state => ({ ...state, flashMessage: { "message": "Registering...", "type": TYPE_PROCESSING } }),
  [REGISTER_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Welcome", "type": TYPE_SUCCESS } }),
  [REGISTER_FAILURE]: failureMessage(),

  [UPDATE_PROFILE]: state => ({ ...state, flashMessage: { "message": "Updating...", "type": TYPE_PROCESSING } }),
  [UPDATE_PROFILE_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Your profile has been updated", "type": TYPE_SUCCESS } }),
  [UPDATE_PROFILE_FAILURE]: failureMessage(),

  [UPLOAD_PHOTO]: state => ({ ...state, flashMessage: { "message": "Uploading...", "type": TYPE_PROCESSING } }),
  [UPLOAD_PHOTO_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Your photo has been uploaded", "type": TYPE_SUCCESS } }),
  [UPLOAD_PHOTO_FAILURE]: failureMessage(),

  [CREATE_ICO]: state => ({ ...state, flashMessage: { "message": "Creating ICO...", "type": TYPE_PROCESSING } }),
  [CREATE_ICO_SUCCESS]: state => ({ ...state, flashMessage: { "message": "ICO successfully posted", "type": TYPE_SUCCESS } }),
  [CREATE_ICO_FAILURE]: failureMessage(),

  [RESERVE]: state => ({ ...state, flashMessage: { "message": "Submitting reservation...", "type": TYPE_PROCESSING } }),
  [RESERVE_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Your reservation has been placed.", "type": TYPE_SUCCESS } }),
  [RESERVE_FAILURE]: failureMessage(),

  [CREATE_BANK_ACCOUNT]: state => ({ ...state, flashMessage: { "message": "Creating account...", "type": TYPE_PROCESSING } }),
  [CREATE_BANK_ACCOUNT_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Your bank account was created.", "type": TYPE_SUCCESS } }),
  [CREATE_BANK_ACCOUNT_FAILURE]: failureMessage(),

  [CHANGE_PASSWORD]: state => ({ ...state, flashMessage: { "message": "Updating password...", "type": TYPE_PROCESSING } }),
  [CHANGE_PASSWORD_SUCCESS]: state => ({ ...state, flashMessage: { "message": "Your password was updated.", "type": TYPE_SUCCESS } }),
  [CHANGE_PASSWORD_FAILURE]: failureMessage(),

  [SHOW_FLASH_MESSAGE]: showMessage(),
};

const initialState = {
  flashMessage: {}
};

export default function app(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
