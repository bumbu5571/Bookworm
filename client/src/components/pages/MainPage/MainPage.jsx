import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
// import axios from 'axios';
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

  console.log(books);
  return (
    <>
    <div>MainPage</div>
      <div>Список всех книг:
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

export default MainPage