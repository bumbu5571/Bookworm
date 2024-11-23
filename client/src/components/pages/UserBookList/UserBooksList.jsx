import React, { useEffect, useState } from 'react'
import style from "./UserBooksList.module.css"
import axiosInstance from '../../../utils/axiosInstance';
import BookCard from '../../block/BookCard/BookCard';

function UserBooksList({user}) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get(
      `${import.meta.env.VITE_API}/books/user`).then(response => setBooks(response.data)).catch(error => setBooks([]));
  },[])
  console.log(books)
  return (
      <>
      <div className={style.wrapper}>
      <h2>Мои книги:</h2>
      {books.map((el) => (
          <BookCard 
            key={el.id} 
            id={el.bookId} 
            title={el.title}
            authorName = {el.authorName}        
            description = {el.description}  
            genre = {el.genre}
            bookImg={el.bookImg}
          />
        ))}
      </div>
      </>
  )
}

export default UserBooksList