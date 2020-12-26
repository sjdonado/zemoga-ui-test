"use strict";

import PropTypes from "prop-types";

function VotingCard({
  url,
  name,
  date,
  category,
  description,
  score,
  saveNewVote,
}) {
  const [vote, setVote] = React.useState(1);
  const [isVoted, setIsVoted] = React.useState(false);

  const firstName = name.split(" ")[0];

  const total = score.thumbsUp + score.thumbsDown;
  const thumbsUp = (score.thumbsUp * 100) / total;
  const thumbsDown = (score.thumbsDown * 100) / total;

  const result = thumbsUp > thumbsDown;
  const thumbDecoratorColor = result ? "blue" : "orange";
  const thumbDecoratorIcon = result ? "icon-thumb-up" : "icon-thumb-down";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVoted) {
      saveNewVote(vote);
    }
    setIsVoted(!isVoted);
  };

  return (
    <div className="voting-card">
      <img src={url}></img>
      <div className="card-container">
        <div className="card-content">
          <div className="thumb-decorator">
            <div className={thumbDecoratorColor}>
              <span className={thumbDecoratorIcon}></span>
            </div>
          </div>
          <div className="right-container">
            <h3>{name}</h3>
            <div className="card-details">
              <span className="date">{date}</span>
              <span className="category">
                {` in`} {category}
              </span>
            </div>
            <p className="card-description">
              {isVoted ? "Thank you for voting!" : description}
            </p>
            <form className="card-vote-form" onSubmit={handleSubmit}>
              {!isVoted && (
                <>
                  <input
                    type="radio"
                    id={`${firstName}-radio-thumb-up`}
                    className="radio-button"
                    name="vote"
                    vote="up"
                    onChange={() => setVote(1)}
                    checked={vote === 1}
                  />
                  <label
                    htmlFor={`${firstName}-radio-thumb-up`}
                    className="radio-button-label thumb-up"
                  />
                  <input
                    type="radio"
                    id={`${firstName}-radio-thumb-down`}
                    className="radio-button"
                    name="vote"
                    vote="down"
                    onChange={() => setVote(-1)}
                    checked={vote === -1}
                  />
                  <label
                    htmlFor={`${firstName}-radio-thumb-down`}
                    className="radio-button-label thumb-down"
                  />
                </>
              )}
              <input
                type="submit"
                value={isVoted ? "Vote again" : "Vote Now"}
              />
            </form>
          </div>
        </div>
        <div className="card-statistics">
          <div className="blue-alpha" style={{ flex: thumbsUp }}>
            <span className="icon-thumb-up"></span>
            <span className="score">{thumbsUp.toFixed(0)}%</span>
          </div>
          <div className="orange-alpha" style={{ flex: thumbsDown }}>
            <span className="score">{thumbsDown.toFixed(0)}%</span>
            <span className="icon-thumb-down"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

VotingCard.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.shape({
    thumbsUp: PropTypes.number.isRequired,
    thumbsDown: PropTypes.number.isRequired,
  }).isRequired,
  saveNewVote: PropTypes.func.isRequired,
};

export default VotingCard;
