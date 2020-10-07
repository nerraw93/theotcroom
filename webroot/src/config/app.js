import { createWhitelistFilter } from "redux-persist-transform-filter";
import storage from "redux-persist/es/storage";

export const persistConfig = {
    storage,
    key: "root",
    transforms: [
        createWhitelistFilter("auth", [
            "token",
            "myself.first_name",
            "myself.last_name",
            "myself.profile_picture",
            "myself.is_admin",
        ]),
    ],
    blacklist: [
        "ads",
        "app",
        "bankAccount",
        "comments",
        "requests",
        "reservations",
        "users",
        "recipients",
        "router",
        "_persist"
    ]
};
