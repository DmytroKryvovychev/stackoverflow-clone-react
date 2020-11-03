import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { postQuestion } from '../config';

let regex = /^[A-Za-z0-9 .'?!,@$#-+_]{3,}$/;

function AskNewQuestion() {
  let history = useHistory();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState({ title: '', author: '', question: '' });

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const postNewQuestion = () => {
    let err = { ...errors };
    err.title = !regex.test(title) ? 'Title must be more than 3 letters' : '';
    err.author = !regex.test(author) ? 'Author must be more than 3 letters' : '';
    err.question = !regex.test(question) ? 'Question must be more than 3 letters' : '';

    setErrors(err);
    if (
      Object.values(err).reduce((sum, item) => {
        return sum + item.length;
      }, 0) > 0
    ) {
      return;
    }

    postQuestion({
      title,
      author,
      text: question,
      creationTime: new Date(),
      votes: 0,
      views: 0,
    });
    history.push('/questions');
  };

  return (
    <div className="container">
      <h2>Ask New Question</h2>
      <div className="input__form">
        <TextField
          error={errors.title.length > 0}
          label="Title"
          variant="outlined"
          helperText={errors.title}
          onChange={handleChangeTitle}
        />
        <TextField
          error={errors.author.length > 0}
          label="Author"
          variant="outlined"
          helperText={errors.author}
          onChange={handleChangeAuthor}
        />

        <TextField
          error={errors.question.length > 0}
          label="Your Question"
          variant="outlined"
          helperText={errors.question}
          multiline
          rows={10}
          onChange={handleChangeQuestion}
        />
      </div>
      <p
        className="styled__btn"
        onClick={() => {
          postNewQuestion();
        }}>
        Save
      </p>
    </div>
  );
}

export default AskNewQuestion;
