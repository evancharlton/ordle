const fs = require("fs");
const readline = require("readline");
const path = require("path");

const filename =
  process.argv[2] ||
  path.resolve(
    path.join(
      __dirname,
      "20191010_norsk_ordbank_nob_2005",
      "fullformsliste.txt"
    )
  );
if (!filename) {
  console.error(`Usage: ${process.argv.slice(0, 2).join(" ")} <filename>`);
  process.exit(1);
}

const readInterface = readline.createInterface({
  input: fs.createReadStream(filename, { encoding: "latin1" }),
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
  // if (letters.length > 7) {
  //   return;
  // }

  if (letters.find(invalidLetter)) {
    return;
  }

  words.add(word);
};

const onClose = () => {
  console.log("lines:", lines);
  console.log("words:", words.size);

  const outdir = path.resolve(path.join(__dirname, "..", "public", "nb-no"));
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  const arr = [...words].sort();
  fs.writeFileSync(
    path.join(outdir, "words.json"),
    JSON.stringify(arr, null, 2)
  );

  process.exit(0);
};

readInterface.on("line", onLine);
readInterface.on("close", onClose);
