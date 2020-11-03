import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import Post from '../components/Post';
import { getQuestion, getAnswers, postAnswer, convertDate, putViews } from '../config';

const regex = /^[A-Za-z0-9 .'?!,@$#-+_]+$/;

class Question extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: null,
      author: '',
      answer: '',
      errors: { author: '', answer: '' },
    };
  }

  handleChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  };

  handleChangeAnswer = (event) => {
    this.setState({ answer: event.target.value });
  };

  postNewAnswer = () => {
    const { id } = this.props.match.params;
    let err = { ...this.state.errors };
    err.author = !regex.test(this.state.author) ? 'Author must be more than 3 letters' : '';
    err.answer = !regex.test(this.state.answer) ? 'Question must be more than 3 letters' : '';
    this.setState({ errors: err });
    if (
      Object.values(err).reduce((sum, item) => {
        return sum + item.length;
      }, 0) > 0
    ) {
      return;
    }

    postAnswer(id, {
      author: this.state.author,
      text: this.state.answer,
      creationTime: new Date(),
      votes: 0,
    }).catch((err) => console.log(err));
  };

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    getQuestion(id)
      .then(({ data }) => {
        data.views += 1;
        this.setState({ question: data });
        return data;
      })
      .then((res) => {
        getAnswers(id).then(({ data }) => {
          this.setState({ answers: data });
        });
      });
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    putViews(id, this.state.question);
  }

  render() {
    const { question, answers, author, errors } = this.state;
    return (
      <>
        {question && (
          <div className="container">
            <h2>{question.title}</h2>
            <div className="question__subtitle">
              <p>asked {convertDate(question.creationTime)}</p>
              <p>viewed {question.views} times</p>
            </div>
            <Post post={question} />

            {answers && (
              <div className="answer">
                <h3>{answers.length} Answers</h3>
                {answers.map((ans, idx) => (
                  <Post key={`idx-${idx}-ans-${author}`} post={ans} isAnswer answerId={ans.id} />
                ))}
              </div>
            )}

            <div className="answer__form">
              <h2>Your answer</h2>
              <div className="input__form">
                <TextField
                  error={errors.author.length > 0}
                  label="Author"
                  variant="outlined"
                  helperText={errors.author}
                  onChange={this.handleChangeAuthor}
                />

                <TextField
                  error={errors.answer.length > 0}
                  label="Your Question"
                  variant="outlined"
                  helperText={errors.answer}
                  multiline
                  rows={10}
                  onChange={this.handleChangeAnswer}
                />
              </div>
              <p
                className="styled__btn"
                onClick={() => {
                  this.postNewAnswer();
                }}>
                Answer
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Question);
