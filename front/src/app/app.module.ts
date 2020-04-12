import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Material design modules
import { MatSliderModule } from '@angular/material/slider';

// components
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { CarouselComponent } from './parts/carousel/carousel.component';
import { CarouselTestComponent } from './parts/carousel/carousel-test/carousel-test.component';
import { CardComponent } from './parts/card/card.component';


//services
import { ApiService } from './services/api.service';
import { AuthComponent } from './pages/auth/auth.component';
import { RedirectorComponent } from './pages/redirector/redirector.component';
import { ProductComponent } from './pages/product/product.component';
import { FormValidatorComponent } from './parts/form-validator/form-validator.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    CarouselTestComponent,
    CardComponent,
    AuthComponent,
    RedirectorComponent,
    ProductComponent,
    FormValidatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
