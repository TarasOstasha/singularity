import { Component, OnInit } from '@angular/core';
//import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  imgSlides: any = [
    { img: 'https://picsum.photos/1280/720?random=1' },
    { img: 'https://picsum.photos/1280/720?random=2' },
    { img: 'https://picsum.photos/1280/720?random=3' },
    { img: 'https://picsum.photos/1280/720?random=4' },
    { img: 'https://picsum.photos/1280/720?random=5' },
    { img: 'https://picsum.photos/1280/720?random=6' },
    { img: 'https://picsum.photos/1280/720?random=7' },
  ]

  currentSlide = 0;
  startSlider;
  nextSlider = null;


  endSlider;
  public carousel: any;

  public slide: any = 0;
  nextSlide: any = 0;
  centerSlideWidth: any;



  ngOnInit() {
    this.carousel = document.querySelector('.carousel');
    console.log(this.slide, 'this.slide ngOnInit')
    const delay = 5000; //ms
    this.endSlider = this.imgSlides.length - 1; // останній елемент в масиві
    this.startSlider = this.imgSlides[0]; // 1 елемент в масиві

    this.centerSlideWidth = this.sliderWidth(); // set full img width
    setInterval(() => {
      //this.moveRight()
    }, delay)

  }

  sliderWidth() {
    return this.carousel.offsetWidth;
  }


  counter: number = 1;
  moveLeft() {
    this.counter--;
    const lastImg = this.imgSlides.length - 1;
    console.log(this.counter)
    this.slide = this.slide + this.sliderWidth();
    if (this.counter == 0) { this.counter = lastImg + 1; return this.slide = -this.sliderWidth() * lastImg; }

    // old staff
    // if (this.currentSlide == 0) this.currentSlide = this.endSlider
    // else this.currentSlide--;
  }
  moveRight() {
    this.counter++
    const lastImg = this.imgSlides.length - 1;
    this.nextSlide = this.sliderWidth();
    this.nextSlider = 1;
    this.nextSlide = 0;
    this.slide = this.slide - this.sliderWidth();

    //console.log(this.counter)

    if (this.counter == 0) {


      console.log(this.slide, 'if move right', this.counter, 'if move right')

    } else if (this.counter = lastImg) {
      console.log(this.slide, 'if move right', this.counter, 'if move right')

    }
    //if(lastImg) this.slide = this.sliderWidth() * this.imgSlides[0];


    // old staff
    //if (this.currentSlide == this.endSlider) { //тут оприділяю що в нас наш каунтер дійшов до кінця масиву
    //this.currentSlide = 0; // обнуляю каунтер 

    //} 
    //else this.currentSlide++;  // тут каунтер збільшую 
  }

  // compare(i) {
  //   //return i == this.currentSlide || i == this.nextSlider 
  // }


}



