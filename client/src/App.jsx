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
          element: <UserBooksList setUser={setUser} />
        },
        {
          path: "/createbook",
          element: <BookForm setUser={setUser} />
        },
        {
          path: "/editbook/:id",
          element: <EditBook />
        },
        {
          path: "/profile/:id",
          element: <ProfilePage user={user} />
        },
        {
          path: "/favorites",
          element: <FavoriteBooksList user={user} />
        },
        {
          path: "/book/:id",
          element: <UserBook user={user}/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
