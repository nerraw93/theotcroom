import moment from "moment-timezone";

export function timeFromNow(date) {
    return moment.utc(date).tz(moment.tz.guess()).fromNow()
}
