import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model'; 

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class AuthService {

  constructor() {}
  /**
   * Realiza login fictício comparando credenciais com localStorage.
   * Retorna Observable<boolean> para manter compatibilidade com APIs futuras.
   */
  login(username: string, password: string): Observable<boolean> {
    const users = this.getRegisteredUsers(); // Recupera todos os usuários cadastrados
    const userFound = users.find(user =>
      user.username === username && user.password === password
    );

    if (userFound) {
      // Salva usuário logado no localStorage (simulando sessão)
      localStorage.setItem('currentUser', JSON.stringify(userFound));
      return of(true); // Retorna sucesso como Observable
    }

    return of(false); // Retorna falha
  }

  //Registra novo usuário localmente, evitando duplicidade. Também usa Observable para facilitar futura conexão com API.
  register(username: string, email: string, password: string): Observable<boolean> {
    const users = this.getRegisteredUsers();

    // Verifica campos obrigatórios antes de prosseguir
    if (!username || !email || !password) {
      return of(false); // Falha por campos vazios
    }

    // Verifica se nome ou email já existem
    const alreadyExists = users.some(user =>
      user.username === username || user.email === email
    );
    if (alreadyExists) return of(false); // Não registra se já existir

    // Cria novo usuário e salva na lista
    const newUser: User = { username, email, password };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    return of(true); // Retorna sucesso
  }

  //Remove a sessão ativa do usuário.
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  //Verifica se há usuário logado.
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  //Retorna dados do usuário atualmente logado.
  getCurrentUser(): User | null {
    const userJSON = localStorage.getItem('currentUser');
    return userJSON ? JSON.parse(userJSON) : null;
  }

  //Recupera a lista de usuários cadastrados no localStorage. Função auxiliar interna.
  private getRegisteredUsers(): User[] {
    const usersJSON = localStorage.getItem('registeredUsers');
    return usersJSON ? JSON.parse(usersJSON) : [];
  }
}
