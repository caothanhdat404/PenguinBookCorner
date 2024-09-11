import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from '../pages/ProductPage/ProductPage';
import ProfilePage from '../pages/ProfilePage/Profile'
import OrderPage from '../pages/OrderPage/OrderPage'
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrder from "../pages/MyOrder/MyOrder";

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
        path: '/my-order',
        page: MyOrder,
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
]
