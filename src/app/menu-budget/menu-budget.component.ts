import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FixedBudget, CheckBoxList } from '../model';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

interface pessoa {
  nome: string;
  idade: number;
  profissao: string;
}

@Component({
  selector: 'app-menu-budget',
  templateUrl: './menu-budget.component.html',
  styleUrls: ['./menu-budget.component.scss'],
})
export class MenuBudgetComponent {
  subscription: Subscription | undefined;

  constructor(private user: ApiService, private data: DataService) {}

  TotalValue: pessoa = {
    nome: '',
    idade: 0,
    profissao: '',
  };
  @Input() checkBoxList: CheckBoxList[] = [];
  @Input() fixedBudget: FixedBudget = {
    title: '',
    text: '',
    entregaPrazo: '',
    valorInicial: 0,
  };
  TotalValueBudget: number = 0;
  newDataBudget: CheckBoxList[] = [];

  ngOnInit() {
    this.user.getDataCheck().subscribe((res: any) => {
      this.checkBoxList = res;
    });
  }

  parentFunction(totalValue: any) {
    const { total, newData } = totalValue;
    this.TotalValueBudget = total;
    this.newDataBudget = newData;
  }
  saveBudget() {
    this.data.changeMessage(this.newDataBudget);
  }
}
