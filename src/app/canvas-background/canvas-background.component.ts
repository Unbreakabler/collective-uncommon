import { Component, OnInit, ViewChild, Input, Renderer2, ElementRef } from '@angular/core';
import { LogoService } from '../services/logo.service';

@Component({
  selector: 'app-canvas-background',
  templateUrl: './canvas-background.component.html',
  styleUrls: ['./canvas-background.component.css'],
})
export class CanvasBackgroundComponent implements OnInit {

  @Input() particleCount = 150;

  private mouseX = 0;
  private mouseY = 0;
  private windowHalfX = window.innerWidth / 2;
  private windowHalfY = window.innerHeight / 2;
  private SEPARATION = 200;
  private AMOUNTX = 1;
  private AMOUNTY = 1;
  private camera;
  private scene;
  private renderer;
  private step = 0;
  private gradientInterval;
  private THREE = (window as any).THREE;
  @ViewChild('canvas') container: ElementRef;

  constructor(
    private ngRenderer: Renderer2,
    private elementRef: ElementRef,
    private logoService: LogoService,
  ) {}

  ngOnInit() {
    const separation = 1000;
    const amountX = 50;
    const amountY = 50;
    const color = 0xffffff;
    let particle;

    this.camera = new this.THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 100;

    this.scene = new this.THREE.Scene();

    this.renderer = new this.THREE.CanvasRenderer({ alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor( 0x000000, 0 );   // canvas background color
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container.nativeElement.appendChild( this.renderer.domElement );

    const PI2 = Math.PI * 2;
    const material = new this.THREE.SpriteCanvasMaterial( {
      color: color,
      opacity: 0.5,
      program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();
      }
    });

    const geometry = new this.THREE.Geometry();

    /*
     *   Number of particles
     */
    for ( let i = 0; i < this.particleCount; i ++ ) {
        particle = new this.THREE.Sprite( material );
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar( Math.random() * 10 + 600 );
        particle.scale.x = particle.scale.y = 5;
        this.scene.add( particle );
        geometry.vertices.push( particle.position );

    }
    const line = new this.THREE.Line( geometry, new this.THREE.LineBasicMaterial( { color: color, opacity: 0.2 } ) );
    this.scene.add( line );

    this.ngRenderer.listen('window', 'touchstart', this.onDocumentTouchStart);
    this.ngRenderer.listen('window', 'touchmove', this.onDocumentTouchMove);
    this.ngRenderer.listen('window', 'mousemove', this.onDocumentMouseMove);
    this.ngRenderer.listen('window', 'resize', this.onWindowResize);

    this.animate();

    this.logoService.animation$.subscribe(() => {
      this.toggleGradient(0.01);
    });
  }

  private onWindowResize = (): void => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  private onDocumentMouseMove = (event: MouseEvent): void => {
    this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
    this.mouseY = (event.clientY - this.windowHalfY) * 0.2;
  }

  private onDocumentTouchStart = (event: TouchEvent): void => {
    if ( event.touches.length > 1 ) {
      event.preventDefault();
      this.mouseX = (event.touches[ 0 ].pageX - this.windowHalfX) * 0.7;
      this.mouseY = (event.touches[ 0 ].pageY - this.windowHalfY) * 0.7;
    }
  }

  private onDocumentTouchMove = (event: TouchEvent): void => {
      if ( event.touches.length === 1 ) {
          event.preventDefault();
          this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
          this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
      }
  }

  //

  private animate(): any {
      requestAnimationFrame(() => { this.animate(); });
      this.render();
  }

  private render(): void {
      this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.1;
      this.camera.position.y += ( - this.mouseY + 200 - this.camera.position.y ) * 0.05;
      this.camera.lookAt(this.scene.position);
      this.renderer.render(this.scene, this.camera);
  }

  private toggleGradient(gradientSpeed: number = 0.002): void {
    const colors = new Array(
      [0, 0, 0],
      [198, 244, 255],
      [241, 123, 123],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    );

    // black and grey
    // const colors = new Array(
    //   [0, 0, 0],
    //   [10, 10, 10],
    //   [20, 20, 20],
    //   [30, 30, 30],
    // );

    // color table indices for:
    // current color left
    // next color left
    // current color right
    // next color right
    const colorIndices = [0, 1, 2 , 3];

    this.gradientInterval = setInterval(() => { this.updateGradient(colors, colorIndices, gradientSpeed); }, 10);
  }

  private updateGradient(colors, colorIndices, gradientSpeed): void  {
    const c0_0 = colors[colorIndices[0]];
    const c0_1 = colors[colorIndices[1]];
    const c1_0 = colors[colorIndices[2]];
    const c1_1 = colors[colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
    const g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
    const b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
    const g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
    const b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    console.log(color1, color2);

    if (color1 === 'rgb(0,0,0)' && color2 === 'rgb(0,0,0)') {
      clearInterval(this.gradientInterval);
    }

    this.ngRenderer.setStyle(
      this.container.nativeElement,
      'background',
      '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))'
    );
    this.ngRenderer.setStyle(
      this.container.nativeElement,
      'background',
      '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'
    );

    this.step += gradientSpeed;
    if ( this.step >= 1 ) {
      this.step %= 1;
      colorIndices[0] = colorIndices[1];
      // colorIndices[1] = colorIndices[2];
      colorIndices[2] = colorIndices[3];
      // colorIndices[3] = colorIndices[0];

      // pick two new target color indices
      // do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

    }
  }
}
