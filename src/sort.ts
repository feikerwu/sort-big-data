import * as fs from 'fs';
import * as path from 'path';

async function createStreams() {
  const files = await fs.promises.readdir(path.resolve(__dirname, 'splited'));
  const streams: Array<NodeJS.ReadableStream> = [];

  files.forEach(file => {
    const stream = fs.createReadStream(
      path.resolve(__dirname, `splited/${file}`),
      { highWaterMark: 8 * 100 }
    );
    streams.push(stream);
  });

  return streams;
}

async function sort() {
  const streams = await createStreams();

  const data = [];
  streams.forEach(stream => {
    let chuck = stream.read().toString();
    data.push(chuck.split(''));
  });

  let sortedData = [];
  let termData = [];

  for (let i = 0; i < data.length; i++) {}
}

async function writeData() {}
