type Possibility =
  | "legal"
  | { reason: "includes-known-no"; letter: string }
  | { reason: "missing-known-yes"; letter: string }
  | { reason: "missing-maybe"; letter: string }
  | {
      reason: "includes-same-maybe";
      letter: string;
      column: number;
    };

export const getLegality = (solution: string, guess: string) => {
  const { illegal, ...known } = getScores(solution, guess);
  const knownMaybe = Object.keys(known.maybe);
  const knownNo = Object.keys(known.no);

  return (candidate: string): Possibility => {
    const out = getScores(solution, candidate);
    const { yes, maybe, no } = out;

    // Make sure that every "yes" we knew about is still present.
    for (let i = 0; i < solution.length; i += 1) {
      if (solution[i] === guess[i]) {
        // This was previously discovered; ensure that it's still true.
        if (candidate[i] !== solution[i]) {
          return { reason: "missing-known-yes", letter: solution[i] };
        }
        yes[solution[i]] -= 1;
      }
    }

    // Make sure that every "maybe" we knew about is also still present (or has been promoted).
    for (const letter of knownMaybe) {
      if (yes[letter]) {
        yes[letter] -= 1;
        continue;
      }
      if (maybe[letter]) {
        maybe[letter] -= 1;
        continue;
      }

      return { reason: "missing-maybe", letter };
    }

    // Make sure that none of the illegal (previous maybes) are present.
    for (let i = 0; i < candidate.length; i += 1) {
      if (illegal[i] === candidate[i]) {
        return {
          reason: "includes-same-maybe",
          letter: candidate[i],
          column: i,
        };
      }
    }

    // Make sure that no "no" we knew about is in the candidate.
    for (const letter of knownNo) {
      if (yes[letter] || maybe[letter] || no[letter]) {
        return { reason: "includes-known-no", letter: letter };
      }
    }

    return "legal";
  };
};

type Scores = {
  yes: Record<string, number>;
  maybe: Record<string, number>;
  no: Record<string, boolean>;
  illegal: [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
  ];
};
export const getScores = (word: string, guess: string): Scores => {
  const scores: Scores = {
    yes: {},
    maybe: {},
    no: {},
    illegal: [undefined, undefined, undefined, undefined, undefined],
  };

  const counts = word
    .split("")
    .reduce<Record<string, number>>((acc, letter) => {
      if (acc[letter] === undefined) {
        acc[letter] = 0;
      }
      acc[letter] += 1;
      return acc;
    }, {});

  const skips = new Array(5).fill(false);
  for (let i = 0; i < word.length; i += 1) {
    if (word[i] === guess[i]) {
      scores.yes[word[i]] = (scores.yes[word[i]] ?? 0) + 1;
      counts[guess[i]] -= 1;
      skips[i] = true;
    }
  }

  for (let i = 0; i < word.length; i += 1) {
    if (skips[i]) {
      continue;
    }

    if ((counts[guess[i]] ?? 0) > 0) {
      scores.maybe[guess[i]] = (scores.maybe[guess[i]] ?? 0) + 1;
      scores.illegal[i] = guess[i];
      counts[guess[i]] -= 1;
    } else {
      scores.no[guess[i]] = true;
    }
  }

  return scores;
};

type LetterCounts = Record<string, [number, number]>;
export const getRequiredLetters = (
  solution: string,
  guess: string,
): LetterCounts => {
  const counts: LetterCounts = {};

  for (let i = 0; i < solution.length; i += 1) {
    if (solution[i] === guess[i]) {
      continue;
    }

    if (!solution.includes(guess[i])) {
      // We know that this letter is not in the solution.
      counts[guess[i]] = [0, 0];
    } else {
      if (counts[guess[i]] === undefined) {
        counts[guess[i]] = [0, 0];
      }
      counts[guess[i]][0] += 1;
    }
  }

  return counts;
};
