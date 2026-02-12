import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

import { ITransaction } from '../models/i-trasaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://vetup-bank-back.preproducciondaw.cip.fpmislata.com/api/bank-transactions';

    constructor(private http: HttpService) {}  

    getAll(): Observable<ITransaction[]> {
      return this.http.get<ITransaction[]>(this.apiUrl);
    }

    getById(id: string): Observable<ITransaction> {
      return this.http.get<ITransaction>(`${this.apiUrl}/${id}`);
    }

    getByAccountId(accountId: string): Observable<ITransaction[]> {
      return this.http.get<ITransaction[]>(`${this.apiUrl}/by-account/${accountId}`);
    }

    getByCardId(cardId: string): Observable<ITransaction[]> {
      return this.http.get<ITransaction[]>(`${this.apiUrl}/by-card/${cardId}`);
    }
}