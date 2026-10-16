import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Crepe } from '@milkdown/crepe';
import { replaceAll } from '@milkdown/kit/utils';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col' },
})
export class MarkdownEditorComponent {
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  readonly value = input.required<string>();
  readonly changed = output<string>();

  private readonly isReady = signal(false);

  private crepe?: Crepe;
  private lastEmitted = '';

  constructor() {
    // afterNextRender выполняется вне зоны Angular, поэтому события Milkdown не запускают проверку изменений
    afterNextRender(async () => {
      this.crepe = new Crepe({
        root: this.host().nativeElement,
        defaultValue: this.value(),
        featureConfigs: {
          [Crepe.Feature.Placeholder]: {
            text: 'Начните писать…',
            mode: 'block',
          },
        },
      });

      this.lastEmitted = this.value();

      this.crepe.on((listener) => {
        listener.markdownUpdated((_ctx, markdown) => {
          if (markdown !== this.crepe!.getMarkdown()) return;
          this.emitIfChanged(markdown);
        });
        listener.blur(() => this.emitIfChanged(this.crepe!.getMarkdown()));
      });

      await this.crepe.create();
      this.isReady.set(true);
    });

    effect(() => {
      const value = this.value();
      if (!this.isReady() || value === this.lastEmitted) return;

      this.lastEmitted = value;
      this.crepe!.editor.action(replaceAll(value, true));
    });

    inject(DestroyRef).onDestroy(() => this.crepe?.destroy());
  }

  private emitIfChanged(markdown: string): void {
    if (markdown === this.lastEmitted) return;

    this.lastEmitted = markdown;
    this.changed.emit(markdown);
  }
}
