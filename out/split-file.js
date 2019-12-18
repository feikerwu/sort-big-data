"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var resolve = function (filename) { return path.resolve(__dirname, filename); };
var splitedDir = 'splited';
fs.mkdir(resolve(splitedDir), { recursive: true }, function (err) { return console.error(err); });
var readStream = fs.createReadStream(resolve('big-data'), {
    highWaterMark: 8 * 10000 // 以固定大小读取文件
});
var count = 0;
readStream.on('data', function (chuck) {
    fs.writeFile(resolve(splitedDir + "/" + count++), chuck, function (err) {
        return console.error(err);
    });
});
readStream.on('end', function () {
    console.log('write end');
});
//# sourceMappingURL=split-file.js.map