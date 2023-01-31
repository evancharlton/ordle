import { getScores, getLegality } from "./logic";

describe("logic", () => {
  describe("getLegality", () => {
    test("eksil(riste)", () => {
      const t = getLegality("eksil", "riste");
      // expect(t("hygge")).toBe(false);
      // expect(t("aksla")).toBe(false);
      expect(t("desim")).toBe("yes");
      expect(t("bisle")).toBe("includes-same-maybe");
      expect(t("issen")).toBe("yes");
    });

    test("eksil(issen)", () => {
      const t = getLegality("eksil", "issen");
      expect(t("eksil")).toBe("yes");
    });
  });

  describe("getScores", () => {
    test("No matches", () => {
      expect(getScores("abcde", "fghij")).toMatchObject({
        no: { f: true, g: true, h: true, i: true, j: true },
      });
    });

    test("green", () => {
      expect(getScores("abcde", "afghi")).toMatchObject({
        yes: { a: true },
        no: { f: true, g: true, h: true, i: true },
      });
      expect(getScores("abcde", "abcde")).toMatchObject({
        yes: { a: true, b: true, c: true, d: true, e: true },
      });
    });

    test("maybe", () => {
      expect(getScores("abcde", "edbac")).toMatchObject({
        maybe: { a: true, b: true, c: true, d: true, e: true },
      });

      expect(getScores("abcde", "bcdaa")).toMatchObject({
        maybe: { a: true, b: true, c: true, d: true },
        no: { a: true },
      });

      expect(getScores("abcde", "abcda")).toMatchObject({
        yes: { a: true, b: true, c: true, d: true },
        no: { a: true },
      });
    });

    test("multiple", () => {
      expect(getScores("abcde", "abfed")).toMatchObject({
        yes: { a: true, b: true },
        maybe: { d: true, e: true },
        illegal: { 4: "d", 3: "e" },
        no: { f: true },
      });
    });

    test("eksil + issen", () => {
      expect(getScores("eksil", "issen")).toMatchObject({
        yes: { s: true },
        maybe: { e: true, i: true },
        no: { s: true, n: true },
        illegal: ["i", undefined, undefined, "e", undefined],
      });
    });
  });
});
