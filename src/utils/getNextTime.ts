import { TIME } from "../constants";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const getNextTime = () => {
  const now = new Date().getTime();
  const nextHour = Math.ceil(now / TIME) * TIME;

  let diffMillis = nextHour - now;

  const rtf = new Intl.RelativeTimeFormat("en", {numeric:"auto"})

  if (diffMillis > HOUR) {
    return rtf.format(Math.floor(diffMillis/HOUR), "hour")
  }
  if (diffMillis > MINUTE) {
    return rtf.format(Math.floor(diffMillis/MINUTE), "minute")
  }
  if (diffMillis > SECOND) {
    return rtf.format(Math.floor(diffMillis/SECOND), "second")
  }
};
