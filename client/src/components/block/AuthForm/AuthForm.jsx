import React, {  useEffect, useRef, useState } from 'react';
import style from "./AuthForm.module.css";
import axiosInstance, { setAccessToken } from "../../../utils/axiosInstance"
import { useNavigate } from "react-router-dom";
import validPassword from "../../../utils/validPassword";
import { validEmail } from "../../../utils/validEmail";

function AuthForm({type, setUser}) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    isValidEmail: false,
    isValidPassword: 0,
    isRepeatPassword: false
  });
  const navigate = useNavigate();

  const refValidPass = useRef(null);
  const refErrorPass = useRef(null);
  const refInputPass = useRef(null);
  const refErrorRepeatPass = useRef(null);
  const refInputRepeatPass = useRef(null);
  const refErrorEmail = useRef(null);
  const refInputEmail = useRef(null);
  const refServer = useRef(null);

  const refErrorUser = useRef(null);

  const changeHandler = (even) => {
    setInputs((prev) => ({...prev, [even.target.name]: even.target.value}))
    
    if (even.target.type === "email" && type === "signup") {
      setInputs(prev => ({...prev, isValidEmail:validEmail(even.target.value)}));
    }

    if (even.target.type === "password" && type === "signup") {
      refValidPass.current.style.display = "block";
      setInputs((prev) => ({...prev, isValidPassword: validPassword(even.target.value),isRepeatPassword: (refInputPass.current.value === refInputRepeatPass.current.value)}));
    }
  };

  type === "signup" ? useEffect (() => {
  switch(inputs.isValidPassword) {
    case 0:
      refValidPass.current.innerText = "очень слабый";
      refValidPass.current.style.color = "#F00";
      break;
    case 1:
      refValidPass.current.innerText = "слабый";
      refValidPass.current.style.color = "#E51900";
      break;
    case 2:
      refValidPass.current.innerText = "средний";
      refValidPass.current.style.color = "#E8780C";
      break;
    case 3:
      refValidPass.current.innerText = "сильный";
      refValidPass.current.style.color = "#77bf3f";
      break;
    case 4:
      refValidPass.current.innerText = "очень сильный";
      refValidPass.current.style.color = "#2f6307";
      break;
  }
  },[inputs.password]) : false ;

  const blurHandler = (event) => {
    if (event.target.name === "email" && (!inputs.isValidEmail) && type === "signup") {
        refInputEmail.current.style.marginBottom = "0";
        refErrorEmail.current.style.display = "block";
    }

    if (event.target.name === "password" && inputs.isValidPassword < 3) {
        refInputPass.current.style.marginBottom = "0";
        refErrorPass.current.style.display = "block";
    }
    
    if (event.target.name === "repeatPassword" && (refInputRepeatPass.current.value !== refInputPass.current.value)) {
        refInputRepeatPass.current.style.marginBottom = "0";
        refErrorRepeatPass.current.style.display = "block";
    }
  }

  const focusHandler = (event) => {
    if (event.target.name === "email" && type === "signup") {
      refInputEmail.current.style.marginBottom = "1rem";
      refErrorEmail.current.style.display = "none";
    }

    if (event.target.name === "password" && type === "signup") {
      refInputPass.current.style.marginBottom = "1rem";
      refErrorPass.current.style.display = "none";
    }
    
    if (event.target.name === "repeatPassword" && type === "signup") {
      refInputRepeatPass.current.style.marginBottom = "1rem";
      refErrorRepeatPass.current.style.display = "none";
    }

    if (event.target.tagName === "INPUT" && type === "signin") {
      refErrorUser.current.style.display = "none"
      refErrorUser.current.innerText = "";
    }
  }

  const downHandlerShow = (event) => {
    event.target.previousSibling.type = "text";
    event.target.style.backgroundImage = `url("/icons/free-icon-font-eye-crossed-3917753.svg")`
  };

  const  upHandlerShow = (event) => {
    event.target.previousSibling.type = "password";
    event.target.style.backgroundImage = `url("/icons/free-icon-font-eye-3917752.svg")`
  };

  const submitHandler = async (even) => {
    even.preventDefault();

    if (type === "signup" && !(inputs.isValidEmail && (inputs.isValidPassword > 2) && inputs.isRepeatPassword )) {
      return;
    }
      
    const fd = new FormData(even.target);
    type === "signup" ? fd.delete("repeatPassword") : false;
    const urlEncoded = new URLSearchParams(fd).toString();

    const response = await axiosInstance.post(
    `${import.meta.env.VITE_API}/auth/${type}`,
    urlEncoded, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
    }
    ).catch(error =>{
      if (type === "signup") {
        document.querySelector("body").style.pointerEvents = "none"
        refServer.current.children[0].innerText = error.response.data.message;
        refServer.current.style.display = "block"
      } else {
        refErrorUser.current.style.display = "block"
        refErrorUser.current.innerText = error.response.data.message;
      }
    });

    refValidPass.current ? refValidPass.current.style.display = "none" : false;
    if (response) {
      const {user, accessToken } = response.data;
      setInputs({
        name: "",
        email: "",
        password: "",
        isValidEmail: false,
        isValidPassword: 0
      });
      setUser(user);
      setAccessToken(accessToken);
      navigate("/");
    }
  };

  const clickHandlerServer = () => {
    document.querySelector("body").style.pointerEvents = "auto"
    refServer.current.style.display = "none"
  };

  return (
    <>
    <form onSubmit={submitHandler} className={style.wrapper} >
      {type === "signin" && (
        <>
        <div className={style.inputBox}>
          <input onFocus={focusHandler} onChange={changeHandler} type="email" name='email' placeholder='Электронная почта' />
        </div>
        <div className={style.inputBox}>
          <input onFocus={focusHandler} onChange={changeHandler} type="password" name='password' placeholder='Пароль'  />
          <i className={style.iconShow} onMouseDown={downHandlerShow} onMouseUp={upHandlerShow}></i>
        </div>
        <button type='submit'>Вход</button>
        <div ref={refErrorUser} className={style.error}></div>
        </>
      )}
      {type === "signup" && (
        <>
        <div className={style.inputBox}><input onChange={changeHandler} type="text" name='name' placeholder='Имя пользователя' /></div>
        <div className={style.inputBox}>
          <input ref={refInputEmail} onFocus={focusHandler} onBlur={blurHandler} onChange={changeHandler} type="email" name='email' placeholder='Электронная почта' />
        </div>
        <div ref={refErrorEmail} className={style.error}>Некорректный E-mail</div>
        <div ref={refValidPass} className={style.valid}>Очень слабый</div>
        <div className={style.inputBox}>
          <input ref={refInputPass} onFocus={focusHandler} onBlur={blurHandler} onChange={changeHandler} type="password" name='password' placeholder='Пароль' />
          <i className={style.iconShow} onMouseDown={downHandlerShow} onMouseUp={upHandlerShow}></i>
        </div>
        <div ref={refErrorPass} className={style.error}>Введённый пароль недостаточно сложен. Используйте несколько слов, цифры, заглавные буквы.</div>
        <div className={style.inputBox}>
          <input ref={refInputRepeatPass} onFocus={focusHandler} onBlur={blurHandler} onChange={changeHandler} type="password" name='repeatPassword' placeholder='Повтор Пароля' />
          <i className={style.iconShow} onMouseDown={downHandlerShow} onMouseUp={upHandlerShow}></i>
        </div>
        <div ref={refErrorRepeatPass} className={style.error}>Пароли не совпадают.</div>
        <button type='submit'>Регистрация</button>
        </>
      )}
    </form>
    <div ref={refServer} className={style.server}>
      <p></p>
      <button onClick={clickHandlerServer}>закрыть</button>
    </div>
    </>
    
  )
}

export default AuthForm