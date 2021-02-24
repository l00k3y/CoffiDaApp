import Filter from 'bad-words';

function textIsProfane(text) {
  const filter = new Filter({ list: ['tea', 'cake', 'cakes', 'pastry', 'pastries'] });
  return (filter.isProfane(text));
}

export default textIsProfane;
