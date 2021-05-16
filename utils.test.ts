#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
import { assertEquals, assertStringIncludes } from "std/testing/asserts.ts";
import { SearchWord } from "./types.ts";

import {
  createArchive,
  createList,
  createReadme,
  mergeWords,
} from "./utils.ts";

Deno.test("mergeWords", function (): void {
  const words1: SearchWord[] = [];
  const words2: SearchWord[] = [{ query: "foo", displayQuery: "bar" }];
  const words3: SearchWord[] = [{ query: "foo", displayQuery: "hello" }];
  const words4: SearchWord[] = [{ query: "hello", displayQuery: "world" }];
  const words5: SearchWord[] = [
    { query: "foo", displayQuery: "bar" },
    { query: "hello", displayQuery: "world" },
  ];

  assertEquals(mergeWords(words1, words2), words2);
  assertEquals(mergeWords(words1, words5), words5);
  assertEquals(mergeWords(words2, words2), words2);
  assertEquals(
    mergeWords(words2, words3),
    [
      { query: "foo", displayQuery: "bar" },
      { query: "foo", displayQuery: "hello" },
    ],
  );
  assertEquals(mergeWords(words4, words5), [
    { query: "hello", displayQuery: "world" },
    { query: "foo", displayQuery: "bar" },
  ]);
  assertEquals(
    mergeWords(words3, words5),
    [
      { query: "foo", displayQuery: "hello" },
      { query: "foo", displayQuery: "bar" },
      { query: "hello", displayQuery: "world" },
    ],
  );
});

Deno.test("createList", function (): void {
  const words: SearchWord[] = [
    { query: "foo", displayQuery: "bar" },
    { query: "hello", displayQuery: "world" },
  ];

  assertStringIncludes(createList(words), "<!-- BEGIN -->");
  assertStringIncludes(createList(words), "<!-- END -->");
  assertStringIncludes(createList(words), "foo");
  assertStringIncludes(createList(words), "world");
  assertStringIncludes(createList(words), "https://www.zhihu.com/search");
});

Deno.test("createArchive", function (): void {
  const words: SearchWord[] = [
    { query: "foo", displayQuery: "bar" },
    { query: "hello", displayQuery: "world" },
  ];

  assertStringIncludes(createArchive(words, "2020-02-02"), "# 2020-02-02");
  assertStringIncludes(createArchive(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme", async function (): Promise<void> {
  const words: SearchWord[] = [
    { query: "foo", displayQuery: "bar" },
    { query: "hello", displayQuery: "world" },
  ];

  assertStringIncludes(await createReadme(words), "知乎");
  assertStringIncludes(await createReadme(words), "zhihu-trending-top-search");
});
