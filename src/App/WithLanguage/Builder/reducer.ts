type State = {
  mode: "solution" | "guess";
  solution: string;
  guess: string;
  guesses: string[];
  valid: boolean;
  words: Record<string, true>;
  error: string;
};

type Action =
  | { mode: "reset" }
  | { mode: "add-letter"; letter: string }
  | { mode: "commit" }
  | { mode: "remove-letter" }
  | { mode: "remove-guess"; guess: string }
  | { mode: "reset-guess" };

const never = (v: never) => {
  throw new Error(`Impossible situation: ${v}`);
};

export const reducer = (state: State, action: Action): State => {
  const { mode } = action;
  switch (mode) {
    case "reset": {
      return {
        ...state,
        mode: "solution",
        solution: "",
        guess: "",
        guesses: [],
        valid: false,
        error: "",
      };
    }

    case "add-letter": {
      if (state.mode === "solution") {
        const solution = (state.solution + action.letter).substring(0, 5);
        return {
          ...state,
          solution,
          valid: solution.length === 5,
          error: "",
        };
      } else if (state.mode === "guess") {
        const guess = (state.guess + action.letter).substring(0, 5);
        return {
          ...state,
          guess,
          valid: guess.length === 5,
          error: "",
        };
      }
      return state;
    }

    case "commit": {
      if (!state.valid) {
        return {
          ...state,
          error: "Ikke nok bokstaver",
        };
      }

      if (state.mode === "solution") {
        if (!state.words[state.solution]) {
          return {
            ...state,
            error: `Ukjent ord: ${state.solution}`,
          };
        }

        return {
          ...state,
          mode: "guess",
        };
      } else if (state.mode === "guess") {
        if (!state.words[state.guess]) {
          return {
            ...state,
            error: `Ukjent ord: ${state.guess}`,
          };
        }

        return {
          ...state,
          guesses: [...state.guesses, state.guess],
          guess: "",
          valid: false,
        };
      }
      return state;
    }

    case "remove-letter": {
      if (state.mode === "solution") {
        const solution = state.solution.substring(
          0,
          Math.max(0, state.solution.length - 1)
        );
        return {
          ...state,
          solution,
          valid: solution.length === 5,
          error: "",
        };
      } else if (state.mode === "guess") {
        const guess = state.guess.substring(
          0,
          Math.max(0, state.guess.length - 1)
        );
        return {
          ...state,
          guess,
          valid: guess.length === 5,
          error: "",
        };
      }
      return state;
    }

    case "remove-guess": {
      return {
        ...state,
        guesses: state.guesses.filter((guess) => guess !== action.guess),
      };
    }

    case "reset-guess": {
      return {
        ...state,
        guess: "",
      };
    }

    default: {
      never(mode);
      throw new Error("Impossible situation");
    }
  }
};
