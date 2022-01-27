const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"] 
const allNumbers = [..."0123456789"]

const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha]

function randStr(len) {
  return [...Array(len)]
  .map(i => base[Math.random()*base.length|0])
  .join('');
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  randStr,
  randInt
}
