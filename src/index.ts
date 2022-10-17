import * as ts from "typescript";
import compile from "./compile";
import path, { join } from "path";
import importFresh from "import-fresh";

export = (filePath: string) => {
  const outDir = join(__dirname, "../.cache");
  const fileName = path.basename(filePath).replace(".ts", ".js");
  const index = compile([filePath], {
    noEmitOnError: false,
    noImplicitAny: false,
    allowJs: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    outDir,
    skipLibCheck: true,
  } as ts.CompilerOptions);
  if (index !== 0) {
    throw new Error("编译失败");
  }
  const msg = importFresh(join(outDir, fileName)) as {
    default: any;
  };
  return msg.default ? msg.default : msg;
};
