#!/bin/env node

const cleaner = "HOM2761";
const coffee = "DLI8820";
const sesameBagel = "BKY1573";
const carawayBagel = "BKY5717";

async function readLines(f) {
  const fs = require("node:fs");
  const lines = await fs.readFileSync(f, "utf-8");
  return lines
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
}

async function main() {
  const orders = await readLines("5784/noahs-orders.jsonl");
  const customers = await readLines("5784/noahs-customers.jsonl");

  const o = orders
    .filter((o) => o.ordered.startsWith("2017"))
    .filter((o) => {
      const items = o.items.map((i) => i.sku);
      return (
        items.includes(cleaner) &&
        items.includes(coffee) &&
        (items.includes(sesameBagel) || items.includes(carawayBagel))
      );
    })
    .map((o) => o.customerid);

  const c = customers
    .filter((c) => o.includes(c.customerid))
    .map((c) => c.phone);

  console.log(c);
}

main();
