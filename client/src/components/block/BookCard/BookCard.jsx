import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import style from "./BookCard.module.css";

function BookCard({id, title, authorName, description, onFavoriteRemove}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookRating, setBookRating] = useState(0);
  const imagePath = `/pik/${id}.png`;

  const handleDetailsClick = () => {
    navigate(`/book/${id}`);
  };

  //подсчет среднего рейтинга книги
  const fetchBookRating = async () => {
    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API}/books/${id}/ratings`);
      const ratings = response.data;
      if (ratings.length > 0) {
        const averageRating = (ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length).toFixed(1);
        setBookRating(averageRating);
      }
    } catch (error) {
      console.error('Error fetching book rating:', error);
    }
  };
  
  useEffect(() => {
    fetchBookRating();
  }, [id]);
  
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API}/favorites`);
        const favorites = response.data;
        setIsFavorite(favorites.some(fav => fav.bookId === id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavoriteStatus();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      await axiosInstance.post(`${import.meta.env.VITE_API}/favorites`, { bookId: id });
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
  const handleRemoveFromFavorites = async () => {
    try {
      await axiosInstance.delete(`${import.meta.env.VITE_API}/favorites/${id}`);
      setIsFavorite(false);
      if (onFavoriteRemove) {
        onFavoriteRemove(id);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  

  return (
    <>
      <div className={style.bookcard}>
        <div className={style.bookcardheader}>
          <div className={style.bookimage}>
            <img 
              src={imagePath} 
              alt="Обложка книги"
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: 'pointer' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/pik/default.png"
              }}
            />
          </div>
          <div className={style.bookinfo}>
            <h2 className={style.booktitle}>{title}</h2>
            <p className={style.bookauthor}>{authorName}</p>
          </div>
          <div className={style.bookrating}>
            <span>{bookRating}</span>
          </div>
        </div>
        <div className={style.bookdescription}>
          <p>{description}</p>
        </div>
        <div className={style.bookactions}>
          <button className={style.btndetails} onClick={handleDetailsClick}>Подробно</button>
          {!isFavorite ? (
            <button className={style.btnfavorite} onClick={handleAddToFavorites}>
              Добавить в избранное
            </button>
          ) : (
            <button className={style.btnremove} onClick={handleRemoveFromFavorites}>
              Удалить из избранного
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div 
          className={style.modal}
          onClick={() => setIsModalOpen(false)}
        >
          <div className={style.modalContent}>
            <img 
              src={imagePath}
              alt="Увеличенная обложка"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;