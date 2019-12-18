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
    let chuck = stream.read(8 * 100);
    // console.log(chuck);
    if (chuck) {
      data.push(chuck.toString().split(' '));
    }
  });

  let sortedData = [];
  let termData = []; // 中间文件，用于归并排序
  const canReadSignal = Array.from(data).fill(1); // 标志位，用于判断能否继续从stream读取数据

  for (let i = 0; i < data.length; i++) {
    termData.push([i, data[i].shift()]); // 初始化
  }

  while (true) {
    let min = [-1, Infinity];
    let count = 0; // 看缓冲区是否还有数据
    for (let i = 0; i < termData.length; i++) {
      if (termData[i][0] === -1) {
        count = count + 1;
      } else {
        if (min[1] > termData[i][1]) {
          min = termData;
        }
      }
    }

    if (count === termData.length) {
      break;
    }

    const chanel = min[0];

    sortedData.push(min[0][1]); // 获取最小值

    if (data[chanel].length) {
      termData[chanel] = [chanel, data[chanel].shift()]; // 内存中有数据，直接读
    } else if (canReadSignal[chanel]) {
      let curChuck = streams[chanel].read(); // 否则从硬盘读
      if (curChuck === null) {
        canReadSignal[chanel] === 0;
        termData = [-1, Infinity];
      } else {
        data[chanel] = curChuck.toString().split('');
      }
    }
  }

  // 写入目标文件
  fs.writeFile(path.resolve(__dirname, 'out'), sortedData.join(''), err =>
    err ? console.error(err) : null
  );
}

sort();
