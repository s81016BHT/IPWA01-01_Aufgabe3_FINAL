import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;

  constructor() {
    this.socket = io("wss://127.0.0.1");
  }
  
  listen(event : string){
    if(this.socket.hasListeners(event)) this.socket.removeListener(event);

    let observer = new Observable((subscriber) => {
      this.socket.on(event,(data : any) => {
        subscriber.next(data);
      });
    });

    return observer;
  }

  emit(event : string, data : any){
    this.socket.emit(event,data);
  }
}
