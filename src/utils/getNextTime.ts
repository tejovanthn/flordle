import { TIME } from "../constants";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const getNextTime = () => {
  const now = new Date().getTime();
  const nextHour = Math.ceil(now / TIME) * TIME;

  let diffMillis = nextHour - now;

  let timeString = "";
  if (diffMillis > HOUR) {
    const hours = Math.floor(diffMillis / HOUR);
    timeString += `${hours}h`;
    diffMillis = diffMillis - hours * HOUR;
  }
  if (diffMillis > MINUTE) {
    const minutes = Math.floor(diffMillis / MINUTE);
    timeString += ` ${minutes}m`;
    diffMillis = diffMillis - minutes * MINUTE;
  }
  if (diffMillis > SECOND) {
    const seconds = Math.floor(diffMillis / SECOND);
    timeString += ` ${seconds}s`;
    diffMillis = diffMillis - seconds * SECOND;
  }
  return timeString + ".";
};
