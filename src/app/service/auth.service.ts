import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isActive: boolean = false;
  openReg: boolean = false;
  constructor() {}
}
