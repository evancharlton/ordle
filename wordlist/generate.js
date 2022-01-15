const fs = require("fs");
const readline = require("readline");
const path = require("path");

const languages = [
  [
    path.join("20191010_norsk_ordbank_nno_2012", "fullformer_2012.txt"),
    "nn-no",
  ],
  [path.join("20191010_norsk_ordbank_nob_2005", "fullformsliste.txt"), "nb-no"],
];

const hashCode = (str) => {
  return str
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((acc, c, i) => acc + c * Math.pow(31, Math.abs(2 - i)), 0);
};

const scatterSort = (a, b) => {
  return hashCode(a) - hashCode(b);
};

const promises = languages.map(async ([input, output]) => {
  const promise = new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path.join(__dirname, input), {
        encoding: "latin1",
      }),
      console: false,
    });

    const invalidLetter = (letter) => {
      switch (letter) {
        case "-":
        case ".":
        case " ":
        case "'":
          return true;
        default:
          return letter.toLocaleLowerCase() !== letter;
      }
    };

    let lines = 0;
    const words = new Set();
    const onLine = (line) => {
      if (lines++ === 0) {
        return;
      }

      const word = line.split("\t")[2];
      if (word.length !== 5) {
        return;
      }

      const letters = [...new Set(word.split(""))];

      if (letters.find(invalidLetter)) {
        return;
      }

      words.add(word);
    };

    const onClose = () => {
      console.log("lines:", lines);
      console.log("words:", words.size);

      const outdir = path.resolve(path.join(__dirname, "..", "public", output));
      if (!fs.existsSync(outdir)) {
        fs.mkdirSync(outdir);
      }

      const arr = [...words].sort(scatterSort);
      fs.writeFileSync(
        path.join(outdir, "words.json"),
        JSON.stringify(arr, null, 2)
      );

      resolve();
    };

    readInterface.on("line", onLine);
    readInterface.on("close", onClose);
  });
  await promise;
});

Promise.all(promises)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
