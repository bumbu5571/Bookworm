import React from 'react';
import style from "./CreateForm.module.css";



function CreateForm(){

return(
  <div className={style.formcontainer}>
    <h1>Редактировать книгу</h1>
    <form action="/submit" method="post" enctype="multipart/form-data">
      <label for="book-title">Название книги</label>
      <input type="text" id="book-title" name="book-title" placeholder="Введите название книги" required/>

      <label for="author">Автор</label>
      <input type="text" id="author" name="author" placeholder="Введите имя автора" required/>

      <label for="description">Описание</label>
      <textarea id="description" name="description" rows="4" placeholder="Введите описание книги" required></textarea>

      <label for="comment">Комментарий</label>
      <textarea id="comment" name="comment" rows="3" placeholder="Введите ваш комментарий"></textarea>

      <label for="rating">Рейтинг</label>
      <select id="rating" name="rating" required>
        <option value="" disabled selected>Выберите рейтинг</option>
        <option value="1">1 - Плохо</option>
        <option value="2">2 - Удовлетворительно</option>
        <option value="3">3 - Средне</option>
        <option value="4">4 - Хорошо</option>
        <option value="5">5 - Отлично</option>
      </select>

      <label for="photo">Загрузить фото</label>
      <input type="file" id="photo" name="photo" accept="image/*"/>

      <button type="submit">Обновить</button>
    </form>
  </div>
  )
}

export default CreateForm