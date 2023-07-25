import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, changeBookAction, deleteBook } from './Redux/BooksSlice';
import Modal from 'react-modal';
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

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
    if (
      e.target.localName === 'button' ||
      e.target.localName === 'path' ||
      e.target.localName === 'svg'
    ) {
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
      <div className={s.changeBox}>
        <input
          value={changeTitle}
          onChange={e => setChangeTitle(e.target.value)}
          className={s.changeInput}
        />
        <button onClick={() => setTitleEdit(false)}>Змінити</button>
      </div>
    );
  } else {
    titleIsEdit = (
      <div className={s.changeBox}>
        <h2>{changeTitle}</h2>
        <button onClick={() => setTitleEdit(true)} className={s.changeBtn}>
          {AiFillEdit()}
        </button>
      </div>
    );
  }

  let priceIsEdit;
  if (priceEdit) {
    priceIsEdit = (
      <div className={s.changeBox}>
        <input
          type="number"
          value={changePrice}
          onChange={e =>
            e.target.value < 0
              ? window.alert('Ціна за книгу має бути числом більше за 0')
              : setChangePrice(e.target.value)
          }
          className={s.changeInput}
        />
        <button onClick={() => setPriceEdit(false)}>Змінити</button>
      </div>
    );
  } else {
    priceIsEdit = (
      <div className={s.changeBox}>
        <p>{changePrice} грн</p>
        <button onClick={() => setPriceEdit(true)} className={s.changeBtn}>
          {AiFillEdit()}
        </button>
      </div>
    );
  }

  let categoryIsEdit;
  if (categoryEdit) {
    categoryIsEdit = (
      <div className={s.changeBox}>
        <select
          name="category"
          id="category"
          value={changeCategory}
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
      </div>
    );
  } else {
    categoryIsEdit = (
      <div className={s.changeBox}>
        <p>{changeCategory}</p>
        <button onClick={() => setCategoryEdit(true)} className={s.changeBtn}>
          {AiFillEdit()}
        </button>
      </div>
    );
  }

  let descriptionIsEdit;
  if (descriptionEdit) {
    descriptionIsEdit = (
      <div className={s.changeBox}>
        <textarea
          className={s.textarea}
          value={changeDescription}
          onChange={e => setChangeDescription(e.target.value)}
          rows={10}
        />
        <button onClick={() => setDescriptionEdit(false)}>Змінити</button>
      </div>
    );
  } else {
    descriptionIsEdit = (
      <div className={s.changeBox}>
        <p>{changeDescription}</p>
        <button onClick={() => setDescriptionEdit(true)} className={s.changeBtn}>
          {AiFillEdit()}
        </button>
      </div>
    );
  }
  return (
    <>
      <button
        type="button"
        className={s.addBtn}
        onClick={openModal}
        disabled={modalIsOpen || changeModalIsOpen ? true : false}
      >
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
            <button
              type="button"
              onClick={() => dispatch(deleteBook(el.id))}
              className={s.deleteBtn}
            >
              {MdDeleteForever()}
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
        <button onClick={closeModal} className={s.closeBtn}>
          {GrClose()}
        </button>
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
            <button onClick={closeChangeModal} className={s.closeBtn}>
              {GrClose()}
            </button>
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
