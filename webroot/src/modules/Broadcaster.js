import Echo from "laravel-echo";
import { merge } from 'lodash';
// import Pusher from 'pusher-js';
import StoreAccessor from "./StoreAccessor";
import { getNotifications } from "../actions/notification";

export default class Broadcaster {

    /**
     * Constructor
     *
     * @param {Object} options custom options
     * @author {goper}
     */
    constructor(options = {})
    {
        this.store = new StoreAccessor();

        this.driver = new Echo(merge({
            broadcaster: 'pusher',
            encrypted: true,
            key: options.key,
            cluster: options.cluster,
        }, options));
    }

    subscribeToUserNotifcation(userId)
    {
        this.driver.channel(`user.notify.${userId}`)
            .listen(`.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated`, (e) => {
                getNotifications();
            });
    }
}
