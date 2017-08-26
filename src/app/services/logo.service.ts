import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LogoService {

  public animation: any;
  public animationSubject: Subject<any> = new Subject();
  public animation$ = this.animationSubject.asObservable();

  constructor() { }

  public playAnimation(speed: number = 1) {
    this.animationSubject.next();
    this.animation.play(speed, this.completed());
  }

  public setAnimation(animation: any) {
    this.animation = animation;
  }

  public stopAnimation() {
    this.animation.stop();
  }

  // This is getting called immediately instead of at the end of the animation,
  // not sure why, just going to use a timeout for now.
  private completed() {
    setTimeout(() => {
      this.animationSubject.complete();
    }, 1000);
  }
}
