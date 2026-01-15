import { Component } from '@angular/core';
import { CAccountsCards } from "../../ui/c-accounts-cards/c-accounts-cards";
import { CTransactionsHistory } from "../../ui/c-transactions-history/c-transactions-history";

@Component({
  selector: 'c-main',
  imports: [CAccountsCards, CTransactionsHistory],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
  standalone: true
})
export class CMain {
  selectedAccountId: number | null = null;

  onAccountSelected(accountId: number) {
    this.selectedAccountId = accountId;
  }
}
