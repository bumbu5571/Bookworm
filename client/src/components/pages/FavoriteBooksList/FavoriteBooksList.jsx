import style from "./FavoriteBooksList.module.css"
import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import BookCard from '../../block/BookCard/BookCard'

function FavoriteBooksList() {
  const [favs, setFavs] = useState([]);
  
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/favorites`)
      .then((res) => {
        setFavs(res.data)
      })
      .catch((err) => {
        setFavs([])
      });
  };

  const handleFavoriteRemove = (removedId) => {
    setFavs(prevFavs => prevFavs.filter(fav => fav.Book.bookId !== removedId));
  };

  return (
    <>
      <div className={style.wrapper}>
        <h2 className={style.wrapper}>Избранное:</h2>
        {favs.map((el) => (
          <BookCard
            key={el.Book.id} 
            id={el.Book.bookId}
            title={el.Book.title}
            authorName={el.Book.authorName}
            description={el.Book.description}
            genre={el.Book.genre}
            onFavoriteRemove={handleFavoriteRemove}
          />
        ))}
      </div>
    </>
  );
}

export default FavoriteBooksList