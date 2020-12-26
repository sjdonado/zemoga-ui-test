'use strict';

import VotingCard from './votingCard.jsx';

function Votes() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!window.db) {
      initDB(() => location.reload());
      return;
    }
    getAllPublicFigures(window.db, (err, res) => {
      if (err) {
        return;
      }
      if (res.length === 0) {
        runSeed(window.db, () => location.reload());
      } else {
        setData(res);
      }
    });
  }, []);

  const saveNewVote = (id, vote) => {
    const obj = data.find((obj) => obj.id === id);
    if (vote !== 1 && vote !== -1) {
      return;
    }
    const scoreName = vote === 1 ? 'thumbsUp' : 'thumbsDown';
    const value = obj.score[scoreName] + 1;

    udpatePublicFigureScore(window.db, id, scoreName, value, () => {
      Object.assign(obj.score, { [scoreName]: value });
      setData([...data]);
    });
  };

  return (
    <>
      <h2>Votes</h2>
      <div className="section-content">
        {data.map(({ id, url, name, date, category, description, score }) => (
          <VotingCard
            key={id}
            url={url}
            name={name}
            date={date}
            category={category}
            description={description}
            score={score}
            saveNewVote={(vote) => saveNewVote(id, vote)}
          />
        ))}
      </div>
    </>
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const e = React.createElement;
  ReactDOM.render(e(Votes), document.querySelector('#votes'));
});
