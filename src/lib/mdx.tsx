import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { ComponentProps } from "react";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const components = {
  h2: ({ children, ...props }: ComponentProps<"h2">) => {
    const id = slugify(String(children));
    return (
      <h2 id={id} className="scroll-mt-24 group" {...props}>
        {children}
        <a
          href={`#${id}`}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary"
          aria-hidden="true"
        >
          #
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentProps<"h3">) => {
    const id = slugify(String(children));
    return (
      <h3 id={id} className="scroll-mt-24 group" {...props}>
        {children}
        <a
          href={`#${id}`}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary"
          aria-hidden="true"
        >
          #
        </a>
      </h3>
    );
  },
  pre: ({ children, ...props }: ComponentProps<"pre">) => (
    <pre
      className="overflow-x-auto rounded-lg border border-border-primary bg-bg-secondary p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentProps<"code">) => {
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded bg-bg-tertiary px-1.5 py-0.5 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <code {...props}>{children}</code>;
  },
  blockquote: ({ children, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-border-secondary pl-4 italic text-text-secondary"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }: ComponentProps<"a">) => (
    <a
      href={href}
      className="text-text-primary underline underline-offset-4 hover:text-accent transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<"th">) => (
    <th
      className="border border-border-primary bg-bg-secondary px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps<"td">) => (
    <td className="border border-border-primary px-4 py-2" {...props}>
      {children}
    </td>
  ),
  ul: ({ children, ...props }: ComponentProps<"ul">) => (
    <ul className="list-disc list-inside space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<"ol">) => (
    <ol className="list-decimal list-inside space-y-1" {...props}>
      {children}
    </ol>
  ),
  hr: () => <hr className="border-border-primary my-8" />,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypePrettyCode, prettyCodeOptions],
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: { className: ["anchor"] },
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
