import React from "react";
import { getNextTime } from "../utils/getNextTime";
import { getEmojiGrid } from "../utils/getEmojoGrid";

import Modal, { IModal } from "./Modal";
import { WEBSITE } from "../constants";
import { getNow } from "../utils/getNow";
import { log } from "../firebase";

const EndModal = ({ isOpen }:Pick<IModal, "isOpen">) => {
  const [isClosed, setIsClosed] = React.useState(false);
  const [nextTime, setNextTime] = React.useState(getNextTime());
  const [copied, setCopied] = React.useState(false);
  const handleClick = () => {
    const emojiGrid = getEmojiGrid();
    console.log(emojiGrid);
    if (emojiGrid) {
      navigator.clipboard
        .writeText(
          `
Flordle ${getNow()}

${emojiGrid}

Make your flowerbed at: ${WEBSITE}
`
        )
        .then(() => {
          setCopied(true)
          log("share-clicked",{emojiGrid})
        });
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNextTime(getNextTime());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Modal isOpen={isOpen && !isClosed} onClose={() => setIsClosed(true)}>
      <div>
        <div>Next flowerbed in {nextTime}</div>

        <button onClick={() => handleClick()}>
          {copied ? "Copied!" : "Share"}
        </button>
      </div>
    </Modal>
  );
};

export default EndModal;
