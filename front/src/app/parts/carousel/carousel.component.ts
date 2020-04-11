import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  animations: [
    trigger('slideInOut1', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms linear', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        animate('500ms linear', style({ opacity: '0' }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  constructor() { }

  imgSlides: any = [
    { img: 'https://picsum.photos/1280/720?random=1' },
    { img: 'https://picsum.photos/1280/720?random=2' },
    { img: 'https://picsum.photos/1280/720?random=3' },
  ]

  public xPos: boolean;
  public slides;
  currentSlide = 0;
  startSlider;
  endSlider;
  public carousel: any = document.querySelector('.carousel');
  public moveSlide: any = 0;

  ngOnInit() {
    const delay = 5000; //ms
    this.endSlider = this.imgSlides.length - 1; // останній елемент в масиві
    this.startSlider = this.imgSlides[0]; // 1 елемент в масиві

    setInterval(()=>{
      //this.moveRight()
    },delay)

  }

  sliderWidth() {
    return this.carousel.offsetWidth;
  }

  moveLeft() {
    if (this.currentSlide == 0) this.currentSlide = this.endSlider
    else this.currentSlide--;
  }
  moveRight() {
    if (this.currentSlide == this.endSlider) { //тут оприділяю що в нас наш каунтер дійшов до кінця масиву
      this.currentSlide = 0; // обнуляю каунтер 

    } else this.currentSlide++;  // тут каунтер збільшую 
  }

}



