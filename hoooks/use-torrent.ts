import { useState, useEffect, useRef } from 'react';

import WebTorrent from 'webtorrent';

interface Config {
  progressIntervals: number;
}

interface File {
  name: string;
  url: string;
  progress: number;
  isReady: boolean;
  isDownloading: boolean;
  appendTo: (element: HTMLElement) => void;
}

export default function useTorrent(
  config: Config = { progressIntervals: 4000 },
) {
  const { progressIntervals } = config;

  const [file, setFile] = useState<File>({
    name: '',
    url: '',
    progress: 0,
    isReady: false,
    isDownloading: false,
    appendTo: () => {},
  });

  const [id, setId] = useState<string>('');

  const timer = useRef<NodeJS.Timer | null>(null);

  let isMounted = useRef<boolean>(false);

  // Exampe torrentId: magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent
  const download = (torrentId: string) => setId(torrentId);

  const clearTimer = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    isMounted.current = true;

    if (id) {
      const client = new WebTorrent();

      setFile((prevState) => ({
        ...prevState,
        isDownloading: true,
      }));

      const onTorrent = (torrent: any) => {
        // Update the progress.
        timer.current = setInterval(() => {
          if (isMounted.current) {
            setFile((prevState) => ({
              ...prevState,
              progress: parseInt((torrent.progress * 100).toFixed(1)),
            }));
          }
        }, progressIntervals);

        // On chunks ready.
        torrent.files.forEach((file: any) => {
          file.getBlobURL((err: Error, url: string) => {
            if (err) return console.log('Error: ', err.message);

            if (torrent.progress === 1) {
              clearTimer();

              setFile((prevState) => ({
                ...prevState,
                name: file.name,
                url,
                isReady: true,
                isDownloading: false,
                progress: 100,
                appendTo: (element) => file.appendTo(element),
              }));
            }
          });
        });
      };

      client.add(id, onTorrent);
    }

    return () => {
      clearTimer();

      isMounted.current = false;
    };
  }, [id]);

  return {
    file,
    download,
  };
}
