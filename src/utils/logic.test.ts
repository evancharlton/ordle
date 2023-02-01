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

    test("hente(hente)", () => {
      const t = getLegality("hente", "hente");
      expect(t("hente")).toBe("yes");
      expect(t("henta")).toBe("missing-known-yes");
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
        yes: { a: 1 },
        no: { f: true, g: true, h: true, i: true },
      });
      expect(getScores("abcde", "abcde")).toMatchObject({
        yes: { a: 1, b: 1, c: 1, d: 1, e: 1 },
      });
    });

    test("maybe", () => {
      expect(getScores("abcde", "edbac")).toMatchObject({
        maybe: { a: 1, b: 1, c: 1, d: 1, e: 1 },
      });

      expect(getScores("abcde", "bcdaa")).toMatchObject({
        maybe: { a: 1, b: 1, c: 1, d: 1 },
        no: { a: true },
      });

      expect(getScores("abcde", "abcda")).toMatchObject({
        yes: { a: 1, b: 1, c: 1, d: 1 },
        no: { a: true },
      });
    });

    test("multiple", () => {
      expect(getScores("abcde", "abfed")).toMatchObject({
        yes: { a: 1, b: 1 },
        maybe: { d: 1, e: 1 },
        illegal: { 4: "d", 3: "e" },
        no: { f: true },
      });
    });

    test("eksil + issen", () => {
      expect(getScores("eksil", "issen")).toMatchObject({
        yes: { s: 1 },
        maybe: { e: 1, i: 1 },
        no: { s: true, n: true },
        illegal: ["i", undefined, undefined, "e", undefined],
      });
    });

    test("hente + hente", () => {
      expect(getScores("hente", "hente")).toEqual({
        yes: { h: 1, e: 2, n: 1, t: 1 },
        maybe: {},
        no: {},
        illegal: [undefined, undefined, undefined, undefined, undefined],
      });
    });
  });
});
