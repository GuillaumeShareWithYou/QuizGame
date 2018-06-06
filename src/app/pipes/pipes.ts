import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'stars'})
export class StarsPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {

  }

  transform(value: string): SafeHtml {
    let n = 1;
    if (value === 'medium') {
      n = 2;
    } else if (value === 'hard') {
      n = 3;
    }
    let html = '';
    for (let i = 0; i < n; ++i) {
      html += '<i style="color: #f5d00e" class="fas fa-star"></i>';
    }
    return this.sanitized.bypassSecurityTrustHtml(html);
  }
}
