import { THUMB_UP, THUMB_DOWN } from '../utils/constants.js';
import {
  initDB,
  runSeed,
  getAllPublicFigures,
  udpatePublicFigureScore,
} from '../services/database.js';

import VotingCard from './votingCard.jsx';

function Votes() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = () => {
    if (!window.db) {
      initDB(() => fetchData());
      return;
    }
    getAllPublicFigures(window.db, (err, res) => {
      if (err) {
        return;
      }
      if (res.length === 0) {
        runSeed(window.db, () => fetchData());
        return;
      }
      setData(res);
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    if (isLoading) fetchData();
  }, [fetchData]);

  const saveNewVote = (id, vote) => {
    const record = data.find((obj) => obj.id === id);
    if (vote !== THUMB_UP && vote !== THUMB_DOWN) {
      return;
    }
    const value = record.score[vote] + 1;

    udpatePublicFigureScore(window.db, id, vote, value, (err, res) => {
      if (err || !res) {
        return;
      }
      Object.assign(record.score, { [vote]: value });
      setData([...data]);
    });
  };

  return (
    <>
      <h2>Votes</h2>
      <div className="section-content">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {data.map(
              ({
                id, url, name, date, category, description, score,
              }) => (
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
              ),
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Votes;
