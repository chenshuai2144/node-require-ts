import * as ts from "typescript";
import compile from "./compile";
import path, { join } from "path";
import importFresh from "import-fresh";

export = (filePath: string) => {
  const outDir = join(__dirname, "../.cache");
  const fileName = path.basename(filePath).replace(".ts", ".js");
  compile([filePath], {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    outDir
  } as ts.CompilerOptions);
  const msg = importFresh(join(outDir, fileName)) as {
    default: any;
  };
  return msg.default ? msg.default : msg;
};
