import { elementVarToHtmlString } from "taggedjs";

type HtmlRenderable = {
  outerHTML?: string;
};

const VOID_TAGS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

const normalizeVoidTags = (html: string) =>
  VOID_TAGS.reduce(
    (output, tagName) =>
      output.replace(new RegExp(`(<${tagName}\\b[^>]*)></${tagName}>`, "gi"), "$1>"),
    html
  );

const renderNode = (node: HtmlRenderable) =>
  normalizeVoidTags(typeof node?.outerHTML === "string"
    ? node.outerHTML
    : elementVarToHtmlString(node as never));

export const renderDocument = (node: HtmlRenderable) => `<!doctype html>\n${renderNode(node)}\n`;
