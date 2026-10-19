import { MarkdownToPlainPipe } from './markdown-to-plain.pipe';

describe('MarkdownToPlainPipe', () => {
  it('create an instance', () => {
    const pipe = new MarkdownToPlainPipe();
    expect(pipe).toBeTruthy();
  });
});
