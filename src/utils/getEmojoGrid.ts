import { getNow } from "./getNow";
import emoji from "emoji-dictionary";
import { IState } from "../game";

export const getEmojiGrid = () => {
  const key = `${getNow()}`;
  const stateString = localStorage.getItem(key);
  if (stateString) {
    const state:IState = JSON.parse(stateString);
    console.log(state);
    let emojis = "";
    state.guesses.forEach((guess, idx) => {
      if (idx < state.guessNumber) {
        emojis +=
          guess.map((letter) => emoji.getUnicode(letter.letter)).join("") +
          "\n";
      }
    });
    return emojis;
  }
  return null;
};
