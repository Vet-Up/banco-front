import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICard } from '../../../core/models/i-cards';
import { ITransaction } from '../../../core/models/i-trasaction';
import { CardService } from '../../../core/services/card-service';
import { TransactionService } from '../../../core/services/transaction-service';

@Component({
  selector: 'c-card-modal',
  imports: [CommonModule],
  templateUrl: './c-card-modal.html',
  styleUrl: './c-card-modal.scss',
  standalone: true
})
export class CCardModal implements OnChanges {
  @Input() cardId: number | null = null;
  @Output() close = new EventEmitter<void>();

  card: ICard | null = null;
  transactions: ITransaction[] = [];
  loading = false;

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cardId'] && this.cardId) {
      this.loadCardData();
    }
  }

  loadCardData() {
    this.loading = true;
    
    this.cardService.getById(this.cardId!.toString()).subscribe({
      next: (card) => {
        this.card = card;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading card:', error);
        this.loading = false;
      }
    });

    this.transactionService.getByCardId(this.cardId!.toString()).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 4) return cardNumber;
    const lastFour = cardNumber.slice(-4);
    return '**** **** **** ' + lastFour;
  }
}
