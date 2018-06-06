import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';
import {Equation} from './Equation';

@Pipe({name: 'operator'})
export class EquationPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {

  }

  transform(value: Equation): SafeHtml {


    let html = this.getOperatorFont(value.operator)

    return this.sanitized.bypassSecurityTrustHtml(html);
  }

  private getOperatorFont(operator) {
    switch (operator){
      case '+':
       return  '<i class="fas fa-plus"></i>';
      case '-':
        return '<i class="fas fa-minus"></i>';
      case '*':
        return '<i class="fas fa-times"></i>';
      case '/':
        return '<i class="fas fa-divide"></i>';
    }
    return '';
  }
}
