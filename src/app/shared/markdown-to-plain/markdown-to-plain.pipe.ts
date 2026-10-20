import { Pipe, PipeTransform } from '@angular/core';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import type { Nodes } from 'mdast';

const TEXT_BLOCK_TYPES = new Set<Nodes['type']>(['paragraph', 'heading', 'tableCell', 'code']);

function nodeToText(node: Nodes): string {
  if (TEXT_BLOCK_TYPES.has(node.type)) {
    return toString(node, { includeHtml: false, includeImageAlt: false }).trim();
  }

  if ('children' in node) {
    return node.children
      .map((child) => nodeToText(child))
      .filter((text) => text !== '')
      .join(' ');
  }

  return '';
}

@Pipe({
  name: 'markdownToPlain',
})
export class MarkdownToPlainPipe implements PipeTransform {
  transform(value: string): string {
    const tree = fromMarkdown(value, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()],
    });
    return nodeToText(tree).trim();
  }
}
