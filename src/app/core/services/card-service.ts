import { Injectable } from '@angular/core';
import { ICard } from '../models/i-cards';
import { Observable } from 'rxjs';
import { HttpService } from './http-service';


@Injectable({
  providedIn: 'root',

})

export class CardService {
    private apiUrl = 'http://localhost:8080/api/credit-cards';

    constructor(private http: HttpService) {}

    getAll(): Observable<ICard[]> {
    return this.http.get<ICard[]>(this.apiUrl);
    }

    getById(id: string): Observable<ICard> {
    return this.http.get<ICard>(`${this.apiUrl}/${id}`);
    }

    getByAccountId(id: string): Observable<ICard[]> {
    return this.http.get<ICard[]>(`${this.apiUrl}/by-account/${id}`);
    }
}
