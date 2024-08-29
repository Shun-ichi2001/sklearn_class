import React, {useEffect, useRef, useState} from 'react';
import "./RecipeList.css";

const RecipeResult = ({ item }) => {
    return (
        <a href={item.recipeUrl} target="_blank" rel="noopener noreferrer" className="recipe-link">
            <div className="recipe">
                <img
                    src={item.foodImageUrl}
                    alt={item.recipeTitle}
                    className="recipe-image"
                />
                <div className="recipe-info">
                    <h2 className="recipe-title">
                        {item.recipeTitle}
                    </h2>
                    <p className="recipe-description">
                        {item.recipeDescription}
                    </p>
                </div>
            </div>
        </a>
    );
};

const RecipeList = ({ recipeID }) => {
    const [recipeData, setRecipeData] = useState(null);
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (recipeID) {
            const apiUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${recipeID}&applicationId=1077188838370490177`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => setRecipeData(data))
                .catch(error => console.error('Error fetching the recipe data:', error));
        }
    }, [recipeID]);

    if (!recipeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-result">
            <RecipeResult item={recipeData.result[1]} />
        </div>
    );
};

export default RecipeList;