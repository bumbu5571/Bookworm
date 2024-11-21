import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from "./Navbar.module.css"
import axiosInstance, { setAccessToken } from "../../utils/axiosInstance"

function Navbar({ user, setUser}) {
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken("");
      navigate("/");
    }
  };

  return (
    <nav className={style.wrapper}>
      <ul>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li className={style.mainPage}>
          <Link to="/" >Главная страница</Link>
        </li>
        {user?.name ? (
          <>
            <li>
              <Link to={`/profile/${user?.id}`} >{user?.name} <img src={user?.avatar} alt="Avatar user" /></Link>
            </li>
            <li>
              <Link onClick={logoutHandler}>Выйти</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Регистрация</Link>
            </li>
            <li>
              <Link to="/signin">Войти</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar