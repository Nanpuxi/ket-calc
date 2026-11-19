# 部署到 GitHub Pages（不绑自定义域名）

## 你只需要做 4 步

1. 把整个 `ket-calc` 文件夹推到 GitHub 新仓库（VSCode → 初始化仓库 → 发布到 GitHub）
2. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**
3. 等 **Actions** 标签页的流水线跑出绿勾（约 1–2 分钟）
4. 访问 `https://<你的用户名>.github.io/<仓库名>/`

## 已经替你配好的

- `.github/workflows/deploy.yml`：推代码自动 `npm ci` → 测试 → 构建 → 部署
- `vite.config.js`：`base` 读 `VITE_BASE`，工作流自动注入 `/<仓库名>/`
- 构建后把 `index.html` 复制成 `404.html`，刷新子路由不会 404
- `package.json` 补了 `npm run test`

## 注意

- 仓库名随便起，`base` 会自动跟着变，不用手改代码
- 路由是 hash 模式（`#/ket`），404 兜底其实用不上，加了更保险
- 以后改代码只要 `git push`，自动上线
- 如果哪天想绑自定义域名：Settings → Pages → Custom domain，并把 base 改回 `/`
