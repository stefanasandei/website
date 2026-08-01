// Wraps Shiki-highlighted code blocks (<pre class="astro-code">) in a panel
// with a header showing the language and a copy-to-clipboard button.
// The copy interaction lives in BaseLayout.astro (event delegation).

const LANG_ALIASES = {
    py: "python",
    js: "javascript",
    ts: "typescript",
    sh: "shell",
    yml: "yaml",
};

function h(tagName, properties = {}, children = []) {
    return { type: "element", tagName, properties, children };
}

function text(value) {
    return { type: "text", value };
}

function icon(children, className) {
    return h(
        "svg",
        {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            className: [className],
        },
        children,
    );
}

const copyIcon = icon(
    [
        h("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
        h("path", {
            d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
        }),
    ],
    "icon-copy",
);

const checkIcon = icon(
    [h("polyline", { points: "20 6 9 17 4 10" })],
    "icon-check",
);

function getCode(pre) {
    return pre.children?.find(
        (child) => child.type === "element" && child.tagName === "code",
    );
}

function getLanguage(pre) {
    const dataLang =
        pre.properties?.dataLanguage ?? pre.properties?.["data-language"];
    if (dataLang) return String(dataLang);

    // fallback: <code class="language-x"> (non-Shiki paths)
    const className = getCode(pre)?.properties?.className ?? [];
    const langClass = className.find((c) => String(c).startsWith("language-"));
    return langClass ? String(langClass).replace("language-", "") : "";
}

// Parses an optional title from a fence meta string, e.g. the
// 'VICReg loss' in: ```py title="VICReg loss"
export function parseCodeTitle(meta) {
    if (typeof meta !== "string") return "";
    const match = meta.match(/title=(?:"([^"]*)"|'([^']*)'|(\S+))/);
    return match ? (match[1] ?? match[2] ?? match[3] ?? "") : "";
}

// Astro runs this plugin AFTER Shiki, which replaces the <pre> and drops the
// fence meta. A small transformer in astro.config.mjs forwards the parsed
// title onto the <pre> as data-title so it survives to here.
function getTitle(pre) {
    const dataTitle =
        pre.properties?.dataTitle ?? pre.properties?.["data-title"];
    if (dataTitle) return String(dataTitle);
    // fallback for non-Shiki paths
    return parseCodeTitle(getCode(pre)?.data?.meta);
}

function wrap(pre) {
    const lang = getLanguage(pre);
    const label = getTitle(pre) || LANG_ALIASES[lang] || lang || "code";

    const button = h(
        "button",
        {
            type: "button",
            className: ["code-block-copy"],
            "data-copy-code": "",
            "aria-label": "Copy code to clipboard",
            title: "Copy code",
        },
        [
            copyIcon,
            checkIcon,
            h("span", { className: ["label-copy"] }, [text("copy")]),
            h("span", { className: ["label-copied"] }, [text("copied")]),
        ],
    );

    const header = h("div", { className: ["code-block-header"] }, [
        h("span", { className: ["code-block-lang"] }, [text(label)]),
        button,
    ]);

    return h(
        "div",
        {
            className: ["code-block"],
            "data-code-block": "",
            ...(lang ? { "data-language": lang } : {}),
        },
        [header, pre],
    );
}

// Note: Astro runs user rehype plugins AFTER its Shiki transform, so this
// matches the highlighted <pre class="astro-code"> shape (which always
// contains a <code> child).
function isCodeBlockPre(node) {
    return (
        node.type === "element" &&
        node.tagName === "pre" &&
        node.children?.some(
            (child) => child.type === "element" && child.tagName === "code",
        )
    );
}

function walk(node, parent, index) {
    if (parent && isCodeBlockPre(node)) {
        parent.children[index] = wrap(node);
        return;
    }
    if (node.children) {
        node.children.forEach((child, i) => walk(child, node, i));
    }
}

export default function rehypeCodeBlocks() {
    return (tree) => walk(tree, null, -1);
}
