import React, { Fragment, useEffect, useState, Suspense } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from './services/UserService';
import { updateUser } from './redux/user/userSlice';
import { isJsonString } from "./utils";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }
      setIsLoading(false);
  }, []);

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => {
                const Page = route.page;
                const isPermission = !route.isPrivate || user.isAdmin;
                const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                return (
                  <Route
                    key={route.path}
                    path={isPermission && typeof route.path === 'string' ? route.path : undefined}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </Suspense>
        </Router>
      </Loading>
    </div>
  );
}

export default App;