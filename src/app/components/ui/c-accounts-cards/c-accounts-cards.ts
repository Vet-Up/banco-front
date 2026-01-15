import { Component, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IAccount } from '../../../core/models/i-account';
import { AccountService } from '../../../core/services/account-service';
import { AuthService } from '../../../core/services/auth-service';
import { ICard } from '../../../core/models/i-cards';
import { CardService } from '../../../core/services/card-service';
import { CCardModal } from '../c-card-modal/c-card-modal';


@Component({
  selector: 'c-accounts-cards',
  imports: [CCardModal, DecimalPipe],
  templateUrl: './c-accounts-cards.html',
  styleUrl: './c-accounts-cards.scss',
})
export class CAccountsCards {
  @Output() accountSelected = new EventEmitter<number>();

  accounts : IAccount[] = [];
  cards: ICard[] = [];
  selectedAccountId: number | null = null;
  selectedCardIdForModal: number | null = null;
  showBalance: boolean = false;


  userId = '';

  constructor( private accountService: AccountService, private authService: AuthService, private cardService: CardService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user && user.userId) {
        this.userId = user.userId.toString();
        
        this.accountService.getByUserId(this.userId).subscribe((accounts) => {
          this.accounts = accounts;
        });
      }
    });
  }

  onAccountClick(accountId: number) {
    this.selectedAccountId = accountId;
    this.accountSelected.emit(accountId);
    this.cardService.getByAccountId(accountId.toString()).subscribe((cards) => {
      this.cards = cards;
    });
  }

  onCardClick(cardId: number) {
    this.selectedCardIdForModal = cardId;
  }

  onCloseModal() {
    this.selectedCardIdForModal = null;
  }

  maskCardNumber(cardNumber: string): string {
    if (!cardNumber || cardNumber.length < 4) return cardNumber;
    const lastFour = cardNumber.slice(-4);
    return '**** **** **** ' + lastFour;
  }

  toggleBalance(event: Event) {
    event.stopPropagation();
    this.showBalance = !this.showBalance;
  }

  getCardType(cardNumber: string): 'visa' | 'mastercard' | 'unknown' {
    if (!cardNumber) return 'unknown';
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    return 'unknown';
  }

}
