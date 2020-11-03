import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import QuestionCard from '../components/QuestionCard';
import { getAllQuestions, getAllAnswers } from '../config';

function Home() {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    async function GetAllQuestions() {
      await getAllQuestions().then(({ data }) => {
        setQuestions(data);
      });
    }

    async function GetAllAnswers() {
      await getAllAnswers().then(({ data }) => {
        setAnswers(data);
      });
    }
    GetAllQuestions();
    GetAllAnswers();
  }, []);

  return (
    <div className="container">
      <div className="home__title">
        <h1>All Questions</h1>
        <Link to="/new_question">
          <p className="home__title-btn">Ask Question</p>
        </Link>
      </div>
      {questions &&
        answers &&
        questions.map((q, idx) => (
          <QuestionCard
            key={`idx-${idx}-title-${q.title}`}
            answerCount={answers.filter((ans) => +ans.questionId === q.id).length}
            question={q}
          />
        ))}
    </div>
  );
}

export default Home;
