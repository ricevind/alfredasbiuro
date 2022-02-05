import nodePath from "path";
import nodeFs from "fs/promises";

const cmsRootPath = "cms";
const cmsPagesPath = "pages";
const pagesPaths = ["landing.md"];

function getPagesPaths(paths: string[]) {
  const basePath = nodePath.join(".", cmsRootPath, cmsPagesPath);

  return paths.map((path) => nodePath.join(basePath, path));
}

async function readFromCms(paths: string[]) {
  const mdContents = [];
  for (let path of paths) {
    const mdContent = await readMdContentFromPath(path);
    mdContents.push(mdContent);
  }

  return mdContents;
}

async function readMdContentFromPath(path: string) {
  const mdFileContent = await nodeFs.readFile(path, { encoding: "utf-8" });

  return mdFileContent;
}

export async function readPages() {
  return readFromCms(getPagesPaths(pagesPaths));
}
