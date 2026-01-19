import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { ITransaction } from '../../../core/models/i-trasaction';
import { TransactionService } from '../../../core/services/transaction-service';


@Component({
  selector: 'c-transactions-history',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './c-transactions-history.html',
  styleUrl: './c-transactions-history.scss',
})
export class CTransactionsHistory implements OnChanges {
  @Input() accountId: number | null = null;

  transactions: ITransaction[] = [];
  selectedAccountId: number | null = null;

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountId'] && this.accountId) {
      this.loadTransactions(this.accountId);
    }
  }

  loadTransactions(accountId: number) {
    this.selectedAccountId = accountId;
    this.transactionService.getByAccountId(accountId.toString()).subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
}

