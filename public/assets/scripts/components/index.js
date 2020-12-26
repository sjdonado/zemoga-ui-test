import Votes from './votes.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const e = React.createElement;
  ReactDOM.render(e(Votes), document.querySelector('#votes'));
});
