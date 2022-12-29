const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
var updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

export const date = () => dayjs().format();
export const relativeDate = (prevDate: string, short = false) => {
  if (short) {
    dayjs.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s',
        s: '0s',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dyears',
      },
    });
  } else {
    dayjs.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
      },
    });
  }
  return dayjs(prevDate).fromNow();
};
