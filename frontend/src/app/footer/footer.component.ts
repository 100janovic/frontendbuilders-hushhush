import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    template: `
        <footer>
            <p>{{ year }} | &copy;
                <a href="https://frontendbuilders.com" target="_blank">FrontendBuilders</a>
            </p>
        </footer>
    `,
    standalone: true
})
export class FooterComponent {
    year: number = new Date().getFullYear();
}