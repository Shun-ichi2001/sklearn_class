import { useNavigate } from "react-router-dom";
import exampleImage from './images/example_word.png'; // 画像をインポート

const Home = () => {
  const navigate = useNavigate();
  const navigateToQuiz = () => {
    navigate("quiz");
  }

  return (
    <div className="home">
      <img src={exampleImage} alt="Example" className="example-image"/>
      <h1>正解数だけ<span>楽天ポイント</span>獲得！</h1>
      <button onClick={navigateToQuiz} className="regular-route">クイズにチャレンジ</button>
      <a target="_blank" rel="noopener noreferrer" href="https://www.rakuten.co.jp" >
        <button>楽天市場に戻る</button>
      </a>
      
    </div>
  );
}

export default Home
