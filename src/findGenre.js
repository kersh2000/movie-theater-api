const { Show } = require('./models/Show');

async function findGenre(match) {
  const genres = await Show.findAll({
    attributes: ['genre'],
    group: ['genre']
  }).then(shows => 
    shows.map(show => show.genre)
  );

  const obj = genres.reduce(function(obj, v) {
    obj[v] = 0;
    return obj;
  }, {});

  let maxVal = 0;
  let maxKey = "";
  
  genres.forEach( key => {
    for (let i = 0; i < match.length; i++) {
      if (key.length === i) {
        break;
      }
      const char = key[i];
      if (match[i] === char) {
        obj[key] += 1;
      }
    }
    if (obj[key] > maxVal && obj[key] >= 3) {
      maxVal = obj[key];
      maxKey = key;
    }
  });

  if (!maxKey) {
    maxKey = "That is not a valid genre!";
  } else {
    maxKey = "Did you mean " + maxKey + "?";
  }

  console.log(obj);
  return maxKey;
}

module.exports = findGenre;