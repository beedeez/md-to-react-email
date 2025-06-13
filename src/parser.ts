import { CustomRenderersType } from './types';

import { marked, Renderer } from 'marked';
import { StylesType } from './types';
import { initRenderer } from './utils';

export class MarkdownParser {
	private readonly renderer: Renderer;

	constructor({
		customStyles,
		customRenderers,
	}: {
		customStyles?: StylesType;
		customRenderers?: CustomRenderersType;
	}) {
		this.renderer = initRenderer({ customStyles, customRenderers });
	}

	parse(markdown: string) {
		return marked.parse(markdown, { renderer: this.renderer });
	}
}
