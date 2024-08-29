import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import RelatedProductAndRecipe from "./RelatedProductAndRecipe.jsx";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackClass, setFeedbackClass] = useState(""); //色を変える
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [quizData, setQuizData] = useState(null); // quizDataを状態として宣言
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [fadeInClass, setFadeInClass] = useState([]);
  const apiConfig = {
    //環境変数: root の .env に対応
    apiUrl: import.meta.env.VITE_API_URL,
    questionNum: import.meta.env.VITE_QUESTION_NUM,
  };

  // データを同期で取得
  useEffect(() => {
    // サーバーからデータを取得
    fetch(`${apiConfig.apiUrl}/questions?k=${apiConfig.questionNum}`)
        .then(response => {
          console.log('Response:', response); // レスポンスを確認
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setQuizData(data); // 状態にセット
        })
        .catch(error => {
          console.error('Fetch error:', error);
          // サーバーに接続できなかった場合、ローカルのJSONファイルからデータを取得
          fetch('/questions.json')
              .then(response => response.json())
              .then(data => setQuizData(data)) // 状態にセット
              .catch(err => console.error('Local fetch error:', err));
        });
  }, []);

  useEffect(() => {
    if (quizData) {
      // 各ボタンにフェードインアニメーションを時間差で適用
      const newFadeInClass = [];
      quizData[currentQuestion].options.forEach((_, index) => {
        setTimeout(() => {
          newFadeInClass[index] = "fade-in";
          setFadeInClass([...newFadeInClass]);
        }, index * 200); // 200msごとに次のボタンがフェードイン
      });
    }
  }, [quizData, currentQuestion]);

  const handleAnswer = (answer) => {
    const newAnswer = {
      question: quizData[currentQuestion].question,
      options: quizData[currentQuestion].options,
      answer: answer,
      correctAnswer: quizData[currentQuestion].correct,
      correct: quizData[currentQuestion].correct === answer,
    };

    if (newAnswer.correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("〇");
      setFeedbackClass("correct");
      setFeedbackMessage("正解");
    } else {
      setFeedback("✕");
      setFeedbackClass("wrong");
      setFeedbackMessage("不正解");
    }

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setCurrentAnswer(newAnswer);
    setNext(true);
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setFadeInClass([]);
    } else {
      setShowScore(true);
    }

    setNext(false);
    setFeedback(null);
    setCurrentAnswer(null);
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToQuiz = () => {
    window.location.reload();
  };

  if (!quizData) {
    return <div>Loading...</div>; // データが読み込まれるまで「Loading...」を表示
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h1>スコア</h1>
          <h2 className="final-score">
            {score}/{quizData.length}
          </h2>
          {score !== 0 ? <h2 className="get-point"><span>{score}</span>ポイント獲得！</h2> : <h2 className="get-point">残念！</h2>}
          <table className="answer-table">
            <thead>
              <tr>
                <td>質問</td>
                <td>あなたの解答</td>
                <td>合否</td>
              </tr>
            </thead>
            <tbody>
              {answers.map((item, index) => (
                <tr className={item.correct ? "correct" : "wrong"} key={index}>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? "〇" : "✕"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={navigateToQuiz}>もう一度やる</button>
          <button onClick={navigateToHome}>タイトルに戻る</button>
        </div>
      ) : (
        <div className="question-section">
          <h1>
            問題 {currentQuestion + 1}/{quizData.length}
          </h1>
          <h2>{quizData[currentQuestion].question}</h2>
          {next ? (
            <div className="feedback-section">
              <h2 className={`large-feedback ${feedbackClass}`}>{feedback}</h2>
              <h2 className={`large-feedback-text ${feedbackClass}`}>{feedbackMessage}</h2>
              {currentAnswer && !currentAnswer.correct && (
                <p className="wrong-answer">間違った答え: {currentAnswer.answer}</p>
              )}
              <p className="correct-answer">解答：{quizData[currentQuestion].correct}</p>
              <p className="explanation">解説：{quizData[currentQuestion].explanation}</p>
              <div>
                {quizData[currentQuestion].keyword && (
                  <>
                    <RelatedProductAndRecipe category={quizData[currentQuestion].category} relatedKeyword={quizData[currentQuestion].keyword} />
                  </>
                )}
              </div>
              <button onClick={goToNextQuestion}>{currentQuestion + 1 === quizData.length ? "スコアを見る" : "次の問題へ"}</button>
              <button onClick={navigateToHome}>タイトルに戻る</button>
            </div>
          ) : (
            <div className="answer-section">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  className={`quiz-option-button option-${index} ${fadeInClass[index] || ""}`}
                  key={index}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
              <button onClick={navigateToHome} className="answer-section-gohome">タイトルに戻る</button>
            </div>
          )}
        </div>
      )
      }
    </div >
  );
};

export default Quiz;