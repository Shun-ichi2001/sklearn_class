import { useEffect, useState } from 'react';
import "./ProductList.css"
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const Product = ({ item }) => {
  return (
    <a href={item.itemUrl} target="_blank" rel="noopener noreferrer" className="product-link">
      <div className="product">
        <img
          src={item.mediumImageUrls[0].imageUrl}
          alt={item.itemName}
          className="product-image"
        />
        <div className="product-info">
          <p className="product-name">
            {item.itemName}
          </p>
          <p className="product-price">¥{item.itemPrice}円</p>
        </div>
      </div>
    </a>
  );
};

const ProductList = ({ keyword }) => {
  const [productData, setProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    const encodedKeyword = encodeURIComponent(keyword);
    const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${encodedKeyword}&hits=10&applicationId=1077188838370490177`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching the product data:', error));
  }, [keyword]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(productData.Items.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return productData.Items.slice(start, end);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
  };

  return (
    <div className="product-carousel">
      <button onClick={handlePrevious} className="carousel-button carousel-button-left">
        <MdChevronLeft />
      </button>
      <div className="product-list">
        {getCurrentItems().map((product, index) => (
          <Product key={index} item={product.Item} />
        ))}
      </div>
      <button onClick={handleNext} className="carousel-button carousel-button-right">
        <MdChevronRight />
      </button>
      <div className="page-indicator">
        {`Page ${currentPage + 1} of ${totalPages}`}
      </div>
    </div>
  );
};

export default ProductList;
