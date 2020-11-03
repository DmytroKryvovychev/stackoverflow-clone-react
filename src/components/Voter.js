import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function Voter({ votes, onUpVote, onDownVote }) {
  return (
    <div className="voter__container">
      <ThumbUpIcon className="vote-up" onClick={() => onUpVote(votes)}></ThumbUpIcon>
      <p>{votes}</p>
      <ThumbDownIcon className="vote-down" onClick={() => onDownVote(votes)}></ThumbDownIcon>
    </div>
  );
}

export default React.memo(Voter);
