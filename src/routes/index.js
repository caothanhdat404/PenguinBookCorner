import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]
