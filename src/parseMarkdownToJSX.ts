import { MarkdownParser } from './parser';
import { parseMarkdownToJSXProps } from './types';

export const parseMarkdownToJSX = ({
	markdown,
	customStyles,
	customRenderers,
}: parseMarkdownToJSXProps) => {
	const parser = new MarkdownParser({ customStyles, customRenderers });
	return parser.parse(markdown);
};
