const fs = require("fs");
const readline = require("readline");
const path = require("path");

const removedWords = (() => {
  if (process.env.REMOVED_WORDS) {
    const wordsArray = require(process.env.REMOVED_WORDS);
    return wordsArray.reduce((acc, word) => ({ ...acc, [word]: true }), {});
  }
  return {};
})();

const languages = [
  {
    file: path.join("20191010_norsk_ordbank_nno_2012", "fullformer_2012.txt"),
    lang: "nn-no",
    length: 5,
  },
  {
    file: path.join("20191010_norsk_ordbank_nob_2005", "fullformsliste.txt"),
    lang: "nb-no",
    length: 5,
  },
];

[3, 4, 6, 7, 8].forEach((length) => {
  const [nn, nb] = languages;
  languages.push(
    { ...nn, lang: `${nn.lang}-${length}`, length },
    { ...nb, lang: `${nb.lang}-${length}`, length }
  );
});

const hashCode = (str) => {
  return str
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((acc, c, i) => acc + c * Math.pow(31, Math.abs(2 - i)), 0);
};

const scatterSort = (a, b) => {
  return hashCode(a) - hashCode(b);
};

const alphabet = new Set("abcdefghijklmnopqrstuvwxyzæøå".split(""));

const promises = languages.map(
  async ({ file: input, lang: output, length }) => {
    const promise = new Promise((resolve) => {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, input), {
          encoding: "latin1",
        }),
        console: false,
      });

      let lines = 0;
      const words = new Set();
      const onLine = (line) => {
        if (lines++ === 0) {
          return;
        }

        const word = line.split("\t")[2];
        if (word.length !== length) {
          return;
        }

        const letters = [...new Set(word.split(""))];

        if (!letters.every((letter) => alphabet.has(letter))) {
          return;
        }

        words.add(word);
      };

      const onClose = () => {
        console.log(
          `${output}:\n${[`  lines: ${lines}`, `  words: ${words.size}`].join(
            "\n"
          )}`
        );

        const outdir = path.resolve(
          path.join(__dirname, "..", "public", output)
        );
        if (!fs.existsSync(outdir)) {
          fs.mkdirSync(outdir, { recursive: true });
        }

        const arr = [...words].sort(scatterSort).map((word) => {
          if (removedWords[word]) {
            return "";
          }
          return word;
        });
        fs.writeFileSync(
          path.join(outdir, `words.json`),
          JSON.stringify(arr, null, 2)
        );

        resolve();
      };

      readInterface.on("line", onLine);
      readInterface.on("close", onClose);
    });
    await promise;
  }
);

Promise.all(promises)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
