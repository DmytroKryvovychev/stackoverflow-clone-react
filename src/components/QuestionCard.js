import React from 'react';
import { Link } from 'react-router-dom';

import { convertDate } from '../config';

function QuestionCard({ question, answerCount }) {
  return (
    <div className="card__container">
      <div className="card__info">
        <p className="number">{question.votes}</p>
        <p>votes</p>
        <p className="number">{answerCount}</p>
        <p>answers</p>
        <p className="number__views">{question.views} views</p>
      </div>
      <div className="card__content">
        <Link to={`questions/${question.id}`}>
          <h2>{question.title}</h2>
        </Link>
        <p className="card__content-text">{question.text}</p>

        <div className="card__details">
          <p> asked {convertDate(question.creationTime)}</p>
          <p>{question.author}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
