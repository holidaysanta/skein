import { EditorStylesService } from './editor-styles.service';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Crepe } from '@milkdown/crepe';
import { replaceAll } from '@milkdown/kit/utils';
import { EditorLoadErrorComponent } from './editor-load-error/editor-load-error.component';
import { EditorLoadingComponent } from './editor-loading/editor-loading.component';

type EditorInitializationStatus = 'pending' | 'ready' | 'error';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col' },
  imports: [EditorLoadErrorComponent, EditorLoadingComponent],
})
export class MarkdownEditorComponent {
  private readonly injector = inject(Injector);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly editorStyles = inject(EditorStylesService);

  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');

  readonly value = input.required<string>();
  readonly showLoadingIndicator = input(true);
  readonly changed = output<string>();

  private crepe?: Crepe;
  private lastSyncedValue = '';
  private readonly initializationStatus = signal<EditorInitializationStatus>('pending');

  private readonly isReady = computed(() => {
    return this.initializationStatus() === 'ready';
  });

  protected readonly hasError = computed(() => {
    return this.editorStyles.status() === 'error' || this.initializationStatus() === 'error';
  });

  protected readonly isLoading = computed(() => {
    return !this.isReady() && !this.hasError();
  });

  constructor() {
    effect(() => {
      const value = this.value();
      if (!this.isReady() || value === this.lastSyncedValue) return;

      this.lastSyncedValue = value;
      this.crepe!.editor.action(replaceAll(value, true));
    });

    effect(() => {
      if (this.editorStyles.status() !== 'loaded') return;

      this.initializeEditor();
    });

    // В Milkdown 7.22.3 destroy() откладывает очистку, пока идёт create().
    inject(DestroyRef).onDestroy(() => this.crepe?.destroy());
  }

  flush(): void {
    if (!this.isReady()) return;
    this.emitIfChanged(this.crepe!.getMarkdown());
  }

  private initializeEditor(): void {
    // Ждём рендера #host; Milkdown создаётся вне NgZone.
    // Изменения для Angular передаём через сигналы и changed.
    afterNextRender(
      async () => {
        try {
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

          this.lastSyncedValue = this.value();

          this.crepe.on((listener) => {
            listener.markdownUpdated((_ctx, markdown) => {
              // После переключения заметки может прийти отложенное событие со старым текстом.
              if (markdown !== this.crepe!.getMarkdown()) return;
              this.emitIfChanged(markdown);
            });
            listener.blur(() => this.emitIfChanged(this.crepe!.getMarkdown()));
          });

          await this.crepe.create();
          this.initializationStatus.set('ready');
        } catch (error) {
          this.initializationStatus.set('error');
          this.errorHandler.handleError(error);
        }
      },
      { injector: this.injector }
    );
  }

  private emitIfChanged(markdown: string): void {
    if (markdown === this.lastSyncedValue) return;

    this.lastSyncedValue = markdown;
    this.changed.emit(markdown);
  }
}
