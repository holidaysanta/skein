import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-editor-load-error',
  imports: [],
  templateUrl: './editor-load-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center',
    role: 'alert',
  },
})
export class EditorLoadErrorComponent {
  protected reloadPage(): void {
    window.location.reload();
  }
}
