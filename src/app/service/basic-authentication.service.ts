import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(username: string, password: string) {
    if (username === "matheus" && password === "pass") {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  executeAuthenticationService(username, password) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({Authorization: basicAuthHeaderString});

    return this.http.get<AuthenticationBean>(
      `http://localhost:8080/baiscauth`, {headers}
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
