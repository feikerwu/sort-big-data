import * as fs from 'fs';
import * as path from 'path';

const DATA_SIZE: number = 1000000;
const DATA_RANGE: number = 1000000;

const data: Array<number> = Array.from({ length: DATA_SIZE }).map(_ =>
  Math.floor(Math.random() * DATA_RANGE)
);

fs.writeFile(path.resolve(__dirname, 'big-data'), data.join('\n'), () => {});
