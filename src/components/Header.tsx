import React from "react";
import { TIME } from "../constants";
import { getNextTime } from "../utils/getNextTime";

const Header = () => {
  const [nextTime, setNextTime] = React.useState(getNextTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNextTime(getNextTime());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header">
      <h1>Flordle</h1>
      <p>New flowerbed every {TIME / (60 * 60 * 1000)} hours </p>
      <small>Next flowerbed {nextTime}. </small>
    </div>
  );
};

export default React.memo(Header);
