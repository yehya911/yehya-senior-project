import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { EntreesComponent } from './entrees/entrees.component';
import { AppetizersComponent } from './appetizers/appetizers.component';
import { DessertsComponent } from './desserts/desserts.component';
import { DrinksComponent } from './drinks/drinks.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutPointsComponent } from './about-points/about-points.component';
import { ReviewComponent } from './review/review.component';
import { OrderComponent } from './order/order.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsComponent } from './products/products.component';
import { CheckReviewsComponent } from './check-reviews/check-reviews.component';
import { EditComponent } from './edit/edit.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "menu", component: MenuComponent },
  { path: "about", component: AboutComponent },
  { path: "appetizers/:id", component: AppetizersComponent },
  { path: "entrees/:id", component: EntreesComponent },
  { path: "desserts/:id", component: DessertsComponent },
  { path: "drinks/:id", component: DrinksComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "aboutpoints", component: AboutPointsComponent },
  { path: "review/:id", component: ReviewComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "order/:id", component: OrderComponent },
  { path: "admindashboard", component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: "all", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "topusers", component: AccountsComponent, canActivate: [AuthGuard] },
  { path: "addfood", component: AddFoodComponent, canActivate: [AuthGuard] },
  { path: "checkreviews/:id", component: CheckReviewsComponent, canActivate: [AuthGuard] },
  { path: "edit/:id", component: EditComponent, canActivate: [AuthGuard] },
  { path: "editAccount", component: EditUserComponent },
  { path: "orderdetails/:id", component: OrderdetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
