import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import style from "./UserBook.module.css";

function UserBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, commentsResponse] = await Promise.all([
          axiosInstance.get(`${import.meta.env.VITE_API}/books/${id}`),
          axiosInstance.get(`${import.meta.env.VITE_API}/books/${id}/comments`)
        ]);
        setBook(bookResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
        navigate('/');  // Редирект при ошибке
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleAddComment = () => {
    // Логика добавления комментария
    console.log('Добавление комментария');
  };

  const handleRemoveComment = (commentId) => {
    // Логика удаления комментария
    console.log('Удаление комментария', commentId);
  };

  if (!book) return <div>Загрузка...</div>;

  return (
    <div className={style.userBook}>
      <div className={style.userBookHeader}>
        <div className={style.bookImage}>
          <img src={book.imageUrl || "placeholder.png"} alt="Обложка книги"/>
        </div>
        <div className={style.bookInfo}>
          <h2 className={style.bookTitle}>{book.title}</h2>
          <p className={style.bookAuthor}>{book.authorName}</p>
        </div>
        <div className={style.bookRating}>
          <span>{book.rating}3</span>
        </div>
      </div>
      <div className={style.bookDescription}>
        <p><strong>Жанр:</strong> {book.genre}</p>
        <p><strong>Описание:</strong> {book.description}</p>
      </div>
      <h2>Комментарии</h2>
      {comments.map(comment => (
        <div key={comment.commentId} className={style.comment}>
          <p>{comment.commentText}</p>
          <p><strong>Автор:</strong> {comment.User.name}</p>
          <button 
            className={` ${style.btnRemoveComment}`}
            onClick={() => handleRemoveComment(comment.commentId)}
          >
            Удалить комментарий
          </button>
          <button className={` ${style.btnAddComment}`} onClick={handleAddComment}>
          Добавить комментарий
        </button>
        </div>
      ))}
    </div>
  );
}

export default UserBook;