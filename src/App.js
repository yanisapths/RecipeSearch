import React , {useEffect,useState} from "react";
import Recipe from './Recipe';
import "./App.css";

 const App = () => {
  
  const APP_ID="d8a5556c";
  const APP_KEY="696cdb5eb7bbf5f92b7e05540c9698fb";

  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    getRecipes();
  },[query]); //only gonna run when we click submit btn

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
   };
 
  return(
    < div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" >
          Search
        </button>
    </form>
     <div className="recipes">
      {recipes.map( recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
    ))}
     </div>
    </div>
  );
 };
  
  export default App;   