import { Y as Ye, B, u } from "./index-DPj0yza1.js";
import * as s from "fs";
import * as o from "path";
u();
var m = class extends Ye {
  constructor(t) {
    super(t), this.rootDir = o.resolve(t), s.existsSync(o.join(this.rootDir)) || s.mkdirSync(this.rootDir);
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
