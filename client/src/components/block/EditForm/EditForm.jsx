import React, { useState, useEffect } from 'react';
import style from "./EditForm.module.css";

function EditForm({ book, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    genre: '',
    description: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        authorName: book.authorName || '',
        genre: book.genre || '',
        description: book.description || '',
      });
    }
  }, [book, ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className={style.formcontainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book-title">Название книги</label>
        <input
          type="text"
          id="book-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Введите название книги"
          required
        />
        
        <label htmlFor="author">Автор</label>
        <input
          type="text"
          id="author"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          placeholder="Введите имя автора"
          required
        />
        
        <label htmlFor="genre">Жанр</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Выберите жанр</option>
          <option value="Боевик">Боевик</option>
          <option value="Детектив">Детектив</option>
          <option value="Исторический роман">Исторический роман</option>
          <option value="Любовный роман">Любовный роман</option>
          <option value="Мистика">Мистика</option>
          <option value="Приключения">Приключения</option>
          <option value="Триллер">Триллер</option>
          <option value="Научная фантастика">Научная фантастика</option>
          <option value="Фэнтези">Фэнтези</option>
        </select>
        
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Введите описание книги"
          required
        ></textarea>
        
        <label htmlFor="photo">Загрузить фото</label>
        <input type="file" id="photo" name="photo" accept="image/*"/>
        
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
}

export default EditForm;