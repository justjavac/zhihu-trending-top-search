#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
import { assertEquals, assertStringIncludes } from "@std/assert";
import { SearchWord } from "./types.ts";
import { createArchive, createList, createReadme, mergeWords } from "./utils.ts";

Deno.test("mergeWords", function (): void {
  const words1: SearchWord[] = [];
  const words2: SearchWord[] = [{ real_query: "foo", query_display: "bar" }];
  const words3: SearchWord[] = [{ real_query: "foo", query_display: "hello" }];
  const words4: SearchWord[] = [{ real_query: "hello", query_display: "world" }];
  const words5: SearchWord[] = [
    { real_query: "foo", query_display: "bar" },
    { real_query: "hello", query_display: "world" },
  ];

  assertEquals(mergeWords(words1, words2), words2);
  assertEquals(mergeWords(words1, words5), words5);
  assertEquals(mergeWords(words2, words2), words2);
  assertEquals(
    mergeWords(words2, words3),
    [
      { real_query: "foo", query_display: "hello" },
    ],
  );
  assertEquals(mergeWords(words4, words5), [
    { real_query: "hello", query_display: "world" },
    { real_query: "foo", query_display: "bar" },
  ]);
  assertEquals(
    mergeWords(words3, words5),
    [
      { real_query: "foo", query_display: "bar" },
      { real_query: "hello", query_display: "world" },
    ],
  );
});

Deno.test("createList", function (): void {
  const words: SearchWord[] = [
    { real_query: "foo", query_display: "bar" },
    { real_query: "hello", query_display: "world" },
  ];

  assertStringIncludes(createList(words), "<!-- BEGIN -->");
  assertStringIncludes(createList(words), "<!-- END -->");
  assertStringIncludes(createList(words), "foo");
  assertStringIncludes(createList(words), "world");
  assertStringIncludes(createList(words), "https://www.zhihu.com/search");
});

Deno.test("createArchive", function (): void {
  const words: SearchWord[] = [
    { real_query: "foo", query_display: "bar" },
    { real_query: "hello", query_display: "world" },
  ];

  assertStringIncludes(createArchive(words, "2020-02-02"), "# 2020-02-02");
  assertStringIncludes(createArchive(words, "2020-02-02"), "共 2 条");
});

Deno.test("createReadme", async function (): Promise<void> {
  const words: SearchWord[] = [
    { real_query: "foo", query_display: "bar" },
    { real_query: "hello", query_display: "world" },
  ];

  assertStringIncludes(await createReadme(words), "知乎");
  assertStringIncludes(await createReadme(words), "zhihu-trending-top-search");
});
