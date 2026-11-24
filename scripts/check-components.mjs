import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import ts from "typescript"

const require = createRequire(import.meta.url)
const { chromium } = require("/Users/dmitryborisenko/.npm/_npx/7f4967a1621aa3dc/node_modules/playwright-core")
const root = process.cwd()
const registry = JSON.parse(readFileSync("registry.json", "utf8")).items
const manifests = Object.fromEntries(readdirSync("review/manifests").filter((f) => f.endsWith(".json")).map((f) => { const m = JSON.parse(readFileSync(`review/manifests/${f}`, "utf8")); return [m.slug, m] }))
const nav = JSON.parse(execFileSync("pnpm", ["exec", "tsx", "-e", 'import {docsNavigation} from "./lib/config/docs-navigation"; console.log(JSON.stringify(docsNavigation.flatMap(s=>s.items).filter(i=>!i.isComingSoon).map(i=>({slug:i.slug,href:i.href}))))'], { encoding: "utf8" }))
const navBySlug = new Map(nav.map((i) => [i.slug, i.href]))
const results = Object.fromEntries(registry.map((item) => [item.name, { slug: item.name, href: navBySlug.get(item.name) ?? null, verdict: manifests[item.name]?.verdict ?? null, js: null, jsOwn: null, problems: [], checks: [] }]))
const add = (item, problem) => { if (!results[item].problems.includes(problem)) results[item].problems.push(problem) }
const DIALOGS = new Set(["alert", "confirm", "prompt"])
const dialogCalls = (file, source) => {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const found = []
  const walk = (node) => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression
      const bare = ts.isIdentifier(callee) && DIALOGS.has(callee.text)
      const global = ts.isPropertyAccessExpression(callee) && DIALOGS.has(callee.name.text) && ts.isIdentifier(callee.expression) && ["window", "globalThis", "self"].includes(callee.expression.text)
      if (bare || global) found.push(callee.getText(tree))
    }
    ts.forEachChild(node, walk)
  }
  walk(tree)
  return found
}
mkdirSync("review/shots", { recursive: true })
for (const file of readdirSync("review/shots")) if (file.endsWith(".png")) unlinkSync(path.join("review/shots", file))
try {
  const measure = path.join(root, "review/.measure-js.json")
  execFileSync(process.execPath, ["scripts/measure-js.mjs", "--json", measure], { stdio: "ignore", timeout: 120000 })
  for (const row of JSON.parse(readFileSync(measure, "utf8"))) if (results[row.name]) { results[row.name].js = row.total; results[row.name].jsOwn = row.shipped }
  unlinkSync(measure)
} catch (error) { console.error(`Не удалось измерить JS: ${error.message}`) }
for (const item of registry) {
  for (const file of item.files ?? []) {
    if (!existsSync(file.path)) { add(item.name, `Нет файла: ${file.path}`); continue }
    const source = readFileSync(file.path, "utf8")
    if (file.path !== "registry/gooseui/hooks/use-keyboard-layout.ts" && /[А-Яа-яЁё]/u.test(source)) add(item.name, `Кириллица: ${file.path}`)
    const tree = ts.createSourceFile(file.path, source, ts.ScriptTarget.Latest, true, file.path.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
    for (const call of dialogCalls(file.path, source)) add(item.name, `Системный диалог вместо тоста: ${call}() в ${file.path}`)
    const imports = []
    const visit = (node) => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text)
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(tree) === "require") && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text)
      ts.forEachChild(node, visit)
    }
    visit(tree)
    for (const spec of imports) {
      if (/^(next\/|next-intl(?:\/|$))/.test(spec)) add(item.name, `Запрещённый импорт: ${spec}`)
      if (spec.startsWith("@/registry/") && item.files.some((f) => f.path.replace(/\.[^.]+$/, "") === spec.slice(2))) {
        // a file of the same item (client island), not a dependency
      } else if (spec.startsWith("@/registry/")) {
        const slug = path.basename(spec).replace(/\.[^.]+$/, "")
        if (!(item.registryDependencies ?? []).includes(`@gooseui/${slug}`)) add(item.name, `Нет registryDependency: @gooseui/${slug}`)
      } else if (!spec.startsWith(".") && !spec.startsWith("@/") && !spec.startsWith("node:") && !/^react(-dom)?(\/|$)/.test(spec)) {
        const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
        if (!(item.dependencies ?? []).some((dep) => dep === pkg || dep.startsWith(`${pkg}@`))) add(item.name, `Нет dependency: ${pkg}`)
      }
    }
  }
}
for (const item of registry) {
  const href = navBySlug.get(item.name)
  if (!href) continue
  const dir = path.join("app/[locale]/(docs)", href)
  if (!existsSync(dir)) continue
  for (const name of readdirSync(dir)) {
    if (!/\.tsx?$/.test(name)) continue
    for (const call of dialogCalls(name, readFileSync(path.join(dir, name), "utf8"))) add(item.name, `Системный диалог вместо тоста: ${call}() в ${path.join(dir, name)}`)
  }
}
const axe = "/Users/dmitryborisenko/.npm/_npx/8003d8991b0d346b/node_modules/axe-core/axe.min.js"
const browser = await chromium.launch({ channel: "chrome", headless: true })
const deadline = setTimeout(() => {
  writeFileSync("review/results.json", `${JSON.stringify(results, null, 2)}\n`)
  console.error("Общий таймаут проверки: сохранены частичные результаты")
  void browser.close().finally(() => process.exit(1))
}, 45 * 60 * 1000)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function runPage(item, locale, width, js = true, theme = "light") {
  const label = `${locale} ${width}${js ? ` ${theme}` : " без JS"}`
  const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: js })
  await context.addInitScript((value) => { localStorage.setItem("theme", value) }, theme)
  const page = await context.newPage()
  const timeout = setTimeout(() => { void context.close().catch(() => {}) }, 90000)
  const errors = []
  const record = (message) => { if (!/<path> attribute d.*undefined/i.test(message) && !/favicon\.ico/.test(message) && !/status of 403/.test(message)) errors.push(message.slice(0, 300)) }
  page.on("pageerror", (error) => record(`pageerror: ${error.message}`))
  page.on("console", (msg) => { if (msg.type() === "error" || /hydrat/i.test(msg.text())) record(`console: ${msg.text()}`) })
  const url = `http://localhost:3003${locale === "ru" ? "/ru" : ""}${navBySlug.get(item.name)}`
  try {
    let response
    for (let attempt = 0; attempt < 2; attempt++) {
      response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 })
      if (response?.status() !== 404 && response?.status() !== 500) break
      if (!attempt) { errors.length = 0; await sleep(20000) }
    }
    const status = response?.status() ?? 0
    if (status !== 200) add(item.name, `${label}: HTTP ${status}`)
    else {
      await page.waitForTimeout(400)
      const info = await page.evaluate(() => {
        const heading = document.querySelector("h2#preview")
        const preview = heading?.nextElementSibling
        const rect = preview?.getBoundingClientRect()
        const text = Array.from(document.body.querySelectorAll("*")).filter((el) => !el.closest("[data-dev-only]") && !el.closest("script,style,noscript")).flatMap((el) => Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent)).join(" ")
        return { preview: Boolean(preview && rect && rect.height > 0 && rect.width > 0 && (preview.textContent?.trim() || preview.querySelector("img,svg,canvas,video,input,button,iframe"))), overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, cyrillic: /[А-Яа-яЁё]/u.test(text) }
      })
      if (!info.preview) add(item.name, `${label}: пустое или отсутствует превью`)
      if (info.overflow) add(item.name, `${label}: горизонтальный скролл`)
      if (locale === "en" && info.cyrillic) add(item.name, `${label}: кириллица в видимом тексте`)
      if (js && locale === "en" && width === 1440) {
        const preview = page.locator("h2#preview + *").first()
        if (await preview.count() && await preview.isVisible()) await preview.screenshot({ path: `review/shots/${item.name}-${theme}.png`, timeout: 10000 }).catch((error) => add(item.name, `${label}: скриншот: ${error.message.slice(0, 150)}`))
        if (theme === "light" && existsSync(axe)) {
          await page.addScriptTag({ path: axe })
          const violations = await Promise.race([page.evaluate(async () => (await window.axe.run(document.querySelector("h2#preview + *") ?? document, { rules: { region: { enabled: false }, "landmark-unique": { enabled: false } } })).violations.map((v) => `${v.id} (${v.nodes.length})`)), sleep(10000).then(() => ["проверка превысила 10 секунд"])])
          for (const violation of violations) add(item.name, `${label}: axe ${violation}`)
        }
      }
    }
    for (const error of errors) add(item.name, `${label}: ${error}`)
    results[item.name].checks.push({ locale, width, js, theme, status })
  } catch (error) { add(item.name, `${label}: ${error.message.slice(0, 250)}`) }
  finally { clearTimeout(timeout); await context.close().catch(() => {}) }
}
const jobs = []
for (const item of registry) {
  if (!navBySlug.has(item.name)) continue
  for (const locale of ["en", "ru"]) for (const width of [1440, 375]) jobs.push(() => runPage(item, locale, width))
  jobs.push(() => runPage(item, "en", 1440, true, "dark"))
  if (manifests[item.name]?.verdict === "css-only") for (const locale of ["en", "ru"]) for (const width of [1440, 375]) jobs.push(() => runPage(item, locale, width, false))
}
let index = 0
await Promise.all(Array.from({ length: 4 }, async () => { while (index < jobs.length) { const n = index++; await jobs[n](); if ((n + 1) % 25 === 0) console.log(`Проверено страниц: ${n + 1}/${jobs.length}`) } }))
clearTimeout(deadline)
await browser.close()
writeFileSync("review/results.json", `${JSON.stringify(results, null, 2)}\n`)
console.log("slug                         проблемы")
for (const row of Object.values(results)) console.log(`${row.slug.padEnd(28)} ${row.problems.length}`)
console.log(`Всего: ${registry.length}; с проблемами: ${Object.values(results).filter((r) => r.problems.length).length}; браузерных проверок: ${jobs.length}`)
