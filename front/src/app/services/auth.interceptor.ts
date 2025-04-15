// src/app/services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando solicitud:', request.url); // Para depuración

    // Obtener el usuario actual (que incluye el token)
    const currentUser = this.authService.currentUserValue;

    // Si hay un usuario logueado y tiene token, añadirlo a la solicitud
    if (currentUser && currentUser.token) {
      console.log('Añadiendo token a la solicitud'); // Para depuración

      // Clonar la solicitud y añadir el token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    } else {
      console.log('No hay token disponible'); // Para depuración
    }

    console.log('Current user:', currentUser);
    if (currentUser && currentUser.token) {
      console.log('Añadiendo token a la solicitud');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    } else {
      console.log('No hay token disponible');
    }

    console.log('Interceptando solicitud:', request.url);
    console.log('Usuario actual:', this.authService.currentUserValue);


    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
