import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        const { drinks } = data;

        if(drinks) {
          const {strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0]

          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];

          const newCocktail = { name, image, info, category, glass, instructions, ingredients};
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id])
  
  if(loading) {
    return <Loading />
  }
  if(!cocktail) {
    return(
      <h2 className='section-title'>
        No cocktail to display
      </h2>
    );
  }

  const {name, image, info, glass, category, instructions, ingredients } = cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>back home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className='drink-data'> Name: </span>{name}
          </p>
          <p>
            <span className='drink-data'> Category: </span>{category}
          </p>
          <p>
            <span className='drink-data'> Info: </span>{info}
          </p>
          <p>
            <span className='drink-data'> Glass: </span>{glass}
          </p>
          <p>
            <span className='drink-data'> Instructions: </span>{instructions}
          </p>
          <p>
            <span className='drink-data'> Ingredients: </span>
            {ingredients.map((ingredient, index) => {
              return ingredient ? <span key={index}>{ingredient}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail;