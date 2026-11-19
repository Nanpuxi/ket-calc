# 部署到 GitHub Pages

## 目录结构（必须是这样）

仓库根目录第一眼就要看到这些，不能多套一层同名文件夹：

```
ket-calc/
├── .github/workflows/deploy.yml   ← 自动部署
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── vite.config.js
├── DEPLOY.md
├── src/
├── test/
```

**错误示例**（会导致 `Dependencies lock file is not found` 或找不到 package.json）：

```
ket-calc/
└── ket-calc/      ← 多了一层！
    ├── package.json
    └── ...
```

## 上传要点

1. 解压后**进入** `ket-calc` 文件夹，把里面的内容全选拖到仓库根目录。
2. 不要拖外层文件夹本身。
3. `.github` 是隐藏文件夹，确认它一起传上去了。
4. 不要上传 `node_modules` 和 `dist`（`.gitignore` 已忽略）。

## 为什么不用 package-lock.json

工作流使用 `npm install` 而不是 `npm ci`，因此不依赖 lock 文件。
这样即使仓库里没有 `package-lock.json` 也不会中断构建。

代价是每次安装依赖会多花十几秒，且版本可能略有浮动，
对这个自测工具没有影响。

## 开启 Pages

Actions 跑绿后：Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。

访问地址：`https://<用户名>.github.io/<仓库名>/`

## 本地验证

```bash
npm install
npm run test      # 应输出 36 项断言通过
npm run build     # 应生成 dist/
```

## 白屏排查

打开页面空白，九成是 `base` 路径不对。
工作流已通过 `VITE_BASE=/<仓库名>/` 自动设置，若仍白屏，
检查浏览器 Console 的资源 404 路径，把 `vite.config.js` 的 `base` 手动改成对应值。

## 备选：Netlify

Build command: `npm run build`
Publish directory: `dist`
（`netlify.toml` 已配置好 SPA 重定向）
