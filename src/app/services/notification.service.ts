import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  overrideNotifications = false;

  constructor() { }

  notify(message: string){
    if (this.notificationsOn()) {
      const notification = new Notification(message);
    }
  }

  notifyMe() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      this.overrideNotifications = true;
      return;
    }
    // Let's check whether notification permissions have already been granted
     if (this.notificationsOn()) {
      // If it's okay let's create a notification
      this.overrideNotifications = true;
      return;
    }

    // Otherwise, we need to ask the user for permission
    if (!this.notificationsOn()) {
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification('Notifications on!');
        }
        else{
          alert('Notifications denied');
        }
        this.overrideNotifications = false;
        return;
      });
    }
  }

  notificationsOn(): any {
    if (Notification.permission.toLowerCase() === 'granted' && this.overrideNotifications === false) {
      return true;
    }
    if (Notification.permission.toLowerCase() === 'denied' || this.overrideNotifications === true) {
      return false;
    }
    else{
      return null;
    }
  }
}
