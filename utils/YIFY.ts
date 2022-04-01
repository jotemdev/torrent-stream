import { searchQuery } from '../types';

export const baseUrl = 'https://yts.mx/api/v2/list_movies.json';
export const getSearchUrl = (query: searchQuery) =>
  `${baseUrl}?query_term=${query}`;

export const torrentTrackers = [
  'wss://tracker.fastcast.nz',
  'wss://tracker.btorrent.xyz',
  'wss://tracker.webtorrent.io',
  'wss://tracker.novage.com.ua',
  'wss://peertube2.cpy.re/tracker/socket',
  'wss://tracker.openwebtorrent.com',
  'wss://tracker.files.fm:7073/announce',
  'wss://spacetradersapi-chatbox.herokuapp.com:443/announce',
  'wss://qot.abiir.top:443/announce',
  'ws://tracker.files.fm:7072/announce',
  'ws://hub.bugout.link:80/announce',
];

export const getMagnetLink = (torrentHash: string, torrentName: string) => {
  const trackers = torrentTrackers
    .map((t) => encodeURIComponent(t))
    .join('&tr=');
  const dn = torrentName.replace(/ /g, '+');

  return `magnet:?xt=urn:btih:${torrentHash}&dn=${dn}&tr=${trackers}`;
};
