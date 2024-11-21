import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./BookCard.module.css";

function BookCard({id, title, authorName, description}) {
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/book/${id}`);
  };

  return (
      <div className={style.bookcard}>
        <div className={style.bookcardheader}>
          <div className={style.bookimage}>
            <img src="placeholder.png" alt="Обложка книги"/>
          </div>
          <div className={style.bookinfo}>
            <h2 className={style.booktitle}>{title}</h2>
            <p className={style.bookauthor}>{authorName}</p>
          </div>
          <div className={style.bookrating}>
            <span>3.5</span>
          </div>
        </div>
        <div className={style.bookdescription}>
          <p>{description}</p>
        </div>
        <div className={style.bookactions}>
          <button className={style.btndetails} onClick={handleDetailsClick}>Подробно</button>
          <button className={style.btnfavorite}>Добавить в избранное</button>
          <button className={style.btnremove}>Удалить с избранного</button>
        </div>
      </div>
  )
}

export default BookCard