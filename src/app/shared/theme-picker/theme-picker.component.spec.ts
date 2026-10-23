import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePickerComponent } from './theme-picker.component';
import { THEMES, ThemeStore } from '../../core/theme.store';

function resetThemeState(): void {
  localStorage.clear();
  delete document.documentElement.dataset['theme'];
}

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;
  let fixture: ComponentFixture<ThemePickerComponent>;

  beforeEach(async () => {
    resetThemeState();

    await TestBed.configureTestingModule({
      imports: [ThemePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(resetThemeState);

  function getButtons(): NodeListOf<HTMLButtonElement> {
    return (fixture.nativeElement as HTMLElement).querySelectorAll('button');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('рисует по кружку на каждую тему', () => {
    expect(getButtons().length).toBe(THEMES.length);
  });

  it('красит каждый кружок в его тему', () => {
    const buttonThemes = Array.from(getButtons()).map((button) => button.dataset['theme']);
    expect(buttonThemes).toEqual([...THEMES]);
  });

  it('при старте выделяет текущую тему', () => {
    const activeButtons = Array.from(getButtons()).filter((button) =>
      button.classList.contains('ring-2'),
    );

    expect(activeButtons.length).toBe(1);
    expect(activeButtons[0].dataset['theme']).toBe('graphite');
  });

  it('выбирает тему по клику на кружок', () => {
    const store = TestBed.inject(ThemeStore);
    const buttons = getButtons();
    const midnightButton = buttons[1];

    midnightButton.click();
    fixture.detectChanges();

    expect(store.theme()).toBe('midnight');
    expect(midnightButton.classList.contains('ring-2')).toBe(true);
    expect(buttons[0].classList.contains('ring-2')).toBe(false);
  });
});
