import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [explanation, setExplanation] = useState('');
  const [productsURL, setProductsURL] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    // JSONファイルを読み込む
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswerButtonClick = (isCorrect) => {
    if (!answered) {
      setFeedback(isCorrect ? '正解' : '不正解');
      setExplanation(questions[currentQuestion].explanation);
      setProductsURL(questions[currentQuestion].productsURL);
      setAnswered(true); // 問題が解答済みとする
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setFeedback('');
      setExplanation('');
      setProductsURL([]);
      setAnswered(false); // 次の問題に進むので解答済みをリセット
    } else {
      alert('すべての質問が終了しました。');
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>{questions[currentQuestion].questionText}</h1>
      <div>
        {questions[currentQuestion].answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerButtonClick(option.isCorrect)}
            disabled={answered}
          >
            {option.answerText}
          </button>
        ))}
      </div>
      <p>{feedback}</p>
      <p>{explanation}</p>
      {productsURL.length > 0 && (
        <div>
          <h2>関連商品:</h2>
          <ul>
            {productsURL.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  商品リンク {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {answered && (
        <button onClick={handleNextQuestion}>
          次の問題に行く
        </button>
      )}
    </div>
  );
}

export default App;

