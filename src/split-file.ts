import * as fs from 'fs';
import * as path from 'path';

const resolve = (filename: string) => path.resolve(__dirname, filename);

const splitedDir: string = 'splited';
fs.mkdir(resolve(splitedDir), { recursive: true }, err => console.error(err));

const readStream = fs.createReadStream(resolve('big-data'), {
  highWaterMark: 8 * 10000 // 以固定大小读取文件
});

let count = 0;

readStream.on('data', chuck => {
  fs.writeFile(resolve(`${splitedDir}/${count++}`), chuck, err =>
    console.error(err)
  );
});

readStream.on('end', () => {
  console.log('write end');
});
