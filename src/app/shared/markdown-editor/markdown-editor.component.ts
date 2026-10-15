import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Crepe } from '@milkdown/crepe';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent {
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  readonly value = input.required<string>();
  readonly changed = output<string>();

  private crepe?: Crepe;
  private lastEmitted = '';

  constructor() {
    afterNextRender(() => {
      this.crepe = new Crepe({ root: this.host().nativeElement, defaultValue: this.value() });

      this.lastEmitted = this.value();

      this.crepe.on((listener) => {
        listener.markdownUpdated((_ctx, markdown) => {
          this.emitIfChanged(markdown);
        });
        listener.blur(() => this.emitIfChanged(this.crepe!.getMarkdown()));
      });

      this.crepe.create();
    });

    inject(DestroyRef).onDestroy(() => this.crepe?.destroy());
  }

  private emitIfChanged(markdown: string): void {
    if (markdown === this.lastEmitted) return;

    this.lastEmitted = markdown;
    this.changed.emit(markdown);
  }
}
