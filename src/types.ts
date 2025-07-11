import React, { CSSProperties } from 'react';

export type StylesType = {
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

export type initRendererProps = {
	customStyles?: StylesType;
	customRenderers?: CustomRenderersType;
};

export type CustomRenderersType = {
	[tag: string]: (...args: any[]) => string | React.JSX.Element;
};

export type parseMarkdownToJSXProps = Readonly<{
	markdown: string;
	customStyles?: StylesType;
	containerStyles?: React.CSSProperties;
	customRenderers?: CustomRenderersType; // <-- NEW!
}>;
