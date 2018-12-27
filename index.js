const Botgram = require('botgram');
const https = require('https');


const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}

const bot = new Botgram(TELEGRAM_BOT_TOKEN);

const stats = {
  totalResults: 0,
  max: 0,
};

const getSearchUrl = searchInput => `https://www.google.com/search?q=${searchInput}`;

const findNum = (body) => {
  const startSP = body.indexOf('resultStats', 30000); // SP = SearchPoint
  const endSP = body.indexOf('</div>', startSP);
  const searchPart = body.slice(startSP, endSP);
  const startNumPoint = searchPart.lastIndexOf(':') + 1;
  const resultsQty = searchPart.slice(startNumPoint).replace(/[^\d]/g, '');
  return resultsQty;
};

const getCallBack = (resolve, request) => (res) => {
  let rawData = '';
  res.on('data', (d) => {
    rawData += d;
  });
  res.on('end', () => {
    try {
      const qty = findNum(rawData);
      stats.totalResults += +qty;
      (stats.max < (+qty)) && (stats.max = qty);
      resolve({ qty, request });
    } catch (e) {
      console.error(e.message);
    }
  });
};

const asyncSearch = inp => new Promise((resolve, reject) => {
  https.get(getSearchUrl(inp), getCallBack(resolve, inp)).on('error', (e) => {
    console.error(e.message);
  });
});

const withSpaces = num => Number(num).toLocaleString();

const getSearchRequests = (text) => {
  const encodedText = encodeURI(text);
  const textArr = (text.length > 1) ? encodedText.split(',') : encodedText;
  return (textArr.length > 1)
    ? textArr.filter(request => /\w|\d/.test(request))
    : [...textArr];
};

async function fetchResults(msg, reply) {
  console.log(`\n${msg.from.firstname} (${msg.from.username}): '${msg.text}'`);
  try {
    const results = await Promise.all(getSearchRequests(msg.text).map(req => asyncSearch(req)));
    const response = (results.length === 1)
      ? `${withSpaces(results[0].qty)} results`
      : results
        .sort((a, b) => b.qty - a.qty)
        .reduce((acc, result) => {
          const searchText = decodeURI(result.request).replace(/^ +| +$/g, ''),
            share = (result.qty / stats.totalResults * 100).toFixed(2);
          return `${acc}\n • ${withSpaces(result.qty)} ${searchText} (${share}%)`;
        }, 'RESULT');
    console.log(response);
    Object.keys(stats).forEach((key) => { stats[key] = 0; });
    reply.text(response);
  } catch (e) {
    console.error(e.message);
    reply.text(`ERROR: ${e.message}`);
  }
}

// const arr = ['microsoft', 'apple', 'google', 'amazon', 'facebook', 'wechat', 'viber', 'instagram', 'skype', 'telegram'];
// const arr1 = ['london', 'paris', 'berlin', 'new-york'];
// const arr2 = ['football', 'soccer', 'american football'];
// const arr3 = ['bmw', 'mercedes', 'volkswagen'];
// const arr4 = ['gas', 'oil'];
// const arr5 = ['spacex', 'nasa', 'roscosmos'];
// const arr6 = ['boeing', 'airbus', 'ak-47'];
// const arr7 = ['tiger', 'lion', 'wolf'];
// const arr8 = ['java', 'javascript'];
// const arr9 = ['react.js', 'vue.js', 'vue', 'react', 'angular'];

bot.text(fetchResults);
