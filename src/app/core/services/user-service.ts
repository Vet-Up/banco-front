import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpService) {}

  private apiUrl = "http://vetup-bank-back.preproducciondaw.cip.fpmislata.com/api/users";

  getUserById(id: number) {
    return this.http.getById<any>(this.apiUrl, id);
  }

  getUserByUsername(username: string):Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/by-username/${username}`);
  }

  getUserByDni(dni: string):Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/by-dni/${dni}`);
  }
  
}
