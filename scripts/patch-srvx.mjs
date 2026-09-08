import fs from 'node:fs'
import path from 'node:path'

const targets = [
  path.resolve(process.cwd(), 'node_modules/srvx/dist/adapters/node.mjs'),
  path.resolve(process.cwd(), '.output/server/index.mjs'),
]

for (const file of targets) {
  if (!fs.existsSync(file)) continue
  let content = fs.readFileSync(file, 'utf8')
  let changed = false

  // srvx / nitro node adapter bug: aborting on req "close" even when request was fully received
  const badPattern = /this\._node\.req\.once\(["']close["'],\s*\(\)\s*=>\s*\{\s*this\.#abortSignal\?\.abort\(\);\s*\}\);/g
  if (badPattern.test(content)) {
    content = content.replace(badPattern, `this._node.res.once("close", () => { if (!this._node.res.writableEnded) { this.#abortSignal?.abort(); } }); this._node.req.once("close", () => { if (!this._node.req.complete) { this.#abortSignal?.abort(); } });`)
    changed = true
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    console.log(`[patch-srvx] Successfully patched: ${path.relative(process.cwd(), file)}`)
  }
}
