import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserData, Response } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  final: void[];
  constructor(private http: HttpClient) {}
  res = false;

  // modify the return type to properly use the full response
  async login(username: string, password: string): Promise<any> {
    await this.http
      .post<any>('https://reqres.in/api/login', { username, password })
      .subscribe({
        next: (data) => {
          localStorage.setItem('user', JSON.stringify(data));
          let userToken = localStorage.getItem('user');
          let tokenValue = JSON.parse(userToken);
          console.log(tokenValue.token);
          this.res = true;
        },
        error: (error) => {
          this.res = false;
        },
      });
    return this.res;
  }

  //to get user detials
  // user(): Observable<UserData[]> {
  //   return this.http.get<UserData[]>('https://reqres.in/api/unknown');
  user(): any {
    let userToken = localStorage.getItem('user');
    let tokenValue = JSON.parse(userToken);
    console.log(tokenValue.token);
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer <' + tokenValue.token + '>',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http
      .get<UserData>('https://reqres.in/api/unknown', requestOptions)
      .subscribe((userDetials) => {
        // let userDetials = JSON.parse(data);
        // const res = new Response();
        // this.final = res.data.map((userData) => {
        //   const user = new UserData();
        //   user.id = userData.id;
        // });
        localStorage.setItem('final', JSON.stringify(userDetials));
        console.log('final', userDetials);
        return userDetials;
      });
  }
}
