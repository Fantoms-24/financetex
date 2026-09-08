import { Y as Ye, B, u } from "./index-BBojcZ50.js";
import * as s from "fs";
import * as require$$0 from "path";
u();
var m = class extends Ye {
  constructor(t) {
    super(t), this.rootDir = require$$0.resolve(t), s.existsSync(require$$0.join(this.rootDir)) || s.mkdirSync(this.rootDir);
  }
  async init(t, e) {
    return this.pg = t, { emscriptenOpts: { ...e, preRun: [...e.preRun || [], (r) => {
      let c = r.FS.filesystems.NODEFS;
      r.FS.mkdir(B), r.FS.mount(c, { root: this.rootDir }, B);
    }] } };
  }
  async closeFs() {
    this.pg.Module.FS.quit();
  }
};
export {
  m as NodeFS
};
