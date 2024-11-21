import React, { useState } from 'react';
import style from "./CreateForm.module.css";
import axiosInstance from "../../../utils/axiosInstance"
import { useNavigate } from 'react-router-dom';

function CreateForm(){
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const changeHandler = (even) => {
    setInputs((prev) => ({...prev, [even.target.name]: even.target.value}))
  }
  
  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    fd.delete("photo")
    const urlEncoded = new URLSearchParams(fd).toString();

    const response = await axiosInstance.post(
    `${import.meta.env.VITE_API}/books`,
    urlEncoded, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
    }
    ).catch(error =>{
      console.error(error)
    });
    if (response.status === 200) {
      navigate("/")
    }
  };

return(
  <div className={style.formcontainer}>
    <h1>Создать книгу</h1>
    <form onSubmit={submitHandler}>
      <label for="book-title">Название книги</label>
      <input onChange={changeHandler} type="text" id="book-title" name="title" placeholder="Введите название книги" required/>

      <label for="author">Автор</label>
      <input onChange={changeHandler} type="text" id="author" name="authorName" placeholder="Введите имя автора" required/>

      <label for="genre">Жанр</label>
      <select onChange={changeHandler} id="genre" name="genre" required>
        <option value="" disabled selected>Выберите жанр</option>
        <option value="Боевик">Боевик</option>
        <option value="Детектив">Детектив</option>
        <option value="Исторический роман">Исторический роман</option>
        <option value="Любовный роман">Любовный роман</option>
        <option value="Мистика">Мистика</option>
        <option value="Приключения">Приключения</option>
        <option value="Триллер">Триллер</option>
        <option value="Научная фантастика">Научная фантастика</option>
        <option value="Фэнтези">Фэнтези</option>
      </select>

      <label for="description">Описание</label>
      <textarea onChange={changeHandler} id="description" name="description" rows="4" placeholder="Введите описание книги" required></textarea>

      <label for="comment">Комментарий</label>
      <textarea onChange={changeHandler} id="comment" name="commentText" rows="3" placeholder="Введите ваш комментарий"></textarea>

      <label for="rating">Рейтинг</label>
      <select onChange={changeHandler} id="rating" name="ratingValue" required>
        <option value="" disabled selected>Выберите рейтинг</option>
        <option value="1">1 - Плохо</option>
        <option value="2">2 - Удовлетворительно</option>
        <option value="3">3 - Средне</option>
        <option value="4">4 - Хорошо</option>
        <option value="5">5 - Отлично</option>
      </select>

      <label for="photo">Загрузить фото</label>
      <input type="file" id="photo" name="photo" accept="image/*"/>

      <button type="submit">Создать</button>
    </form>
  </div>
  )
}

export default CreateForm