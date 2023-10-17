import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Theme } from './models/theme';
import { apiTheme, defaultTheme } from './models/theme-test-data';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeData!: Theme;

  constructor(private http: HttpClient) { }


  fetchData() {
    return new Promise<void>((resolve, reject) => {
      of(apiTheme).subscribe({
        next: (value: Theme) => {
          this.applyScssVariables(value);
          resolve();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
          this.applyScssVariables(defaultTheme);
          resolve();
          // reject();
        }
      })
    });

  }

  applyScssVariables(data: Theme) {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary: ${data.primary};
        --accent: ${data.accent};
        --warn: ${data.warn};
        --font-family: ${data.fontFamily}
      }
    `;
    document.head.appendChild(style);
  }
}
