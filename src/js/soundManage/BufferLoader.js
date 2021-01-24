class BufferLoader {
  constructor(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    const loader = this;

    request.onload = () => {
      loader.context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            // eslint-disable-next-line no-alert
            alert(`error decoding file ${url}`);
            return;
          }
          loader.bufferList[index] = buffer;
          loader.loadCount += 1;
          if (loader.loadCount === loader.urlList.length) {
            loader.onload(loader.bufferList);
          }
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log(`decodeAudioData error, ${error}`);
        }
      );
    };
    request.onerror = () => {
      // eslint-disable-next-line no-console
      console.log(`BufferLoader: XHR error`);
    };

    request.send();
  }

  load() {
    for (let i = 0; i < this.urlList.length; i++) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

export default BufferLoader;
