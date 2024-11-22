import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/pages/MainPage/MainPage"
import SigninPage from "./components/pages/SigninPage/SigninPage";
import SignupPage from "./components/pages/SignupPage/SignupPage";
import Root from "./Root";
import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./utils/axiosInstance";
import ProfilePage from "./components/pages/Profilepage/ProfilePage";
import UserBook from "./components/pages/UserBook/UserBook";
import BookForm from "./components/pages/BookForm/BookForm";
import FavoriteBooksList from "./components/pages/FavoriteBooksList/FavoriteBooksList";
import UserBooksList from "./components/pages/UserBookList/UserBooksList";
import EditBook from "./components/pages/EditBook/EditBook";
import PrivateRoute from './PrivateRoute';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/tokens/refresh`)
    .then( async (res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    })
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <MainPage user={user} />,
        },
        {
          path: "/signin",
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: "/signup",
          element: <SignupPage setUser={setUser} />
        },
        {
          path: "/userbooks",
          element: <PrivateRoute><UserBooksList setUser={setUser} /></PrivateRoute>
        },
        {
          path: "/createbook",
          element: <PrivateRoute><BookForm setUser={setUser} /></PrivateRoute>
        },
        {
          path: "/editbook/:id",
          element: <PrivateRoute><EditBook /></PrivateRoute>
        },
        {
          path: "/profile/:id",
          element: <PrivateRoute><ProfilePage user={user} /></PrivateRoute>
        },
        {
          path: "/favorites",
          element: <PrivateRoute><FavoriteBooksList user={user} /></PrivateRoute>
        },
        {
          path: "/book/:id",
          element: <PrivateRoute><UserBook user={user}/></PrivateRoute>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
