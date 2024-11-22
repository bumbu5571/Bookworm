import React, { useEffect, useState } from 'react'
import style from "./UserBooksList.module.css"
import axiosInstance from '../../../utils/axiosInstance';
import BookCard from '../../block/BookCard/BookCard';

function UserBooksList({user}) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get(
      `${import.meta.env.VITE_API}/books/user`).then(response => setBooks(response.data)).catch(error => console.error(error));
  },[])

  return (
      <>
      <div className={style.wrapper}>
        Мои книги
      {books.map((el) => (
          <BookCard 
            key={el.id} 
            title={el.title}
            authorName = {el.authorName}        
            description = {el.description}  
            genre = {el.genre}
          />
        ))}
      </div>
      </>
  )
}

export default UserBooksList