import type { SearchWord } from "./types.ts";

/** 合并两次关键词并根据 real_query 去重 */
export function mergeWords(
  words: SearchWord[],
  another: SearchWord[],
): SearchWord[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.real_query] = w.query_display;
  }
  return Object.entries(obj).map(([real_query, query_display]) => ({
    query_display,
    real_query,
  }));
}

export async function createReadme(words: SearchWord[]): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(/<!-- BEGIN -->[\W\w]*<!-- END -->/, createList(words));
}

export function createList(words: SearchWord[]): string {
  return `<!-- BEGIN -->
<!-- 最后更新时间 ${Date()} -->
${
    words.map((x) => `1. [${x.query_display}](https://www.zhihu.com/search?q=${encodeURIComponent(x.real_query)})`)
      .join("\n")
  }
<!-- END -->`;
}

export function createArchive(words: SearchWord[], date: string): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createList(words)}
`;
}
