export default function abbreviateNumber(number: number) {
  const SI_POSTFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  const sign = number < 0 ? '-1' : '';
  const absNumber = Math.abs(number);
  const tier = (Math.log10(absNumber) / 3) | 0;
  // if zero, we don't need a prefix
  if (tier == 0) return `${absNumber}`;
  // get postfix and determine scale
  const postfix = SI_POSTFIXES[tier];
  const scale = Math.pow(10, tier * 3);
  // scale the number
  const scaled = absNumber / scale;
  const floored = Math.floor(scaled * 10) / 10;
  // format number and add postfix as suffix
  let str = floored.toFixed(1);
  // remove '.0' case
  str = /\.0$/.test(str) ? str.substr(0, str.length - 2) : str;
  return `${sign}${str}${postfix}`;
}
