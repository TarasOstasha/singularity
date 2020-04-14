import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-test',
  templateUrl: './carousel-test.component.html',
  styleUrls: ['./carousel-test.component.less']
})
export class CarouselTestComponent implements OnInit {

  constructor() { }

  imgSlides: any = [
    { img: 'https://picsum.photos/1280/720?random=1' },
    { img: 'https://picsum.photos/1280/720?random=2' },
    { img: 'https://picsum.photos/1280/720?random=3' },
  ]

  
  currentSlide = 0;
  carouselWidth = this.imgSlides;
  lastSlide = this.imgSlides.length - 1;

  public positionImg = '0px';

  ngOnInit() {
    console.log(this.imgSlides.length)
    const delay = 3000; //ms
    //this.endSlider = this.imgSlides.length - 1; // останній елемент в масиві
    //this.startSlider = this.imgSlides[0]; // 1 елемент в масиві

    // setInterval(()=>{
    //   this.moveRight()
    // },delay)

  }

  moveLeft() {
    const minus = this.currentSlide--;
     console.log(minus)
    if(minus == 0) {
      this.currentSlide = this.lastSlide;
      //alert('start of imgs')
    }

  }

  moveRight() {
    const plus = this.currentSlide++
    console.log(plus)
    if(plus == this.carouselWidth.length-1) {
      this.currentSlide = 0;
      //alert('end of imgs')
    }
  }






}
