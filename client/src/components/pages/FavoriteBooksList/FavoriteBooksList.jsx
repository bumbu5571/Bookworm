
// import style from "./FavoriteBooksList.css"
import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import BookCard from '../../block/BookCard/BookCard'

function FavoriteBooksList() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/favorites`)
      .then((res) => {
        setFavs(res.data)
      })
      .catch((err) => {
        console.error(err);
        setFavs([])
      });
  }, []);

  console.log(favs);

  return (
    <>
    <h2>Избранное:</h2>
      <div>
        {favs.map((el) => (
          <BookCard
            key={el.Book.id} 
            id={el.Book.bookId} 
            title={el.Book.title}
            authorName = {el.Book.authorName}        
            description = {el.Book.description}  
            genre = {el.Book.genre}
          />
        ))}
      </div>
    </>
  )
}

export default FavoriteBooksList