import React, { lazy } from 'react';

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage/ProductDetailsPage"));
const ProductPage = lazy(() => import('../pages/ProductPage/ProductPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage/Profile'));
const OrderPage = lazy(() => import('../pages/OrderPage/OrderPage'));
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess/OrderSuccess"));

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/product/:category',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
];