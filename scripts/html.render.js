const VOID_TAGS = new Set([
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
]);

const escapeText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");

const normalizeChildren = (children) =>
  children.flatMap((child) => (Array.isArray(child) ? normalizeChildren(child) : child));

const isElementObject = (node) =>
  typeof node === "object" &&
  node !== null &&
  node.tagJsType === "element" &&
  typeof node.tagName === "string";

const isMockElementFunction = (node) =>
  typeof node === "function" &&
  node.tagJsType === "element" &&
  typeof node.tagName === "string" &&
  Array.isArray(node.attributes) &&
  Array.isArray(node.listeners) &&
  Array.isArray(node.allListeners);

const resolveRenderableNode = (node) => {
  if (!isMockElementFunction(node)) return node;
  try {
    return node();
  } catch {
    return node;
  }
};

const renderAttributes = (attributes) => {
  if (!attributes?.length) return "";
  const parts = [];
  attributes.forEach(([name, value]) => {
    let resolvedValue = value;
    if (typeof resolvedValue === "function" && !isMockElementFunction(resolvedValue)) {
      try {
        resolvedValue = resolvedValue();
      } catch {
        resolvedValue = value;
      }
    }
    if (resolvedValue === undefined || resolvedValue === null || resolvedValue === false) {
      return;
    }
    if (resolvedValue === true) {
      parts.push(String(name));
      return;
    }
    parts.push(`${name}="${escapeAttr(resolvedValue)}"`);
  });
  return parts.length ? ` ${parts.join(" ")}` : "";
};

const renderNode = (node, indent) => {
  node = resolveRenderableNode(node);
  if (node === undefined || node === null || node === false) return "";
  if (Array.isArray(node)) {
    return normalizeChildren(node)
      .map((child) => renderNode(resolveRenderableNode(child), indent))
      .filter(Boolean)
      .join("\n");
  }
  if (!isElementObject(node)) {
    return `${" ".repeat(indent)}${escapeText(node)}`;
  }

  const tagName = node.tagName;
  const attrs = renderAttributes(node.attributes);
  const children = normalizeChildren(node.innerHTML || [])
    .map(resolveRenderableNode)
    .filter(
    (child) => child !== undefined && child !== null && child !== false
  );
  const spacer = " ".repeat(indent);

  if (VOID_TAGS.has(tagName)) {
    return `${spacer}<${tagName}${attrs} />`;
  }
  if (!children.length) {
    return `${spacer}<${tagName}${attrs}></${tagName}>`;
  }

  const singleChild = children.length === 1 ? children[0] : null;
  if (singleChild && !isElementObject(singleChild) && !Array.isArray(singleChild)) {
    return `${spacer}<${tagName}${attrs}>${escapeText(singleChild)}</${tagName}>`;
  }

  const renderedChildren = children
    .map((child) => renderNode(child, indent + 2))
    .filter(Boolean)
    .join("\n");
  return `${spacer}<${tagName}${attrs}>\n${renderedChildren}\n${spacer}</${tagName}>`;
};

export const renderDocument = (node) => `<!doctype html>\n${renderNode(node, 0)}\n`;
