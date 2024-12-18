import { Component, inject } from "@angular/core";
import { ToastsStore } from "./toast.store";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [
        CommonModule
    ],
    template: `
    @if(toastStore.messages().length){
        <div class="toasts">
            @for (item of toastStore.messages(); track $index) {
                <span class="toast" [ngClass]="item.type">
                    {{ item.message }}
                </span>
                <br/>
            }
        </div>
    }
    `
})
export class ToastComponent {
    toastStore = inject(ToastsStore);
}