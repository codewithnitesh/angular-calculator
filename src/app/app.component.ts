import { Component, OnInit } from '@angular/core';
import { IButton, IRow } from './app.types';

const OPERATORS = [
  'addition',
  'subtraction',
  'mutiplication',
  'division',
  'decimalPoint',
  'percentage',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public expression = '';
  public message = '';
  public showMessage = false;
  private lastKey = '';

  rows: IRow[] = [
    {
      id: 1,
      buttons: [
        {
          id: 'clear',
          text: 'C',
          classes: 'flex-span-2-column',
          disabled: false,
        },
        {
          id: 'back',
          text: '←',
          disabled: false,
        },
        {
          id: 'mutiplication',
          text: '*',
          disabled: false,
        },
      ],
    },
    {
      id: 2,
      buttons: [
        {
          id: 'seven',
          text: '7',
          disabled: false,
        },
        {
          id: 'eight',
          text: '8',
          disabled: false,
        },
        {
          id: 'nine',
          text: '9',
          disabled: false,
        },
        {
          id: 'division',
          text: '/',
          disabled: false,
        },
      ],
    },
    {
      id: 3,
      buttons: [
        {
          id: 'four',
          text: '4',
          disabled: false,
        },
        {
          id: 'five',
          text: '5',
          disabled: false,
        },
        {
          id: 'six',
          text: '6',
          disabled: false,
        },
        {
          id: 'addition',
          text: '+',
          disabled: false,
        },
      ],
    },
    {
      id: 4,
      buttons: [
        {
          id: 'one',
          text: '1',
          disabled: false,
        },
        {
          id: 'two',
          text: '2',
          disabled: false,
        },
        {
          id: 'three',
          text: '3',
          disabled: false,
        },
        {
          id: 'subtraction',
          text: '-',
          disabled: false,
        },
      ],
    },
    {
      id: 5,
      buttons: [
        {
          id: 'decimalPoint',
          text: '.',
          disabled: false,
        },
        {
          id: 'zero',
          text: '0',
          disabled: false,
        },
        {
          id: 'percentage',
          text: '%',
          disabled: false,
        },
        {
          id: 'equalTo',
          text: '=',
          disabled: false,
        },
      ],
    },
  ];

  buttonClicked(button: IButton) {
    this.message = '';
    const { text, id } = button;

    switch (id) {
      case 'clear':
        this.expression = '';
        break;

      case 'back':
        this.expression = this.expression.slice(0, -1);
        break;

      case 'equalTo':
        this.evaluateExpression();
        break;

      default:
        this.expression += text;
    }

    this.lastKey = id;
  }

  evaluateExpression() {
    if (!this.expression.length) {
      return;
    }

    try {
      let exp = this.expression.replace('%', '/100');
      let temp = eval(exp).toString();

      if (temp.includes('.')) {
        temp = Math.round((Number(temp) + Number.EPSILON) * 100) / 100;
      }

      if (temp === 'Infinity') {
        setTimeout(() => {
          this.expression = '';
        }, 1000);
      }

      if (![null, 'NaN', undefined].includes(temp)) {
        this.expression = temp;
        this.message = '';
      } else {
        throw Error('String has value :' + temp);
      }
    } catch (ex) {
      this.message = 'Invalid operation. Please check provided inputs.';
      this.showMessage = Boolean(this.message.length);
      console.error(ex);
    }
  }

  isOperator(key: string) {
    return OPERATORS.includes(key);
  }

  isLastKeyIsOperator() {
    return this.isOperator(this.lastKey);
  }
}
