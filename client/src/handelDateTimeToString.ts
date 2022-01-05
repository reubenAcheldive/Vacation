import moment from "moment";

export function convertWithMoment(localTime: any) {
    return moment(localTime).format("YYYY-MM-DD");
  }
  