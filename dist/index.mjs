// src/parser.ts
import { marked } from "marked";

// src/utils.ts
import { Renderer } from "marked";

// src/styles.ts
var emptyStyle = {};
var baseHeaderStyles = {
  fontWeight: "500",
  paddingTop: 20
};
var h1 = {
  ...baseHeaderStyles,
  fontSize: "2.5rem"
};
var h2 = {
  ...baseHeaderStyles,
  fontSize: "2rem"
};
var h3 = {
  ...baseHeaderStyles,
  fontSize: "1.75rem"
};
var h4 = {
  ...baseHeaderStyles,
  fontSize: "1.5rem"
};
var h5 = {
  ...baseHeaderStyles,
  fontSize: "1.25rem"
};
var h6 = {
  ...baseHeaderStyles,
  fontSize: "1rem"
};
var bold = {
  fontWeight: "bold"
};
var italic = {
  fontStyle: "italic"
};
var blockQuote = {
  background: "#f9f9f9",
  borderLeft: "10px solid #ccc",
  margin: "1.5em 10px",
  padding: "1em 10px"
};
var codeInline = {
  color: "#212529",
  fontSize: "87.5%",
  display: "inline",
  background: " #f8f8f8",
  fontFamily: `SFMono-Regular,Menlo,Monaco,Consolas,monospace`
};
var codeBlock = {
  ...codeInline,
  paddingTop: 10,
  paddingRight: 10,
  paddingLeft: 10,
  paddingBottom: 1,
  marginBottom: 20,
  background: " #f8f8f8"
};
var link = {
  color: "#007bff",
  textDecoration: "underline",
  backgroundColor: "transparent"
};
var styles = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockQuote,
  bold,
  italic,
  link,
  codeBlock: { ...codeBlock, wordWrap: "break-word" },
  codeInline: { ...codeInline, wordWrap: "break-word" },
  p: emptyStyle,
  li: emptyStyle,
  ul: emptyStyle,
  ol: emptyStyle,
  image: emptyStyle,
  br: emptyStyle,
  hr: emptyStyle,
  table: emptyStyle,
  thead: emptyStyle,
  tbody: emptyStyle,
  th: emptyStyle,
  td: emptyStyle,
  tr: emptyStyle,
  strikethrough: emptyStyle
};

// src/utils.ts
function escapeQuotes(value) {
  if (typeof value === "string" && value.includes('"')) {
    return value.replace(/"/g, "&#x27;");
  }
  return value;
}
function camelToKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function parseCssInJsToInlineCss(cssProperties) {
  if (!cssProperties)
    return "";
  const numericalCssProperties = [
    "width",
    "height",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "outlineWidth",
    "top",
    "right",
    "bottom",
    "left",
    "fontSize",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "maxWidth",
    "minWidth",
    "maxHeight",
    "minHeight",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "textIndent",
    "gridColumnGap",
    "gridRowGap",
    "gridGap",
    "translateX",
    "translateY"
  ];
  return Object.entries(cssProperties).map(([property, value]) => {
    if (typeof value === "number" && numericalCssProperties.includes(property)) {
      return `${camelToKebabCase(property)}:${value}px`;
    } else {
      const escapedValue = escapeQuotes(value);
      return `${camelToKebabCase(property)}:${escapedValue}`;
    }
  }).join(";");
}
var initRenderer = ({
  customStyles,
  customRenderers: overrideRenderers
}) => {
  const finalStyles = { ...styles, ...customStyles };
  const customRenderer = new Renderer();
  customRenderer.blockquote = (quote) => {
    return `<blockquote${parseCssInJsToInlineCss(finalStyles.blockQuote) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"` : ""}>
${quote}</blockquote>
`;
  };
  customRenderer.br = () => {
    return `<br${parseCssInJsToInlineCss(finalStyles.br) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"` : ""} />`;
  };
  customRenderer.code = (code) => {
    code = code.replace(/\n$/, "") + "\n";
    return `<pre${parseCssInJsToInlineCss(finalStyles.codeBlock) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"` : ""}><code>${code}</code></pre>
`;
  };
  customRenderer.codespan = (text) => {
    return `<code${parseCssInJsToInlineCss(finalStyles.codeInline) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"` : ""}>${text}</code>`;
  };
  customRenderer.del = (text) => {
    return `<del${parseCssInJsToInlineCss(finalStyles.strikethrough) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"` : ""}>${text}</del>`;
  };
  customRenderer.em = (text) => {
    return `<em${parseCssInJsToInlineCss(finalStyles.italic) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"` : ""}>${text}</em>`;
  };
  customRenderer.heading = (text, level) => {
    return `<h${level}${parseCssInJsToInlineCss(finalStyles[`h${level}`]) !== "" ? ` style="${parseCssInJsToInlineCss(
      finalStyles[`h${level}`]
    )}"` : ""}>${text}</h${level}>`;
  };
  customRenderer.hr = () => {
    return `<hr${parseCssInJsToInlineCss(finalStyles.hr) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"` : ""} />
