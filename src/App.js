import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, changeBookAction, deleteBook } from './Redux/BooksSlice';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [changeModalIsOpen, setChangeIsOpen] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [priceEdit, setPriceEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [changeId, setChangeId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [changeBook, setChangeBook] = useState({});
  const [changeTitle, setChangeTitle] = useState(changeBook.title || '');
  const [changePrice, setChangePrice] = useState(changeBook.price || '');
  const [changeCategory, setChangeCategory] = useState(changeBook.category || '');
  const [changeDescription, setChangeDescription] = useState(changeBook.description || '');
  const books = useSelector(state => state.books.items);
  const dispatch = useDispatch();
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const newBook = {
    id: changeId,
    title: changeTitle,
    price: changePrice,
    category: changeCategory,
    description: changeDescription,
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openChangeModal() {
    setChangeIsOpen(true);
  }

  function closeChangeModal() {
    setChangeIsOpen(false);
    setPriceEdit(false);
    setTitleEdit(false);
    setCategoryEdit(false);
    setDescriptionEdit(false);
    dispatch(changeBookAction(newBook));
  }

  const addBookFunction = () => {
    if (title.length > 0 && price > 0 && description.length > 0 && category.length > 0) {
      dispatch(addBook(newBook));
      setTitle('');
      setPrice('');
      setCategory('');
      setDescription('');
      closeModal();
    }
  };

  const openChange = e => {
    if (e.target.localName === 'button') {
      return;
    }
    const id = e.currentTarget.id;
    const bookToChange = books.filter(el => el.id === id);
    setChangeBook(...bookToChange);
    setChangeTitle(bookToChange[0].title);
    setChangePrice(bookToChange[0].price);
    setChangeCategory(bookToChange[0].category);
    setChangeDescription(bookToChange[0].description);
    setChangeId(bookToChange[0].id);
    openChangeModal();
  };

  let titleIsEdit;
  if (titleEdit) {
    titleIsEdit = (
      <>
        <input
          value={changeTitle}
          onChange={e => setChangeTitle(e.target.value)}
          onBlur={() => setTitleEdit(false)}
          className={s.changeInput}
        />
        <button onClick={() => setTitleEdit(false)}>Змінити</button>
      </>
    );
  } else {
    titleIsEdit = <h2 onClick={() => setTitleEdit(true)}>{changeTitle}</h2>;
  }

  let priceIsEdit;
  if (priceEdit) {
    priceIsEdit = (
      <>
        <input
          type="number"
          value={changePrice}
          onChange={e => setChangePrice(e.target.value)}
          onBlur={() => setPriceEdit(false)}
          className={s.changeInput}
        />
        <button onClick={() => setPriceEdit(false)}>Змінити</button>
      </>
    );
  } else {
    priceIsEdit = <p onClick={() => setPriceEdit(true)}>{changePrice} грн</p>;
  }

  let categoryIsEdit;
  if (categoryEdit) {
    categoryIsEdit = (
      <>
        <select
          name="category"
          id="category"
          value={changeCategory}
          onBlur={() => setCategoryEdit(false)}
          onChange={e => setChangeCategory(e.target.value)}
        >
          <option value="Фентезі">Фентезі</option>
          <option value="Сучасні автори">Сучасні автори</option>
          <option value="Наукпоп">Наукпоп</option>
          <option value="Детектив">Детектив</option>
          <option value="Романтична проза">Романтична проза</option>
          <option value="Триллер">Триллер</option>
        </select>
        <button onClick={() => setCategoryEdit(false)}>Змінити</button>
      </>
    );
  } else {
    categoryIsEdit = <p onClick={() => setCategoryEdit(true)}>{changeCategory}</p>;
  }

  let descriptionIsEdit;
  if (descriptionEdit) {
    descriptionIsEdit = (
      <>
        <textarea
          className={s.textarea}
          value={changeDescription}
          onChange={e => setChangeDescription(e.target.value)}
          rows={10}
          onBlur={() => setDescriptionEdit(false)}
        />
        <button onClick={() => setDescriptionEdit(false)}>Змінити</button>
      </>
    );
  } else {
    descriptionIsEdit = <p onClick={() => setDescriptionEdit(true)}>{changeDescription}</p>;
  }
  return (
    <>
      <button type="button" className={s.addBtn} onClick={openModal}>
        Добавити книгу
      </button>
      <ul className={s.booksList}>
        {books.map((el, i) => (
          <li key={i} className={s.likstItem} id={el.id} onClick={openChange}>
            <h3>{el.title}</h3>
            <p>{el.price} грн</p>
            <p>{el.category}</p>
            <p>
              {el.description.length > 20 ? el.description.slice(0, 200) + `...` : el.description}
            </p>
            <button type="button" onClick={() => dispatch(deleteBook(el.id))}>
              Видалити книгу
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Добавити книгу</h2>
        <button onClick={closeModal}>close</button>
        <form className={s.form}>
          <label htmlFor="title">Назва книги: </label>
          <input
            type="text"
            id="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required={true}
          />
          <label htmlFor="price">Ціна: </label>
          <input
            type="number"
            id="price"
            onChange={e => setPrice(e.target.value)}
            value={price}
            required={true}
          />
          <label htmlFor="category">Виберіть категорію:</label>

          <select
            name="category"
            id="category"
            onChange={e => setCategory(e.target.value)}
            required={true}
          >
            <option value="">Виберіть категорію</option>
            <option value="Фентезі">Фентезі</option>
            <option value="Сучасні автори">Сучасні автори</option>
            <option value="Наукпоп">Наукпоп</option>
            <option value="Детектив">Детектив</option>
            <option value="Романтична проза">Романтична проза</option>
            <option value="Триллер">Триллер</option>
          </select>
          <label htmlFor="description">Опис: </label>
          <input
            type="text"
            id="description"
            onChange={e => setDescription(e.target.value)}
            value={description}
            required={true}
          />
        </form>
        <button type="button" onClick={addBookFunction}>
          Добавити книгу
        </button>
      </Modal>
      <Modal
        isOpen={changeModalIsOpen}
        onRequestClose={closeChangeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {changeBook && (
          <div className={s.changeBook}>
            <button onClick={closeChangeModal}>close</button>
            <h2 className={s.changeTitle}>Змінити поля книги</h2>
            {titleIsEdit}
            {priceIsEdit}
            {categoryIsEdit}
            {descriptionIsEdit}
          </div>
        )}
      </Modal>
    </>
  );
}

export default App;
