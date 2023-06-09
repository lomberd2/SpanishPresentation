import {AfterViewInit, Component} from '@angular/core';

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

    // set the audio volume
    audio.volume = 0.05;

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
    const interpret = document.getElementById('interpret') as HTMLSpanElement;
    const audio = document.getElementById('audio') as HTMLAudioElement;
    const original = document.getElementById('original') as HTMLElement;

    interpret.innerText = this.currentSong.artist + ' - ' + this.currentSong.name;
    audio.src = this.currentSong.src;
    // @ts-ignore
    original.href = this.currentSong.url_origin;

    audio.play();
  }

  public static pause() {
    const audio = document.getElementById('audio') as HTMLAudioElement;
    audio.pause();
    this.isPaused = true;
  }

  public static toggleVisibility() {
    if (AudioPlayerComponent.isHidden_) {
      AudioPlayerComponent.show();
    } else {
      AudioPlayerComponent.hide();
    }
  }

  public static hide() {
    AudioPlayerComponent.isHidden_ = true;
  }

  public static show() {
    AudioPlayerComponent.isHidden_ = false;
    this.play();
  }

  public setNextSong(song: Song) {

  }

}

interface Song {
  name: string;
  artist: string;
  url_origin: string;
  src: string;
}