`;
  };
  customRenderer.image = (href, _, text) => {
    return `<img src="${href}" alt="${text}"${parseCssInJsToInlineCss(finalStyles.image) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"` : ""}>`;
  };
  customRenderer.link = (href, _, text) => {
    return `<a href="${href}" target="_blank"${parseCssInJsToInlineCss(finalStyles.link) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"` : ""}>${text}</a>`;
  };
  customRenderer.list = (body, ordered, start) => {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    const styles2 = parseCssInJsToInlineCss(finalStyles[ordered ? "ol" : "ul"]);
    return "<" + type + startatt + `${styles2 !== "" ? ` style="${styles2}"` : ""}>
` + body + "</" + type + ">\n";
  };
  customRenderer.listitem = (text) => {
    return `<li${parseCssInJsToInlineCss(finalStyles.li) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"` : ""}>${text}</li>
`;
  };
  customRenderer.paragraph = (text) => {
    return `<p${parseCssInJsToInlineCss(finalStyles.p) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"` : ""}>${text}</p>
`;
  };
  customRenderer.strong = (text) => {
    return `<strong${parseCssInJsToInlineCss(finalStyles.bold) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"` : ""}>${text}</strong>`;
  };
  customRenderer.table = (header, body) => {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return `<table${parseCssInJsToInlineCss(finalStyles.table) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"` : ""}>
<thead${parseCssInJsToInlineCss(finalStyles.thead) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"` : ""}>
${header}</thead>
${body}</table>
`;
  };
  customRenderer.tablecell = (content, flags) => {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}"${parseCssInJsToInlineCss(finalStyles.td) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"` : ""}>` : `<${type}${parseCssInJsToInlineCss(finalStyles.td) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"` : ""}>`;
    return tag + content + `</${type}>
`;
  };
  customRenderer.tablerow = (content) => {
    return `<tr${parseCssInJsToInlineCss(finalStyles.tr) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"` : ""}>
${content}</tr>
`;
  };
  Object.entries(overrideRenderers || {}).forEach(([tag, renderer]) => {
    customRenderer[tag] = renderer;
  });
  return customRenderer;
};

// src/parser.ts
var MarkdownParser = class {
  renderer;
  constructor({
    customStyles,
    customRenderers
  }) {
    this.renderer = initRenderer({ customStyles, customRenderers });
  }
  parse(markdown) {
    return marked.parse(markdown, { renderer: this.renderer });
  }
};

// src/parseMarkdownToJSX.ts
var parseMarkdownToJSX = ({
  markdown,
  customStyles,
  customRenderers
}) => {
  const parser = new MarkdownParser({ customStyles, customRenderers });
  return parser.parse(markdown);
};

// src/components/emailMarkdown.tsx
import * as React from "react";
var EmailMarkdown = ({
  markdown,
  markdownCustomStyles,
  markdownContainerStyles
}) => {
  const parsedMarkdown = parseMarkdownToJSX({
    markdown,
    customStyles: markdownCustomStyles
  });
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: markdownContainerStyles,
      dangerouslySetInnerHTML: { __html: parsedMarkdown }
    }
  );
};
export {
  EmailMarkdown,
  camelToKebabCase,
  parseCssInJsToInlineCss,
  parseMarkdownToJSX
};
//# sourceMappingURL=index.mjs.map