import ProductList from "./ProductList.jsx";
import RecipeList from "./RecipeList.jsx";

const RelatedProductAndRecipe = ({ category, relatedKeyword }) => {
    if (category === "product") {
        return (
            <div>
                <h2 className="products-relatedto-rakuten">{relatedKeyword}に関連する商品</h2>
                <ProductList productKeyword={relatedKeyword} />
            </div>
        )
    } else if (category === "recipe") {
        return (<div>
            <h2 className="recipes-relatedto-rakuten">関連するレシピ</h2>
            <RecipeList recipeID={relatedKeyword} />
        </div>)
    } else {
        /* empty */
    }
};

export default RelatedProductAndRecipe;