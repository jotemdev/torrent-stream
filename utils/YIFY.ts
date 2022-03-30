import { searchQuery } from '../types';

export const baseUrl = 'https://yts.mx/api/v2/list_movies.json';
export const getSearchUrl = (query: searchQuery) =>
  `${baseUrl}?query_term=${query}`;

export const torrentTrackers = [
  'udp://wambo.club:1337/announce',
  'udp://tracker.dutchtracking.com:6969/announce',
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.leechers-paradise.org:6969',
  'udp://coppersurfer.tk:6969/announce',
];

export const getMagnetLink = (torrentHash: string, torrentName: string) => {
  const trackers = torrentTrackers
    .map((t) => encodeURIComponent(t))
    .join('&tr=');
  const dn = torrentName.replace(/ /g, '+');

  return `magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=blabla&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`;
};
