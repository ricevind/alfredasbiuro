import nodePath from "path";
import nodeFs from "fs/promises";

const cmsRootPath = "cms";
const cmsPagesPath = "pages";
const pagesPaths = ["landing_page.md", "offers.md"] as const;

type Pages = typeof pagesPaths[number];

function getPagePath(pageName: string) {
  const basePath = nodePath.resolve(cmsRootPath, cmsPagesPath);

  return nodePath.join(basePath, pageName);
}

async function readPageFile(path: string) {
  return nodeFs.readFile(path, { encoding: "utf-8" });
}

async function parsePageContentToJson(pageContent: string) {
  const { unified } = await import("unified");
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkFrontmatter } = await import("remark-frontmatter");
  const { default: remarkStringify } = await import("remark-stringify");
  const { default: extract } = await import("remark-extract-frontmatter");
  const { default: yaml } = await import("yaml");

  const parsedPage = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(extract, { yaml: yaml.parse })
    .use(remarkStringify)
    .process(pageContent);

  return parsedPage;
}

export async function readPage(pageName: Pages) {
  const pagePath = getPagePath(pageName);
  const pageFile = await readPageFile(pagePath);
  const pageJson = await parsePageContentToJson(pageFile);
  return pageJson;
}
