import { GUESSES, KEYS, LENGTH } from "./constants";
import alea from "alea";
import { getNow } from "./utils/getNow";
import { log } from "./firebase";


const makeAnswers = () => {
  const flowerdleRNG = alea(getNow());
  return Array.from(
    { length: LENGTH },
    (_) => KEYS[Math.floor(flowerdleRNG() * KEYS.length)]
  );
};

export enum GameState {
  INIT,
  RUNNING,
  END
}

const defaultLetter = {
  letter: "desert",
  background: "empty"
};

export type Letter = typeof defaultLetter
export type Guess = Letter[];

export interface IState {
  answer: string[];
  guessNumber: number;
  game: GameState;
  guesses: Guess[];
  keys: Guess;
}

export enum Actions {
  INIT,
  ADD_LETTER,
  CLEAR,
  CHECK
}

type Action_init = {
  type: Actions.INIT;
};

type Action_add_letter = {
  type: Actions.ADD_LETTER;
  letter: string;
};

type Action_clear = {
  type: Actions.CLEAR;
};

type Action_check = {
  type: Actions.CHECK;
};

export type IAction =
  | Action_init
  | Action_add_letter
  | Action_clear
  | Action_check;

export const initialState: IState = {
  answer: [],
  guessNumber: 0,
  game: GameState.INIT,
  guesses: Array.from({ length: GUESSES }, (_) =>
    Array.from({ length: LENGTH }, (_) => ({ ...defaultLetter }))
  ),
  keys: KEYS.map((letter) => ({ ...defaultLetter, letter }))
};

const gameReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case Actions.INIT: {
      const key = `${getNow()}`;
      const oldState = localStorage.getItem(key);
      if (oldState) {
        log("re-init", {key})
        return JSON.parse(oldState);
      }
      console.log(makeAnswers());
      log("game-start", {key})
      return {
        ...state,
        game: GameState.RUNNING,
        answer: makeAnswers()
      };
    }
    case Actions.ADD_LETTER: {
      if (state.game === GameState.END) {
        return state;
      }
      if (
        state.guesses[state.guessNumber].every(
          (guess) => guess.letter !== "desert"
        )
      ) {
        return state;
      }
      const currentGuess = state.guesses[state.guessNumber]
        .map((guess) => guess.letter)
        .join("|")
        .replace("desert", action.letter)
        .split("|")
        .map((letter) => ({ ...defaultLetter, letter }));
      return {
        ...state,
        guesses: [
          ...state.guesses.slice(0, state.guessNumber),
          currentGuess,
          ...state.guesses.slice(state.guessNumber + 1)
        ]
      };
    }
    case Actions.CLEAR: {
      if (state.game === GameState.END) {
        return state;
      }
      log("clear",{})

      return {
        ...state,
        guesses: [
          ...state.guesses.slice(0, state.guessNumber),
          Array.from({ length: LENGTH }, (_) => ({ ...defaultLetter })),
          ...state.guesses.slice(state.guessNumber + 1)
        ]
      };
    }
    case Actions.CHECK: {
      if (state.game === GameState.END) {
        return state;
      }
      if (
        state.guesses[state.guessNumber].some(
          (guess) => guess.letter === "desert"
        )
      ) {
        return state;
      }
      const currentGuess: Guess = [];
      const keys = [...state.keys];
      state.guesses[state.guessNumber].forEach((guess, idx) => {
        if (state.answer[idx] === guess.letter) {
          currentGuess.push({ ...guess, background: "bull" });
          const keyIdx = keys.findIndex((k) => k.letter === guess.letter);
          keys[keyIdx] = { ...keys[keyIdx], background: "bull" };
        }
        if (
          state.answer.some((ans) => ans === guess.letter) &&
          state.answer[idx] !== guess.letter
        ) {
          currentGuess.push({ ...guess, background: "cow" });
          const keyIdx = keys.findIndex((k) => k.letter === guess.letter);
          keys[keyIdx] = { ...keys[keyIdx], background: "cow" };
        }
        if (state.answer.every((ans) => ans !== guess.letter)) {
          currentGuess.push({ ...guess, background: "none" });
          const keyIdx = keys.findIndex((k) => k.letter === guess.letter);
          keys[keyIdx] = { ...keys[keyIdx], background: "none" };
        }
        return guess;
      });
      log("check", {guess:currentGuess.map(g => g.letter).join('')})

      const guessNumber = state.guessNumber + 1;

      const gameStopped =
        currentGuess.every((guess) => guess.background === "bull") ||
        guessNumber >= GUESSES;
      if(gameStopped) {
        log("game-end", {})
      }

      return {
        ...state,
        guessNumber,
        guesses: [
          ...state.guesses.slice(0, state.guessNumber),
          currentGuess,
          ...state.guesses.slice(state.guessNumber + 1)
        ],
        game: gameStopped ? GameState.END : GameState.RUNNING,
        keys
      };
    }
    default:
      throw new Error();
  }
};

export function reducer(state: IState, action: IAction) {
  const nextState = gameReducer(state, action);
  const key = `${getNow()}`;
  localStorage.setItem(key, JSON.stringify(nextState));
  return nextState;
}
