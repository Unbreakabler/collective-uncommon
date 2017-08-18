import { Component, OnInit, ViewChild } from '@angular/core';
import * as Vivus from 'vivus';
import { LogoService } from '../services/logo.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @ViewChild('COLLECTIVE') collectivePath: any;
  public collective: any = {
    fill: 'none',
    stroke: '#FFFFFF',
  };
  public uncommon: any = {
    fill: 'none',
    stroke: '#FFFFFF',
  };

  constructor(
    private logoService: LogoService
  ) { }

  ngOnInit() {
    this.logoService.setAnimation(new Vivus('my-svg', {duration: 200}));
    setTimeout(() => {
      this.logoService.stopAnimation();
    }, 1200);
    this.logoService.animation$.subscribe(() => {
      console.log('this.logoService.animation');
      this.collective.fill = '#FFFFFF';
      this.collective.stroke = 'none';
      this.uncommon.fill = '#FFFFFF';
      this.uncommon.stroke = 'none';
    });
  }

}
