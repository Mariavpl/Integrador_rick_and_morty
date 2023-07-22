import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useDispatch } from 'react-redux';
import { deleteFavorite } from './redux/actions';
import Nav from './components/Nav/nav';
import Cards from './components/cards/Cards';

function App() {
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const username = 'cditoro@gmail.com';
  const password = 'Pocket10';
  const navigate = useNavigate();
  const location = useLocation();

  const searchCard = (id) => {
    const busquedita = document.getElementById(`${id}`);
    if (busquedita === null) {
      return true;
    } else {
      return false;
    }
  };

  const onClose = (id) => {
    setCharacters(characters.filter((data) => data.id !== id));
    dispatch(deleteFavorite(id));
  };

  const agregar = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setCharacters([...characters, data]);
        } else {
          window.alert('No existe ese personaje');
        }
      });
  };

  const OnSearch = (valor) => {
    if (!searchCard(valor.id)) {
      return window.alert('Ya existe ese personaje');
    } else {
      agregar(valor.id);
      document.getElementById('input').value = '';
    }
  };

  const random = () => {
    const id = Math.ceil(Math.random() * 826);
    if (!searchCard(id)) {
      random();
    } else {
      agregar(id);
    }
  };

  function login(userData) {
    if (userData.password && userData.username) {
      if (userData.password === password && userData.username === username) {
        setAccess(true);
        navigate('/home');
      } else {
        alert('No existen registros con esos datos');
      }
    }
  }

  function register(registrationData) {
    // Lógica para el registro...
    console.log('Registro:', registrationData);
  }

  function logout() {
    setAccess(false);
  }

  useEffect(() => {
    !access && navigate('/');
    // eslint-disable-next-line
  }, [access]);

  if (location.pathname === '/') {
    return (
      <div className='App' style={{ padding: '25px' }}>
        <Routes>
          <Route path='/' element={<Form login={login} register={register} />} />
          <Route path=':404' element={<Error />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className='App' style={{ padding: '25px' }}>
        <Nav OnSearch={OnSearch} random={random} logout={logout} />
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
          <Route path='/about' element={<About />} />
          <Route path='/detail/:detailId' element={<Detail />} />
          <Route path=':404' element={<Error />} />
          <Route path='/Favorites' element={<Favorites />} />
        </Routes>

        <Outlet />
      </div>
    );
  }
}

export default App;