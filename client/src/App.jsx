import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/pages/MainPage/MainPage"
import SigninPage from "./components/pages/SigninPage/SigninPage";
import SignupPage from "./components/pages/SignupPage/SignupPage";
import Root from "./Root";
import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./utils/axiosInstance";
import ProfilePage from "./components/pages/Profilepage/ProfilePage";

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
          path: "/profile/:id",
          element: <ProfilePage user={user} />
        }
      ]
    },
    {
      path: "/test",
      element:  <MainPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
