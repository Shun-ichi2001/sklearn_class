import { useEffect, useState } from "react";

const QuizDataFetcher = () => {
  const [quizData, setQuizData] = useState(null);

  // データを非同期で取得
  useEffect(() => {
    fetch('http://localhost:3001/api/questions')
      .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        setQuizData(data);
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div>
      <h1>Data Loaded Successfully</h1>
      <pre>{JSON.stringify(quizData, null, 2)}</pre>
    </div>
  );
};

export default QuizDataFetcher;
