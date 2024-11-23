import style from "./MainPage.module.css"
import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import BookCard from '../../block/BookCard/BookCard'

function MainPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
        setBooks([]);
      });
  }, []);

  return (
    <>
      <div className={style.wrapper}>
        <h2>Список книг:</h2>
      {books.map((book) => (
        <BookCard
          key={book.bookId}
          id={book.bookId}
          title={book.title}
          authorName={book.authorName}
          description={book.description}
          genre={book.genre}
          bookImg={book.bookImg}
        />
      ))}
      </div>
    </>
  )
}

export default MainPage