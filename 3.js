#!/bin/env node

async function readLines(f) {
  const fs = require("node:fs");
  const lines = await fs.readFileSync(f, "utf-8");
  return lines
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
}

const years = [1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011];
const city = "Jamaica";

async function main() {
  const customers = await readLines("5784/noahs-customers.jsonl");
  const c = customers
    .map((c) => ({ ...c, birthdate: new Date(c.birthdate) }))
    .filter((c) => c.citystatezip.includes(city))
    .filter((c) => years.includes(c.birthdate.getFullYear()))
    .filter((c) => c.birthdate.getMonth() == 5 || c.birthdate.getMonth() == 6)
    .filter(
      (c) =>
        (c.birthdate.getMonth() == 5 && c.birthdate.getDate() >= 21) ||
        (c.birthdate.getMonth() == 6 && c.birthdate.getDate() <= 22)
    );
  console.log(c[0].phone);
}

main();
