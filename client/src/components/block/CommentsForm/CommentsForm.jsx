import React from 'react';
import style from "./CommentsForm.module.css";



function CommentsForm(){

return(
    <>
    <div className={style.formcontainer}>
      <h1>Оставить комментарий</h1>
      <form action="/submit-comment" method="post">
        <label for="comment">Ваш комментарий</label>
        <textarea id="comment" name="comment" rows="5" placeholder="Введите ваш комментарий" required></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
    </>
)
}

export default CommentsForm