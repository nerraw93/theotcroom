import { routerReducer as router } from "react-router-redux";
import app from "./app";
import auth from "./auth";
import users from "./users";
import ads from "./ads";
import reservations from "./reservations";
import requests from "./requests";
import bankAccount from "./bankAccount";
import notification from "./notification";

const reducers = {
  router,
  app,
  auth,
  users,
  ads,
  reservations,
  requests,
  bankAccount,
  notification
};

export default reducers;
