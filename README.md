# 科学ADV中文资料站

Astro 静态资料导航模板，计划发布至 https://syun1524.github.io 。重点是系列作品简介、游戏获取渠道，以及剧情、资料与音乐衍生内容汇总，而非重建通用角色百科。模板使用原创排版和占位文字，不包含游戏图片或英文站转载内容。

## 开始使用

1. 在 VS Code 中打开 **sciadv-wiki 文件夹**，不是上层游戏目录。
2. 在“终端 → 新建终端”中运行：

```powershell
npm run dev
```

3. 打开终端显示的本地网址，通常为 http://localhost:4321 。保持终端运行；按 Ctrl+C 停止普通前台服务器。
4. 作品页编辑 `src/content/works/`；衍生记录写入 `src/content/side-content/`。辅助资料文章仍在 `src/content/wiki/`。保存后查看网页。

本次搭建已启动后台服务器，当前可访问 http://127.0.0.1:4321/ ，无需再重复启动。可在网站文件夹的终端管理：

```powershell
npm run astro -- dev status
npm run astro -- dev stop
npm run dev -- --background --host 127.0.0.1
```

这三条命令分别用于查看状态、停止、重新启动后台预览。后台预览只监听本机，不对局域网开放。重启电脑后需重新启动。

首次在其他电脑使用：安装符合 `package.json` 要求的 Node.js，然后运行 `npm ci`。

## 录入作品与衍生内容

### 作品栏目

编辑 `src/content/works/` 中对应作品的 Markdown。新增栏目时将 [作品模板](templates/work.md) 复制到此处，并改为英文文件名，例如 `new-work.md`，网址为 `/works/new-work/`。设为 `draft: false` 后，首页、侧栏和作品导航自动加入该作品，不必再修改 TypeScript。

| 字段 | 用途 |
| --- | --- |
| `name` / `title` | 统一作品名称 / 中文显示名称，必填 |
| `description` | 不含剧透的简述，必填 |
| `order` | 导航排列顺序，不代表推荐阅读顺序 |
| `cover` | 可省略；有权使用的封面路径，例如 `/images/chaos-head.jpg` |
| `platforms` / `languages` | 经核实的平台 / 语言列表；未知时保持 `[]` |
| `links` | 官网、商店、补丁、攻略等链接，结构见下文 |
| `updated` / `draft` | YYYY-MM-DD 更新日期 / 是否隐藏，模板默认隐藏 |

作品正文用于简介、版本说明与阅读建议。当前八个作品页都是待填写栏目，不是完整游戏、版本或发行清单；可用模板继续扩充。空平台、语言和获取链接会明确显示待补充，不会自动推荐未经核实的资源。

### 衍生目录（Side Content）

将 [衍生内容模板](templates/side-content.md) 复制到 `src/content/side-content/`，一项发行作品一个文件，例如 `my-drama-cd.md`。核实后设为 `draft: false`，网址自动变为 `/side-content/my-drama-cd/`。衍生目录、对应作品页和首页最近更新自动同步。

| 字段 | 用途 |
| --- | --- |
| `title` / `originalTitle` | 显示名称 / 原文名称；原文名称可省略 |
| `description` | 不含剧透的简述，必填 |
| `series` | 所属作品列表，与作品页的 `name` 一致；跨作品可写 `["CHAOS;HEAD", "STEINS;GATE"]` |
| `type` | 广播剧、小说、短篇、漫画、动画、舞台剧、设定集、访谈、资料书、原声带、歌曲、广播节目或其他 |
| `released` | 可省略；发行日期允许 YYYY、YYYY-MM 或 YYYY-MM-DD，不详时不要填写 |
| `prerequisites` | 阅读前置条件列表；空列表表示待补充，不代表无前置要求 |
| `chineseStatus` | 待核实、官方中文、有民间译本或暂无已知中文；需在正文提供依据 |
| `links` / `tags` | 来源、获取链接 / 无剧透的检索关键词 |
| `updated` / `spoiler` / `draft` | 更新日期 / 是否折叠正文 / 是否隐藏 |

