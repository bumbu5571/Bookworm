import React, { useState } from 'react';
import style from "./CreateForm.module.css";
import axiosInstance from "../../../utils/axiosInstance"
import { useNavigate } from 'react-router-dom';

function CreateForm() {
  const [inputs, setInputs] = useState({
    title: '',
    authorName: '',
    genre: '',
    description: '',
    commentText: '',
    ratingValue: '',
  });
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData();
    for (const name in inputs) {
      fd.append(name, inputs[name]);
    }

    const photo = event.target.photo.files[0];
    if (photo) {
      fd.append('photo', photo);
    }

    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/books`,
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).catch(error => {
      console.error(error);
    });

    if (response && response.status === 200) {
      navigate(`/book/${response.data}`);
    }
  };

  return (
    <div className={style.formcontainer}>
      <h1>Создать книгу</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="book-title">Название книги</label>
        <input
          onChange={changeHandler}
          type="text"
          id="book-title"
          name="title"
          placeholder="Введите название книги"
          required
          value={inputs.title}
        />

        <label htmlFor="author">Автор</label>
        <input
          onChange={changeHandler}
          type="text"
          id="author"
          name="authorName"
          placeholder="Введите имя автора"
          required
          value={inputs.authorName}
        />

        <label htmlFor="genre">Жанр</label>
        <select
          onChange={changeHandler}
          id="genre"
          name="genre"
          required
          value={inputs.genre}
        >
          <option value="" disabled>
            Выберите жанр
          </option>
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

        <label htmlFor="description">Описание</label>
        <textarea
          onChange={changeHandler}
          id="description"
          name="description"
          rows="4"
          placeholder="Введите описание книги"
          required
          value={inputs.description}
        />

        <label htmlFor="comment">Комментарий</label>
        <textarea
          onChange={changeHandler}
          id="comment"
          name="commentText"
          rows="3"
          placeholder="Введите ваш комментарий"
          value={inputs.commentText}
        />

        <label htmlFor="rating">Рейтинг</label>
        <select
          onChange={changeHandler}
          id="rating"
          name="ratingValue"
          required
          value={inputs.ratingValue}
        >
          <option value="" disabled>
            Выберите рейтинг
          </option>
          <option value="1">1 - Плохо</option>
          <option value="2">2 - Удовлетворительно</option>
          <option value="3">3 - Средне</option>
          <option value="4">4 - Хорошо</option>
          <option value="5">5 - Отлично</option>
        </select>

        <label htmlFor="photo">Загрузить фото</label>
        <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" />

        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default CreateForm;