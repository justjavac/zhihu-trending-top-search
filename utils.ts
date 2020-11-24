import { SearchWord } from "./types.ts";

/** 合并两次关键词并根据 display_query 去重 */
export function mergeWords(
  words: SearchWord[],
  another: SearchWord[],
): SearchWord[] {
  const obj: Record<string, string> = {};
  for (const w of words.concat(another)) {
    obj[w.display_query] = w.query;
  }
  return Object.entries(obj).map(([display_query, query]) => ({
    query,
    display_query,
  }));
}

export async function createReadme(words: SearchWord[]): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(/<!-- BEGIN -->[\W\w]*<!-- END -->/, createList(words));
}

export function createList(words: SearchWord[]): string {
  return `<!-- BEGIN -->
${
    words.map((x) =>
      `1. [${x.display_query}](https://www.zhihu.com/search?q=${x.query})`
    ).join("\n")
  }
<!-- END -->`;
}

export function createArchive(words: SearchWord[], date: string): string {
  return `# ${date}\n
共 ${words.length} 条\n
${createList(words)}
`;
}
