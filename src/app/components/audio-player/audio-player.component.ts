import {AfterViewInit, Component} from '@angular/core';
import {Song} from "../../interfaces/song";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent  implements AfterViewInit {

  private static readonly playList: Song[] = [
    {
      name: 'Celebrations',
      artist: 'Andres Cantu',
      url_origin: 'https://www.youtube.com/watch?v=bJZ-cAxigts',
      src: 'assets/audio/Celebrations.mp3'
    } as Song,
  ];

  public static currentSong: Song = AudioPlayerComponent.playList[0];
  public static isPlaying_ = false;

  protected static isPaused = false;
  protected static isHidden_ = false;

  get isHidden() {
    return AudioPlayerComponent.isHidden_;
  }

  get isPlayerPaused() {
    return AudioPlayerComponent.isPaused;
  }

  get isPlaying() {
    return AudioPlayerComponent.isPlaying_;
  }

  ngAfterViewInit() {
    // get the audio element with id audio
    const audio = document.getElementById('audio') as HTMLAudioElement;



    // get an interaction of the user with the document first
    document.addEventListener('click', () => {
      // check if the audio is locked
      if (!AudioPlayerComponent.isPlaying_) {
        // play the audio
        AudioPlayerComponent.play();
        AudioPlayerComponent.isPlaying_ = true;
      }
    });
  }

  public static play() {
    try {
      const interpret = document.getElementById('interpret') as HTMLSpanElement;
      const audio = document.getElementById('audio') as HTMLAudioElement;
      const original = document.getElementById('original') as HTMLElement;

      // set the audio volume
      audio.volume = 0.05;

      interpret.innerText = this.currentSong.artist + ' - ' + this.currentSong.name;
      audio.src = this.currentSong.src;
      // @ts-ignore
      original.href = this.currentSong.url_origin;

      audio.play();
    } catch (e) {
      console.log(e);
    }
  }

  public static pause() {
    try {
      const audio = document.getElementById('audio') as HTMLAudioElement;
      audio.pause();
      this.isPaused = true;
    } catch (e) {
      console.log(e);
    }
  }

  public static toggleVisibility() {
    if (this.isHidden_) {
      this.show();
    } else {
      this.hide();
    }
  }

  public static hide() {
    this.isHidden_ = true;
  }

  public static show() {
    this.isHidden_ = false;

    setTimeout(() => {
      this.play();
    }, 250);
  }

  public static setNextSong(song: Song) {
    this.currentSong = song;
  }

}