衍生目录支持关键词、作品和类型组合筛选；跨作品记录会在每个所属作品下出现，但只保留一份文件。搜索不检索正文与前置条件。`spoiler: true` 只折叠正文，名称、简介、前置条件、标签和链接仍公开，不能把剧情揭秘放在这些字段中。

目前没有公开衍生记录。`src/content/side-content/draft-example.md` 是隐藏的虚构结构示例，不会发布，不应被当作真实作品。

### 链接录入格式

作品和衍生记录均可填写 `links`，未知时保留 `[]`。核实资源后使用以下 YAML 结构；示例网址必须替换，不是真实渠道：

```yaml
links:
  - label: "官网作品信息"
    url: "https://example.com/official-product"
    kind: "官方信息"
    note: "注明平台、语言、适用版本或访问限制"
```

`kind` 只允许：官方信息、购买、补丁、攻略、授权阅读/收听、译者发布、其他。网址必须为 HTTP(S)。获取渠道以正规商店、官方发布或获授权资源为主；“有民间译本”不等于获授权，不要直接搬运参考站的下载链接。正文列出资料依据，区分来源链接和获取链接。

## 辅助资料文章

将 [文章模板](templates/article.md) 复制到 `src/content/wiki/` 并更名，例如 `my-character.md`。填入顶部信息，写好正文，再将 `draft: true` 改为 `draft: false`。页面地址自动变为 `/wiki/my-character/`，资料文章索引、搜索和分类会自动更新。现有文章及网址保留，但人物与术语不是本站重点。

| 字段 | 用途 |
| --- | --- |
| `title` | 条目标题，必填 |
| `description` | 不含剧透的简介，必填 |
| `category` | 只能是作品、人物、术语、指南 |
| `series` | 所属作品；为保持筛选一致，请统一写法，例如 CHAOS;HEAD |
| `tags` | 标签列表，例如 `["主人公", "视觉小说"]` |
| `updated` | 更新日期，格式 YYYY-MM-DD |
| `spoiler` | true 时正文默认折叠，标题、简介和标签仍公开 |
| `draft` | true 时不生成页面，也不纳入索引；本地也隐藏 |

草稿仍存在于源码中，**公开 GitHub 仓库中的草稿文件也公开**。剧透折叠不是安全措施，正文仍可从 HTML 源码查看。不要存放敏感信息。

正文以 `##` 二级标题开始。链接使用 `[西条拓巳](/wiki/nishijou-takumi/)`。图片放在 `public/images/` 中，引用方式为 `![图片说明](/images/example.jpg)`，请只上传有权使用的素材。

当前四篇公开资料文章为示例，正式上线前可自行修改或删除。角色介绍可用原创简述配合现有百科链接；如果希望转载，需逐站核对许可、署名等条件。更多写作说明见网站的 `/contribute/`。

## 首页与外观

页面保留传统百科式布局：左侧导航、顶部搜索、双列作品封面入口、分类链接和最近更新列表。配色为深蓝外围背景（#002D5C）、天蓝正文区（#2158C9）和浅色文字，搜索框、目录及封面占位也使用蓝色系；剧透提示文字保留淡黄色，代码块使用深蓝底以兼容语法高亮。首页和侧栏的作品链接现在进入独立作品页，旁边的“衍生内容”链接进入对应筛选目录。顶部搜索默认搜索衍生内容；辅助资料页面中搜索资料文章，作品导航另有自己的关键词筛选。布局参考旧科学ADV中文 wiki 的组织方式，但本项目不是旧站恢复，也不提供在线注册、讨论和编辑功能。本次配色调整没有新增依赖。

首页和侧栏的作品入口统一从 `src/content/works/` 生成。默认显示“封面待补充”，不会自动从其他网站下载图片。如有权使用封面，把文件放入 `public/images/`，为对应作品 Markdown 顶部增加：

