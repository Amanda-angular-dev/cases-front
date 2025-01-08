import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RememberUserAndPassService {

  rememberUserAndPassword(remember:boolean | null,user:string, password:string){
    if (remember) {
       this.saveUserAndPassword(user,password)
    } else {
       this.cleanLocalstorage()
    }
  }
  saveUserAndPassword(user:string, password:string){
    localStorage.setItem('user',user);
    localStorage.setItem('password',password);
  }
  cleanLocalstorage(){
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  }
  
  checkLogin(){
    const user=localStorage.getItem('user');
    const password=localStorage.getItem('password');
    if(user&&password){
      return true
    }
    else{
      return false
    }

  }
}
