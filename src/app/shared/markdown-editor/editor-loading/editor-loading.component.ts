import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-editor-loading',
  imports: [],
  templateUrl: './editor-loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted',
    role: 'status',
  },
})
export class EditorLoadingComponent {}
