import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { EntreesComponent } from './entrees/entrees.component';
import { AppetizersComponent } from './appetizers/appetizers.component';
import { DrinksComponent } from './drinks/drinks.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { DessertsComponent } from './desserts/desserts.component';
import { ProductsComponent } from './products/products.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutPointsComponent } from './about-points/about-points.component';
import { ReviewComponent } from './review/review.component';
import { DataService } from './data.service';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddFoodComponent } from './add-food/add-food.component';
import { EditItemsComponent } from './edit-items/edit-items.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { CheckReviewsComponent } from './check-reviews/check-reviews.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    EntreesComponent,
    AppetizersComponent,
    DrinksComponent,
    AdminDashboardComponent,
    AboutComponent,
    FooterComponent,
    DessertsComponent,
    ProductsComponent,
    AccountsComponent,
    AddComponent,
    EditComponent,
    LoginComponent,
    SignupComponent,
    AboutPointsComponent,
    ReviewComponent,
    OrderComponent,
    CheckoutComponent,
    AddFoodComponent,
    EditItemsComponent,
    AdminNavigationComponent,
    CheckReviewsComponent,
    EditUserComponent,
    OrderdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
