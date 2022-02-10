import nodePath from "path";
import nodeFs from "fs/promises";

const cmsRootPath = "cms";
const cmsPagesPath = "pages";
const pagesPaths = ["landing_page.md", "offers.md"] as const;

type Pages = typeof pagesPaths[number];
type PageParseConfig = {
  mdProps: string[];
};

function getPagePath(pageName: string) {
  const basePath = nodePath.resolve(cmsRootPath, cmsPagesPath);

  return nodePath.join(basePath, pageName);
}

async function readPageFile(path: string) {
  return nodeFs.readFile(path, { encoding: "utf-8" });
}

async function parsePageContentToJson(
  pageContent: string,
  mdProps: PageParseConfig["mdProps"] = []
) {
  const { unified } = await import("unified");
  const { default: markdown } = await import("remark-parse");
  const { default: remarkFrontmatter } = await import("remark-frontmatter");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkRehype } = await import("remark-rehype");
  const { default: rehypeStringify } = await import("rehype-stringify");
  const { default: extract } = await import("remark-extract-frontmatter");
  const { default: yaml } = await import("yaml");

  const parseToHtml = async (content: string) =>
    unified()
      .use(markdown)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content);

  const parsedPage = await unified()
    .use(markdown)
    .use(remarkFrontmatter)
    .use(extract, { yaml: yaml.parse })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(pageContent);

  const parsedPageWithProcessedMarkdownProps = parsedPage;

  type DataType = typeof parsedPageWithProcessedMarkdownProps.data;

  for (const mdProp of mdProps) {
    const propContent = parsedPageWithProcessedMarkdownProps.data[
      mdProp
    ] as string;
    console.log(propContent);

    const parsedPropContent = (await parseToHtml(propContent)).value;
    const newData: DataType = {
      ...parsedPageWithProcessedMarkdownProps.data,
      [mdProp]: parsedPropContent,
    };
    parsedPageWithProcessedMarkdownProps.data = newData;
  }

  return parsedPageWithProcessedMarkdownProps;
}

const defaultPageParseConfig: PageParseConfig = {
  mdProps: [],
};
export async function readPage(
  pageName: Pages,
  config: Partial<PageParseConfig> = {}
) {
  const fullConfig: PageParseConfig = { ...defaultPageParseConfig, ...config };

  const pagePath = getPagePath(pageName);
  const pageFile = await readPageFile(pagePath);
  const pageJson = await parsePageContentToJson(pageFile, fullConfig.mdProps);

  return pageJson;
}
