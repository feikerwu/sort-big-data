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
var DATA_SIZE = 1000000;
var DATA_RANGE = 1000000;
var data = Array.from({ length: DATA_SIZE }).map(function (_) {
    return Math.floor(Math.random() * DATA_RANGE);
});
fs.writeFile(path.resolve(__dirname, 'big-data'), data.join(' '), function () { });
//# sourceMappingURL=index.js.map