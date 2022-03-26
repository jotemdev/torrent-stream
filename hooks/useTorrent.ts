import { useState, useEffect, useRef } from 'react';

import Torrent from '../utils/torrent';

interface IConfig {
  container: HTMLElement | null;
  progressIntervals?: number;
}

interface IFile {
  name: string;
  url: string;
  progress: string;
  isReady: boolean;
  isDownloading: boolean;
  appendTo: (element: HTMLElement) => void;
}

export default function useTorrent(config: IConfig) {
  const { progressIntervals, container } = config;

  const [file, setFile] = useState<IFile>({
    name: '',
    url: '',
    progress: '0',
    isReady: false,
    isDownloading: false,
    appendTo: () => {},
  });

  const [id, setId] = useState<string>('');

  let isMounted = useRef<boolean>(false);

  // Exampe torrentId: magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent
  const download = (torrentId: string) => setId(torrentId);

  useEffect(() => {
    isMounted.current = true;

    let torrent: Torrent;

    if (id) {
      torrent = new Torrent({
        id,
        container: '#video',
        progressIntervals,
        onStart: () => {
          setFile((prevState) => ({ ...prevState, isDownloading: true }));
        },
        onProgress: (progress) => {
          if (isMounted.current) {
            setFile((prevState) => ({ ...prevState, progress }));
          }
        },
        onDone: ({ name, url }) => {
          if (isMounted.current) {
            setFile((prevState) => ({
              ...prevState,
              name,
              url,
              isReady: true,
              isDownloading: false,
            }));
          }
        },
      });

      torrent.download();
    }

    return () => {
      if (torrent) {
        torrent.destroy();
      }

      isMounted.current = false;
    };
  }, [id]);

  return {
    name: file.name,
    url: file.url,
    progress: file.progress,
    isDownloading: file.isDownloading,
    isReady: file.isReady,
    appendTo: file.appendTo,
    download,
  };
}
