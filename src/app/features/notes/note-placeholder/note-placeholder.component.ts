import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-note-placeholder',
  template: `
    <div class="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
      <svg width="30" height="30" aria-hidden="true">
        <use href="/icons.svg#lightbulb" />
      </svg>
    </div>

    <div class="flex max-w-sm flex-col gap-1.5">
      @if (noteCount() === 0) {
        <h2 class="text-xl font-semibold text-fg">Чтобы не искать потом</h2>
        <p class="text-sm leading-relaxed text-muted">
          Сохраните мысль, полезный пример или объяснение, которое хочется запомнить
        </p>
      } @else {
        <h2 class="text-xl font-semibold text-fg">Есть к чему вернуться</h2>
        <p class="text-sm leading-relaxed text-muted">
          Откройте заметку, чтобы вспомнить главное или добавить что-то новое
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'h-full flex flex-col items-center justify-center gap-3 px-6 py-10 text-center select-none',
  },
})
export class NotePlaceholderComponent {
  // NotesComponent передаёт количество видимых заметок через routerOutletData.
  // Тип инъекции основан на этом договоре: TypeScript не сверяет его с привязкой родителя.
  protected readonly noteCount = inject<Signal<number>>(ROUTER_OUTLET_DATA);
}
