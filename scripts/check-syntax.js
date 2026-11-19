#!/usr/bin/env node
/**
 * 轻量语法自检：对项目内所有 .js 文件执行 node --check，
 * 在 CI 构建前提前拦截「括号未闭合 / 缺分号」这类语法错误。
 * 相比让 rollup 报错，这里的定位更准（rollup 报的列位置经常偏移）。
 *
 * 注意：项目 package.json 声明了 "type": "module"，本文件必须用 ESM 写法。
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) walk(full, out)
    else if (name.endsWith('.js')) out.push(full)
  }
  return out
}

const files = walk(root)
let failed = 0

for (const f of files) {
  try {
    execSync(`node --check "${f}"`, { stdio: 'pipe' })
  } catch (e) {
    failed++
    const msg = String(e.stderr || e.message)
      .split('\n')
      .filter(l => l.trim())
      .slice(0, 4)
      .join('\n      ')
    console.error(`❌ ${path.relative(root, f)}\n      ${msg}`)
  }
}

if (failed) {
  console.error(`\n语法检查：${failed} 个文件存在语法错误`)
  process.exit(1)
}
console.log(`✅ 语法检查通过（共 ${files.length} 个 .js 文件）`)
