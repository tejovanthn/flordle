import { TIME } from "../constants";

export const getNow = () => {
  const now = new Date().getTime();
  return Math.floor(now / TIME);
};
