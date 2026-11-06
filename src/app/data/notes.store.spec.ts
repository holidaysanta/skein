import { TestBed } from '@angular/core/testing';
import { Note } from './note.model';
import { NotesStore } from './notes.store';

describe('NotesStore', () => {
  const first: Note = { id: '1', title: 'Первая', text: 'раз' };
  const second: Note = { id: '2', title: 'Вторая', text: 'два' };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('загрузка', () => {
    it('пустой список, если заметок нет', () => {
      const store = TestBed.inject(NotesStore);
      expect(store.notes()).toEqual([]);
    });

    it('пустой список, если сохранён битый JSON', () => {
      localStorage.setItem('skein.notes', 'Hello World');
      const store = TestBed.inject(NotesStore);
      expect(store.notes()).toEqual([]);
    });

    it('пустой список, если сохранён не массив', () => {
      localStorage.setItem('skein.notes', '{}');
      const store = TestBed.inject(NotesStore);
      expect(store.notes()).toEqual([]);
    });

    it('загружает сохранённые заметки', () => {
      localStorage.setItem('skein.notes', JSON.stringify([first]));
      const store = TestBed.inject(NotesStore);
      expect(store.notes()).toEqual([first]);
    });
  });

  describe('изменения', () => {
    let store: NotesStore;

    beforeEach(() => {
      localStorage.setItem('skein.notes', JSON.stringify([first, second]));
      store = TestBed.inject(NotesStore);
    });

    it('addNote добавляет заметку в конец', () => {
      const third: Note = { id: '3', title: 'Третья', text: 'три' };

      store.addNote(third);

      expect(store.notes()).toEqual([first, second, third]);
    });

    it('updateNote меняет только нужную заметку и только переданные поля', () => {
      store.updateNote('1', { title: 'Новая' });

      expect(store.notes()).toEqual([{ id: '1', title: 'Новая', text: 'раз' }, second]);
    });

    it('updateNote не мутирует старый массив', () => {
      const before = store.notes();

      store.updateNote('1', { title: 'Новая' });

      expect(store.notes()).not.toBe(before);
      expect(before).toEqual([first, second]);
    });

    it('deleteNote удаляет только нужную заметку', () => {
      store.deleteNote('1');

      expect(store.notes()).toEqual([second]);
    });

    it('сохраняет изменения в localStorage', () => {
      store.deleteNote('1');
      TestBed.flushEffects();

      expect(JSON.parse(localStorage.getItem('skein.notes')!)).toEqual([second]);
    });
  });
});
