import React from 'react';
import { useParams } from 'react-router-dom';

import Voter from '../components/Voter';
import { changeVotes, changeAnswerVotes, convertDate } from '../config';

function Post({ post, isAnswer, answerId }) {
  let { id } = useParams();

  const handleQVoteUp = (votes) => {
    isAnswer ? changeAnswerVotes(answerId, votes + 1) : changeVotes(id, votes + 1);
  };

  const handleQVoteDown = (votes) => {
    isAnswer ? changeAnswerVotes(answerId, votes - 1) : changeVotes(id, votes - 1);
  };

  return (
    <div className="post__container">
      <Voter votes={post.votes} onUpVote={handleQVoteUp} onDownVote={handleQVoteDown} />
      <div className="post__content">
        <p>{post.text}</p>

        <div className="post__details">
          <p>
            {isAnswer ? 'answered' : 'asked'} {convertDate(post.creationTime)}
          </p>
          <p>{post.author}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Post);
