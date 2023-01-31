type Possibility =
  | "yes"
  | "includes-known-no"
  | "missing-known-yes"
  | "missing-maybe"
  | "includes-same-maybe";
export const getLegality = (solution: string, guess: string) => {
  const { illegal, ...known } = getScores(solution, guess);
  const knownYes = Object.keys(known.yes);
  const knownMaybe = Object.keys(known.maybe);
  const knownNo = Object.keys(known.no);

  return (candidate: string): Possibility => {
    const out = getScores(solution, candidate);
    const { yes, maybe, no } = out;

    // Make sure that every "yes" we knew about is still present.
    for (const letter of knownYes) {
      if (!yes[letter]) {
        return "missing-known-yes";
      }
      yes[letter] = false;
    }

    // Make sure that every "maybe" we knew about is also still present (or has been promoted).
    for (const letter of knownMaybe) {
      if (yes[letter]) {
        yes[letter] = false;
        continue;
      }
      if (maybe[letter]) {
        maybe[letter] = false;
        continue;
      }

      return "missing-maybe";
    }

    // Make sure that none of the illegal (previous maybes) are present.
    for (let i = 0; i < candidate.length; i += 1) {
      if (illegal[i] === candidate[i]) {
        return "includes-same-maybe";
      }
    }

    // Make sure that no "no" we knew about is in the candidate.
    if (knownNo.some((letter) => yes[letter] || maybe[letter] || no[letter])) {
      return "includes-known-no";
    }

    return "yes";
  };
};

type Scores = {
  yes: Record<string, boolean>;
  maybe: Record<string, boolean>;
  no: Record<string, boolean>;
  illegal: [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined
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
      scores.yes[word[i]] = true;
      counts[guess[i]] -= 1;
      skips[i] = true;
    }
  }

  for (let i = 0; i < word.length; i += 1) {
    if (skips[i]) {
      continue;
    }

    if ((counts[guess[i]] ?? 0) > 0) {
      scores.maybe[guess[i]] = true;
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
  guess: string
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
