import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const theme =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    this.linkTheme?.setAttribute('href', theme);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    // Como son 10 elementos se puede saltar al dom(si es una cantidad alta no es recomendable)
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeLink = `./assets/css/colors/${btnTheme}.css`;

      this.linkTheme?.getAttribute('href') == btnThemeLink
        ? element.classList.add('working')
        : null;
    });
  }
}
