import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IAccount } from '../models/i-account';



@Injectable({
  providedIn: 'root',
  
})
export class AccountService {
    private apiUrl = 'http://vetup-bank-back.preproducciondaw.cip.fpmislata.com/api/bank-accounts';
    constructor(private http: HttpService) {}

    getAll(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.apiUrl);
    }

    getByUserId(id: string): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.apiUrl}/by-user/${id}`);
    }
}