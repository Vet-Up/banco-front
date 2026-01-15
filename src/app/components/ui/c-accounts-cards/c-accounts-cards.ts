import { Component, Output, EventEmitter } from '@angular/core';
import { IAccount } from '../../../core/models/i-account';
import { AccountService } from '../../../core/services/account-service';
import { AuthService } from '../../../core/services/auth-service';
import { ICard } from '../../../core/models/i-cards';
import { CardService } from '../../../core/services/card-service';
import { CCardModal } from '../c-card-modal/c-card-modal';


@Component({
  selector: 'c-accounts-cards',
  imports: [CCardModal],
  templateUrl: './c-accounts-cards.html',
  styleUrl: './c-accounts-cards.scss',
})
export class CAccountsCards {
  @Output() accountSelected = new EventEmitter<number>();

  accounts : IAccount[] = [];
  cards: ICard[] = [];
  selectedAccountId: number | null = null;
  selectedCardIdForModal: number | null = null;


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

}
