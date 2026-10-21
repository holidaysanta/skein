import { MarkdownToPlainPipe } from './markdown-to-plain.pipe';

describe('MarkdownToPlainPipe', () => {
  let pipe: MarkdownToPlainPipe;

  beforeEach(() => {
    pipe = new MarkdownToPlainPipe();
  });

  it('убирает горизонтальную линию', () => {
    const pipe = new MarkdownToPlainPipe();
    expect(pipe.transform('***')).toBe('');
  });

  it('убирает HTML-теги вроде <br />', () => {
    expect(pipe.transform('<br />')).toBe('');
  });

  it('декодирует HTML-сущности (&#x20;)', () => {
    expect(pipe.transform('&#x20;f')).toBe('f');
  });

  it('разделяет блоки пробелом', () => {
    expect(pipe.transform('# Заголовок\n\nтекст')).toBe('Заголовок текст');
  });

  it('разделяет ячейки таблицы пробелом', () => {
    expect(pipe.transform('| Что | Ставим |\n| - | - |\n| a | b |')).toBe('Что Ставим a b');
  });

  it('убирает маркер задачи из пустого пункта списка', () => {
    expect(pipe.transform('* [ ] <br />')).toBe('');
  });
});
