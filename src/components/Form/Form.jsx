import { useState } from 'react';
import styles from './Form.module.css';
import validation from '../validation';

export default function Form(props) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [isRegistering, setIsRegistering] = useState(false);

  function handleInputChange(e) {
    if (isRegistering) {
      setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    // Solo para mostrar la validación en tiempo real (opcional)
    setErrors(validation(isRegistering ? registrationData : userData));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isRegistering) {
      const registrationErrors = validation(registrationData);

      // Verificar si la contraseña cumple con los requisitos
      if (!registrationErrors.password && registrationData.password.length >= 6 && /\d/.test(registrationData.password)) {
        props.register(registrationData);
      } else {
        setErrors({
          ...registrationErrors,
          password: 'La contraseña debe tener al menos 6 caracteres y contener al menos un número.',
        });
      }
    } else {
      props.login(userData);
    }
  }

  return (
    <div className={styles.login}>
      <img
        className={styles.img}
        src="https://i.pinimg.com/originals/5f/1f/7c/5f1f7cba6342713139f386d72d2390bf.jpg"
        alt="Rick and Morty Login"
      />
      {isRegistering ? (
        <form onSubmit={handleSubmit} className={styles.login2}>
          <div className={styles['input-container']}>
            <label className={styles.label}>Username: </label>
            <input
              className={`${styles.input} ${errors.username && styles.warning}`}
              name="username"
              type="text"
              value={registrationData.username}
              onChange={handleInputChange}
            />
            {!errors.username ? null : <p className={styles.danger}>{errors.username}</p>}
          </div>
          <div className={styles['input-container']}>
            <label className={styles.label}>Password: </label>
            <input
              className={`${styles.input} ${errors.password && styles.warning}`}
              name="password"
              type="password"
              value={registrationData.password}
              onChange={handleInputChange}
            />
            {!errors.password ? null : <p className={styles.danger}>{errors.password}</p>}
          </div>
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className={styles.login2}>
          <div className={styles['input-container']}>
            <label className={styles.label}>Username: </label>
            <input
              className={`${styles.input} ${errors.username && styles.warning}`}
              name="username"
              type="text"
              value={userData.username}
              onChange={handleInputChange}
            />
            {!errors.username ? null : <p className={styles.danger}>{errors.username}</p>}
          </div>
          <div className={styles['input-container']}>
            <label className={styles.label}>Password: </label>
            <input
              className={`${styles.input} ${errors.password && styles.warning}`}
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            {!errors.password ? null : <p className={styles.danger}>{errors.password}</p>}
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      )}
      <div className={styles['login-buttons']}>
        <button className={styles.button} onClick={() => setIsRegistering(false)}>
          Login
        </button>
        <button className={styles.button} onClick={() => setIsRegistering(true)}>
          Register
        </button>
      </div>
    </div>
  );
}