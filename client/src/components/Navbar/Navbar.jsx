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
  <div className={style.links}>
    <img src='../../../public/icons/boookworm_logo.jpeg' alt="site logo" className={style.logo}/>
    <Link to="/">Главная страница</Link>
  </div>

  <div className={style.userSection}>
    {user?.name ? (
      <div className={style.userInfo}>
        <Link to="/userbooks">Мои книги</Link>
        <Link to="/favorites">Избранное</Link>
        <Link to={`/profile/${user?.id}`} className={style.profileLink}>
          {user?.name}
          <img src={user?.avatar} alt="Avatar user" className={style.avatar} />
        </Link>
        <Link onClick={logoutHandler} className={style.logout}>
          Выйти
        </Link>
      </div>
    ) : (
      <div className={style.authLinks}>
        <Link to="/signup">Регистрация</Link>
        <Link to="/signin">Войти</Link>
      </div>
    )}
  </div>
</nav>
  )
}

export default Navbar