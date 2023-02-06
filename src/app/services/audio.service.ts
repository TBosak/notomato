import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public soundFile;
  public soundEnabled;

  constructor() { }

  playAudio(): void {
    if (this.soundEnabled) {
      const audio = new Audio();
      audio.src = `${this.soundFile}`;
      audio.load();
      audio.play();
    }
  }
}
