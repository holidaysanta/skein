import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdownToPlain',
})
export class MarkdownToPlainPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/^#+\s/gm, '')
      .replace(/^```.*/gm, '')
      .replace(/[*_~`]/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\\(.)/g, '$1')
      .trim();
  }
}
