import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Root, Heading } from "mdast";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function getTableOfContents(content: string): Promise<TocItem[]> {
  const toc: TocItem[] = [];

  const tree = remark().parse(content) as Root;

  visit(tree, "heading", (node: Heading) => {
    if (node.depth >= 2 && node.depth <= 3) {
      const title = toString(node);
      toc.push({
        id: slugify(title),
        title,
        level: node.depth,
      });
    }
  });

  return toc;
}
