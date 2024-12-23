import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from './food';
import { Category } from './category';
import { Review } from './review';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userId: any = localStorage.getItem('userId');
  admin: any = localStorage.getItem('isAdmin');
  Url: string = "http://localhost/Senior_php/";

  constructor(private http: HttpClient) { }

  getFood(id: any) {
    return this.http.get<Food[]>(this.Url + 'getFood.php?id=' + id);
  }

  getSingleFood(id: any) {
    return this.http.get<Food[]>(this.Url + 'getSingleFood.php?id=' + id);
  }

  getCategories() {
    return this.http.get<Category[]>(this.Url + 'getCategories.php');
  }

  getSelectedCategory(id: any) {
    return this.http.get<Category[]>(this.Url + 'getSelectedCategory.php?id=' + id);
  }

  getFavorites() {
    return this.http.get<any[]>(this.Url + 'getFavorites.php');
  }

  getOrderUserId(id: any) {
    return this.http.get<any[]>(this.Url + 'getUserId.php?id=' + id);
  }

  getTopUsers() {
    return this.http.get<any[]>(this.Url + 'getTopUsers.php');
  }

  signUp(data: any) {
    return this.http.post(this.Url + 'signUp.php', data);
  }

  login(data: any) {
    return this.http.post(this.Url + 'login.php', data);
  }

  submitReview(data: any) {
    return this.http.post(this.Url + 'submitReview.php', data);
  }

  getUserInfo(id: any) {
    return this.http.get<User>(this.Url + 'getUserInfo.php?id=' + id);
  }

  editItem(data: any) {
    return this.http.post(this.Url + 'edit.php', data);
  }

  editUser(data: any) {
    return this.http.post(this.Url + 'editUser.php', data);
  }

  addItem(data: any) {
    return this.http.post(this.Url + 'addFood.php', data);
  }

  addOrder(data: any) {
    return this.http.post(this.Url + 'addOrder.php', data);
  }

  addOrderPoints(data: any) {
    return this.http.post(this.Url + 'addOrderPoints.php', data);
  }

  deleteItem(id: any) {
    return this.http.get(this.Url + 'delete.php?id=' + id);
  }

  deleteOrder(data: any) {
    return this.http.post(this.Url + 'deleteOrder.php', data);
  }

  deleteOrderDetails(data: any) {
    return this.http.post(this.Url + 'deleteOrderDetail.php', data);
  }

  getFoodRating(id: any) {
    return this.http.get<Food[]>(this.Url + 'getRating.php?id=' + id);
  }

  getReviews(id: any) {
    return this.http.get<Review[]>(this.Url + 'getReview.php?id=' + id);
  }

  getUserReview(data: any) {
    return this.http.post(this.Url + 'getUserReview.php', data);
  }

  editReview(data: any) {
    return this.http.post(this.Url + 'editReview.php', data);
  }

  getBestSeller() {
    return this.http.get<any[]>(this.Url + 'getBestSeller.php');
  }

  getOrders() {
    return this.http.get<any[]>(this.Url + 'getOrders.php');
  }

  getOrderDetails(id: any) {
    return this.http.get<any[]>(this.Url + 'getOrderDetails.php?id=' + id);
  }

  rewardPoints(data: any) {
    return this.http.post(this.Url + 'rewardPoints.php', data);
  }

  deductPoints(data: any) {
    return this.http.post(this.Url + 'deductPoints.php', data);
  }

  checkOut(data: any) {
    return this.http.post(this.Url + 'checkOut.php', data);
  }

  getOrdersByDate(data: any) {
    return this.http.post(this.Url + 'getOrdersByDate.php', data);
  }

  resetOrders() {
    return this.http.get<any[]>(this.Url + 'resetOrders.php');
  }

  getUserId() {
    return parseInt(this.userId, 10);
  }

  isLoggedIn() {
    if (this.userId != null) {
      return true;
    }
    else {
      return false;
    }
  }
  isAdmin() {
    if (this.admin != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
