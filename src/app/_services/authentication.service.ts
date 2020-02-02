import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient) { }
    get isLoggedIn() {
        if (localStorage.getItem('currentUser') != null)
            this.loggedIn.next(true);
        return this.loggedIn.asObservable();
    }
    login(email: string, password: string) {
        return this.http.post<any>(`${environment.API}/auth/login`, { email, password })
            .pipe(map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user['code'] == 200 && user['value'].accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user['value']));
                    this.loggedIn.next(true);
                }

                return user['value'];
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
    }
}