```yaml
cover: "/images/chaos-head.jpg"
```

`name` 必须与衍生记录的 `series` 列表及辅助文章的 `series` 字段一致，才能匹配筛选。首页最近更新仅显示公开衍生记录，按 `updated` 日期排序，不是实际提交记录。全站配色和排版在 `src/styles/global.css` 中调整。

## 发布到 GitHub Pages

GitHub 仓库是网站源码的在线文件夹。主站地址 `Syun1524.github.io` 要使用同名仓库 **Syun1524.github.io**。

1. 登录 https://github.com ，点击右上角 **+ → New repository**。
2. Repository name 填 **Syun1524.github.io**，选择 **Public**。不要勾选自动创建 README、.gitignore 或许可证，然后点击 **Create repository**。如果同名仓库已存在，请先检查里面的内容，不要覆盖。
3. 在 VS Code 打开本网站文件夹。点击左侧“源代码管理”，选择“初始化存储库”。只初始化本网站文件夹，**不要初始化或上传上层游戏目录**。
4. 输入提交说明，例如“创建中文百科”，提交文件。Git 如要求身份，请填自己的名称与邮箱（可用 GitHub 提供的 noreply 邮箱）。不要填写密码或令牌到代码中。
5. 使用“发布分支”，通过 VS Code 的 GitHub 登录界面授权；若需要选择远程仓库，使用 `https://github.com/Syun1524/Syun1524.github.io.git`。确认默认分支为 **main**。不要另外发布同名的重复仓库。
6. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
7. 打开 **Actions → Deploy to GitHub Pages**。若首次推送时尚未设置 Pages 导致失败，设置后点击 **Re-run all jobs**，或用 **Run workflow** 手动运行。
8. 等构建和部署都出现绿色勾号，访问 https://syun1524.github.io 。只有完成这些步骤，才算正式上线。

熟悉终端后，也可以在空仓库创建完成、本地提交完成后使用以下命令关联并推送（身份认证由 GitHub 官方登录流程处理）：

```powershell
git branch -M main
git remote add origin https://github.com/Syun1524/Syun1524.github.io.git
git push -u origin main
```

后续更新：修改文章 → 保存 → 在源代码管理提交 → 同步更改。GitHub Actions 会自动重新发布。

## 检查与构建

```powershell
npm run build
npm run check
npm run preview
```

配置有误时，构建会给出文件名和错误。不要上传 `node_modules`、`dist`、`.astro` 或 `.npm-cache`，这些目录已经被忽略；**应上传 package-lock.json**，保证部署使用相同依赖。

当前上层目录名含分号，Windows 会将 npm 注入 PATH 的路径拆开，导致普通 `astro` 命令无法找到。本项目的 npm 脚本因此通过 Node 直接运行 Astro CLI，仍可使用上述命令，也兼容 GitHub 的 Linux 构建环境。

如果 npm 安装遇到缓存写入错误，可以仅对此项目改用独立缓存：

```powershell
npm ci --cache .\.npm-cache
```

## 结构与维护

- `src/content/works/`：作品栏目与获取渠道。
- `src/content/side-content/`：衍生内容记录。
- `src/content/wiki/`：辅助资料文章，保留原网址。
- `templates/work.md`、`templates/side-content.md`、`templates/article.md`：三类录入模板，默认草稿，不自动发布。
- `src/pages/`：首页、作品页、衍生目录、资料文章和编写指南。
- `src/styles/global.css`：颜色、排版、响应式布局。
- `src/content.config.ts`：内容字段与校验规则。
- `astro.config.mjs`：正式网址配置。
- `.github/workflows/deploy.yml`：自动部署。

本模板针对用户名主站部署，因此没有设置子目录 base。如果改用其他仓库名，需要同时调整 Astro base 与全站内部链接，不能只改仓库名。

百科文字请自行撰写并注明来源，图片和第三方内容请确认授权。本项目是非官方资料站，不代表作品权利方。
