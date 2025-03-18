import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AllBooksComponent } from './pages/book/all-books/all-books.component';
import { EditBookComponent } from './pages/book/edit-book/edit-book.component';
import { NewEmployeeComponent } from './pages/admin/new-admin/new-admin.component';
import { AllAdminsComponent } from './pages/admin/all-admins/all-admins.component';
import { EditAdminComponent } from './pages/admin/edit-admin/edit-admin.component';
import { AllErrandsComponent } from './pages/all-errands/all-errands.component';
import { NewAuthorComponent } from './pages/author/new-author/new-author.component';
import { NewCategoryComponent } from './pages/category/new-category/new-category.component';
import { AllCategoriesComponent } from './pages/category/all-categories/all-categories.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { AllAuthorsComponent } from './pages/author/all-authors/all-authors.component';
import { EditAuthorComponent } from './pages/author/edit-author/edit-author.component';
import { Component } from '@angular/core';
import { NewBookComponent } from './pages/book/new-book/new-book.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "book/new",
        loadComponent: () => import('./pages/book/new-book/new-book.component').then((c) => c.NewBookComponent)
    },
    {
        path: "book/all", component: AllBooksComponent
    },
    {
        path: "book/:code", component: EditBookComponent
    },
    {
        path: "admin/new", component: NewEmployeeComponent
    },
    {
        path: "admin/all", component: AllAdminsComponent
    },
    {
        path: "admin/:id", component: EditAdminComponent
    },
    {
        path: "allErrands",component: AllErrandsComponent
    },
    {
        path: "author/new", component: NewAuthorComponent
    },
    {
        path: "author/all", component: AllAuthorsComponent
    },
    {
        path: "author/:id", component: EditAuthorComponent
    },
    {
        path: "category/new", component: NewCategoryComponent
    },
    {
        path: "category/all", component: AllCategoriesComponent
    },
    {
        path: "category/:id", component: EditCategoryComponent
    }
    
];
