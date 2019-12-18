import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

async function createReadlines() {
  const files = await fs.promises.readdir(path.resolve(__dirname, 'splited'));
  const channels: Array<readline.Interface> = files.map(file => {
    const stream = fs.createReadStream(
      path.resolve(__dirname, `splited/${file}`)
    );

    return readline.createInterface({
      input: stream
    });
  });

  return channels;
}

async function sort() {
  const distFile = fs.createWriteStream(path.resolve(__dirname, 'out'));
  const channels = await createReadlines();
  const srcData = Array.from(channels).map(item => []);

  channels.forEach((channel, index) => {
    channel.on('line', num => {
      srcData[index].push(+num);
    });
  });

  let termData = [];
  for (let i = 0; i < srcData.length; i++) {
    termData.push([i, srcData[i].shift()]);
  }

  let c = 100;
  while (c--) {
    let min = [-1, Infinity];
    let count = 0;
    for (let i = 0; i < termData.length; i++) {
      if (termData[i][0] === -1) {
        count = count + 1;
      } else {
        if (min[1] > termData[i][1]) {
          min = termData;
        }
      }
    }

    const [index, value] = min;
    if (index !== -1 && srcData[index].length !== 0) {
      termData[index] = [index, srcData[index].shift()];
    } else {
      termData[index] = [-1, Infinity];
    }

    distFile.write(`${value} `);

    // 数据被处理完了
    if (count === termData.length) {
      break;
    }
  }
}

sort();
