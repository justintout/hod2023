#!/bin/env node

const telalpha = {
  A: 2,
  B: 2,
  C: 2,
  D: 3,
  E: 3,
  F: 3,
  G: 4,
  H: 4,
  I: 4,
  J: 5,
  K: 5,
  L: 5,
  M: 6,
  N: 6,
  O: 6,
  P: 7,
  Q: 7,
  R: 7,
  S: 8,
  T: 8,
  U: 8,
  V: 9,
  W: 9,
  X: 9,
  Y: 9,
  Z: 9,
};

async function readLines(f) {
  const fs = require("node:fs");
  const lines = await fs.readFileSync(f, "utf-8");
  return lines
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
}

async function main() {
  const customers = await readLines("5784/noahs-customers.jsonl");
  const c = customers.filter(
    (c) =>
      c.name
        .split(" ")[1]
        .toUpperCase()
        .split("")
        .map((l) => telalpha[l])
        .join("") === c.phone.replace(/-/g, "")
  );
  console.log(c[0].phone);
}

main();
