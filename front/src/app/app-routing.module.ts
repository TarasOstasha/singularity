import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RedirectorComponent } from './pages/redirector/redirector.component';
import { ProductComponent } from './pages/product/product.component';
import { BasketComponent } from './parts/basket/basket.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'redirector', component: RedirectorComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'basket', component: BasketComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
