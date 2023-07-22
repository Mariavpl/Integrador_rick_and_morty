import { useState } from "react";
import style from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
   const [id, setId] = useState("");
 
   const handleChange = (event) => {
     setId(event.target.value);
   };
 
   const handleSearch = () => {
     // Validar que el ID sea un número válido
     if (isNaN(id)) {
       alert("El ID debe ser un número válido.");
       return;
     }
 
     // Llamar a la función de búsqueda solo si el ID es válido
     onSearch(id);
   };
 
   return (
     <div className={style.nav}>
       <input
         type="search"
         className={style.Searchinput}
         value={id}
         onChange={handleChange}
       />
       <button onClick={handleSearch}>Agregar</button>
     </div>
   );
 }
 