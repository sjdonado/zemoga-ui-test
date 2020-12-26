"use strict";

import VotingCard from "./votingCard.jsx";

const dummyData = [
  {
    id: 1,
    url: "assets/images/kanye.jpg",
    name: "Kanye West",
    date: "1 month ago",
    category: "Entertainment",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Voluptate, suscipit.`,
    score: {
      thumbsUp: 64,
      thumbsDown: 36,
    },
  },
  {
    id: 2,
    url: "assets/images/mark.jpg",
    name: "Mark Zuckerberg",
    date: "1 month ago",
    category: "Business",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
    score: {
      thumbsUp: 36,
      thumbsDown: 64,
    },
  },
  {
    id: 3,
    url: "assets/images/cristina.jpg",
    name: "Cristina Fernández de Kirchner",
    date: "1 month ago",
    category: "Politics",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Voluptate, suscipit.`,
    score: {
      thumbsUp: 36,
      thumbsDown: 64,
    },
  },
  {
    id: 4,
    url: "assets/images/malala.jpg",
    name: "Malala Yousafzai",
    date: "1 month ago",
    category: "Entertainment",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
    score: {
      thumbsUp: 64,
      thumbsDown: 36,
    },
  },
];

function Votes() {
  const [data, setData] = React.useState(dummyData);

  const saveNewVote = (id, vote) => {
    const obj = data.find((obj) => obj.id === id);
    let newScore = {};
    if (vote === 1) {
      newScore = { thumbsUp: obj.score.thumbsUp + 1 };
    }
    if (vote === -1) {
      newScore = { thumbsDown: obj.score.thumbsDown + 1 };
    }
    Object.assign(obj.score, newScore);
    setData([...data]);
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

document.addEventListener("DOMContentLoaded", function () {
  const e = React.createElement;
  ReactDOM.render(e(Votes), document.querySelector("#votes"));
});
