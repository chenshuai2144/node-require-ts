"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ts = __importStar(require("typescript"));
const compile_1 = __importDefault(require("./compile"));
const path_1 = __importStar(require("path"));
const import_fresh_1 = __importDefault(require("import-fresh"));
module.exports = (filePath) => {
    const outDir = path_1.join(__dirname, "../.cache");
    const fileName = path_1.default.basename(filePath).replace(".ts", ".js");
    compile_1.default([filePath], {
        noEmitOnError: true,
        noImplicitAny: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS,
        outDir
    });
    const msg = import_fresh_1.default(path_1.join(outDir, fileName));
    return msg.default ? msg.default : msg;
};
