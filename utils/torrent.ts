import WebTorrent from 'webtorrent';

interface ITorrentConfig {
  id: string;
  container?: HTMLElement | string;
  progressIntervals?: number;
  onStart?: () => void;
  onProgress?: (value: string) => void;
  onDone?: (data: { name: string; url: string }) => void;
}

export default class Torrent {
  private client: any;

  private timer?: NodeJS.Timer;

  private config?: ITorrentConfig;

  setConfig(config: ITorrentConfig): Torrent {
    this.config = config;

    return this;
  }

  download(): void {
    if (!this.config) {
      return;
    }

    const { id, container, progressIntervals, onStart, onProgress, onDone } =
      this.config;

    this.client.add(id, (torrent: any) => {
      const file = torrent.files.find((file: any) =>
        file.name.endsWith('.mp4'),
      );

      if (onStart) onStart();

      if (container) file.appendTo(container);

      if (onProgress) {
        this.timer = setInterval(
          () => onProgress((torrent.progress * 100).toFixed(1)),
          progressIntervals,
        );
      }

      torrent.on('done', () => {
        if (onProgress && this.timer) clearInterval(this.timer);

        file.getBlobURL((err: Error, url: string) => {
          if (err) return console.log('Error: ', err.message);

          if (onDone) onDone({ name: file.name, url });
        });
      });
    });
  }

  destroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  constructor(config: ITorrentConfig) {
    this.client = new WebTorrent();

    if (config) {
      this.config = config;
    }
  }
}
