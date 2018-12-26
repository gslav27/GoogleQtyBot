const getSearchRequests = (text) => {
  const encodedText = encodeURI(text);
  const textArr = (text.length > 1) ? encodedText.split(',') : encodedText;
  return (textArr.length > 1)
    ? textArr.filter(request => /\w|\d/.test(request))
    : [...textArr];
};

const arr7 = 'tiger, lion, wolf';
const arr8 = 'java,javascript';
const arr9 = 'java';
const arr10 = 'sdf,  ';
const arr11 = '_== ,, sun';
const arr12 = ',';
const arr13 = 'new-york, 9393, __2344:';
const arr14 = 'los angeles, smile';
const arr15 = 'київ, сон і сік';

// console.log(getSearchRequests(arr7));
// console.log(getSearchRequests(arr8));
// console.log(getSearchRequests(arr9));
// console.log(getSearchRequests(arr10));
// console.log(getSearchRequests(arr11));
// console.log(getSearchRequests(arr12));
// console.log(getSearchRequests(arr13));
// console.log(getSearchRequests(arr14));
// console.log(getSearchRequests(arr15));

const replaceFunc = text => text.replace(/^ +| +$/g, '');
console.log(replaceFunc(' sun'));
console.log(replaceFunc('sun '));
console.log(replaceFunc(' sun '));
console.log(replaceFunc('sun'));
console.log(replaceFunc('  sun'));
