import { parse } from "./parse.ts";
import { assertEquals } from "@std/assert";

// more test cases
const testCases = [
  ["public, max-age=600", { public: true, maxAge: 600 }],
  ["public, max-age=600, s-maxage=6000", {
    public: true,
    maxAge: 600,
    sMaxage: 6000,
  }],
  ["max -age   = 600", {}],
  ["max-age= 60 0 ", { maxAge: 60 }],
  ["no-store", { noStore: true }],
  ["public, no-cache, proxy-revalidate", {
    public: true,
    noCache: true,
    proxyRevalidate: true,
  }],
];

for (const [header, obj] of testCases) {
  Deno.test(`parse "${header}"`, () => {
    assertEquals(parse(header as string), obj as object);
  });
}
