import React from 'react';
import style from "./BookCard.module.css";



function BookCard(){


return (
      <>
        <div className={style.bookcard}>
        <div className={style.bookcardheader}>
          <div className={style.bookimage}>
            <img src="placeholder.png" alt="Обложка книги"/>
          </div>
          <div className={style.bookinfo}>
            <h2 className={style.booktitle}>Топор в каше</h2>
            <p className={style.bookauthor}>Лебедев П.А.</p>
          </div>
          <div className={style.bookrating}>
            <span>3.2</span>
          </div>
        </div>
        <div className={style.bookdescription}>
          <p>Краткое описание (первые 100 символов комментария)</p>
        </div>
        <div className={style.bookactions}>
          <button className={style.btndetails}>Подробно</button>
          <button className={style.btnfavorite}>Добавить в избранное</button>
          <button className={style.btnremove}>Удалить с избранного</button>
        </div>
      </div>
      </>
  )
}

export default BookCard