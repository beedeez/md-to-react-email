import * as React from 'react';
import React__default, { CSSProperties } from 'react';

type StylesType = {
    h1?: CSSProperties;
    h2?: CSSProperties;
    h3?: CSSProperties;
    h4?: CSSProperties;
    h5?: CSSProperties;
    h6?: CSSProperties;
    blockQuote?: CSSProperties;
    bold?: CSSProperties;
    italic?: CSSProperties;
    link?: CSSProperties;
    codeBlock?: CSSProperties;
    codeInline?: CSSProperties;
    p?: CSSProperties;
    li?: CSSProperties;
    ul?: CSSProperties;
    ol?: CSSProperties;
    image?: CSSProperties;
    br?: CSSProperties;
    hr?: CSSProperties;
    table?: CSSProperties;
    thead?: CSSProperties;
    tbody?: CSSProperties;
    tr?: CSSProperties;
    th?: CSSProperties;
    td?: CSSProperties;
    strikethrough?: CSSProperties;
};
type CustomRenderersType = {
    [tag: string]: (...args: any[]) => string | React__default.JSX.Element;
};
type parseMarkdownToJSXProps = Readonly<{
    markdown: string;
    customStyles?: StylesType;
    containerStyles?: React__default.CSSProperties;
    customRenderers?: CustomRenderersType;
}>;

declare const parseMarkdownToJSX: ({ markdown, customStyles, customRenderers, }: parseMarkdownToJSXProps) => string;

interface EmailMarkdownProps {
    markdown: string;
    markdownCustomStyles?: StylesType;
    markdownContainerStyles?: React.CSSProperties;
}
declare const EmailMarkdown: React.FC<EmailMarkdownProps>;

declare function camelToKebabCase(str: string): string;
declare function parseCssInJsToInlineCss(cssProperties: CSSProperties | undefined): string;

export { EmailMarkdown, StylesType, camelToKebabCase, parseCssInJsToInlineCss, parseMarkdownToJSX, parseMarkdownToJSXProps };
