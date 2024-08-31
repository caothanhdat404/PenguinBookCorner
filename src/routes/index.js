import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from '../pages/ProductPage/ProductPage';
import ProfilePage from '../pages/ProfilePage/Profile'

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
        path: '/product-detail',
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
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
]
