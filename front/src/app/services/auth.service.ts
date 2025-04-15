import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, LoginRequest, SignupRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  signup(request: SignupRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, request, {
      withCredentials: true
    });
  }

// En la función login() del servicio AuthService
  login(request: LoginRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.API_URL}/signin`, request)
      .pipe(
        map(response => {
          // Verificar que el token existe en la respuesta
          console.log('Respuesta del login:', response); // Para depuración

          const user: User = {
            id: response.id,
            username: response.username,
            email: response.email,
            name: response.name || response.username,
            roles: response.roles,
            token: response.token // Asegúrate de que esto no sea undefined
          };

          // Verificar que el token está presente antes de guardar
          if (!user.token) {
            console.error('No se recibió token del servidor');
          } else {
            console.log('Token recibido y guardado:', user.token.substring(0, 20) + '...');
          }




          // Guardar usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    // Eliminar usuario de localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.roles.includes('ROLE_ADMIN') || false;
  }

  getAuthorizationHeader(): HttpHeaders {
    const user = this.currentUserValue;
    if (user && user.token) {
      return new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
    }
    return new HttpHeaders();
  }
}
