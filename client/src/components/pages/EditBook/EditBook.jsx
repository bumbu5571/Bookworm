import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import EditForm from '../../block/EditForm/EditForm';
import style from "./EditBook.module.css";

function EditBook() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/books/${id}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => {
        console.error(err);
        navigate('/');
      });
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axiosInstance.patch(`${import.meta.env.VITE_API}/books/${id}`, updatedData);
      setBook(response.data.book);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (!book) return <div>Загрузка...</div>;

  return (
    <div className={style.editBookContainer}>
      <h1>Редактировать книгу</h1>
      <EditForm book={book} onUpdate={handleUpdate} />
    </div>
  );
}

export default EditBook;