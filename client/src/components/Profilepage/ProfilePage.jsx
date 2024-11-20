import React, { useEffect, useState } from 'react';
import style from "./ProfilePage.module.css";


function ProfilePage({ user }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if(user?.name) {
      const date = new Date(user.createdAt);

      setDate(date.toLocaleString("ru-RU",{
        dateStyle: 'medium'
      }));

      setTime((date.toLocaleString("ru-RU",{
        timeStyle: 'short',
      })));
    }else {
      setDate("Загружается...");
      setTime("Загружается...");
    }
  },[user])

  return (
    <div className={style.wrapper}>
      <h2>Name: {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Created date: {date} Time: {time}</p>
      <img src={user?.avatar} alt="Avatar user" />
    </div>
  )
}

export default ProfilePage