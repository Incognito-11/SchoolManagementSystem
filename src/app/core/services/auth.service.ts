import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Base API URL from environment file
  private api = environment.apiUrl;
  // A BehaviourSubject holds the current logged-in user( or null if logged out).
  //It is initialized with the user stored in local storage(if any)
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getStoredUser()
  );
  // Expose the current user as an observable so components can react to changes
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}
  /**
   * Helper Method to retrieve a stored user from local storage.
   * Used when initialization the BehaviorSubject so login persists across reloads
   */
  private getStoredUser(): User | null {
    const raw = localStorage.getItem('sm_user');
    return raw ? JSON.parse(raw) : null;
    // Parse to User object or return null
  }

  /**
   * Save user in Localstorage and update BehaviorSubject.
   * Passing null clears the user(used on logout).
   */
  private storeUser(user: User | null) {
    if (user) {
      //Save as JSON string
      localStorage.setItem('sm_user', JSON.stringify(user));
    } else {
      // Remove if logging out
      localStorage.removeItem('sm_user');
    }
    // Update subscribers(components watching currentUser$)
    this.currentUserSubject.next(user);
  }
  /**
   * Simulated Login Method using JSON Server.
   *  - Makes a GET requests to fetch user matching username + password
   * - If found, creates a fake token and stores the user.
   * - Returns an observable of the user or null.
   */

  login(username: string, password: string): Observable<User | null> {
    // Build the query URL with credentials
    const url = `${this.api}/users?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => {
        // JSON server returns an array - pick first if found
        const u = users.length ? users[0] : null;
        if (u) {
          // Build payload with fake token
          const payload: User = {
            id: u.id,
            username: u.username,
            role: u.role,
            token: `demo-token-${u.username}`,
            password: '',
          };
          // Store user in localstorage and update subject
          this.storeUser(payload);
          return payload;
        }
        // No matching user --> return null
        return null;
      })
    );
  }
  // Clears stored user
  logout() {
    this.storeUser(null);
  }
  /**
   * Provides the current user value(synchronous access).
   */
  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
  // Simple check to see if user is logged in.
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
  /**
   * Role-based access check
   * Returns true if the current user has the required role.
   */
  isInRole(role: 'admin' | 'user'): boolean {
    return !!this.currentUser && this.currentUser.role === role;
  }
}
