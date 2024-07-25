# 2020臺灣總統大選情報站 2020 Taiwan Presidential Election Election Hub

## 線上瀏覽

https://chunkimi.github.io/vote-inquiry/#/

## 作品說明

**多樣圖表洞悉選舉樣貌 × 開票地圖及即時選情報導 × 從各級行政區到政黨視角全面掌握選票變化**

本專案為選票查詢與分析平台，藉臺灣2020-2012三屆總統大選真實選票數據，企劃模擬以動物為候選人，透過圖表檢視與分析各級行政區與各政黨選票數據分佈與分析，畫面依使用者友善。

- **選票資料轉換**：[excel-to-json](https://github.com/fionasgithub/excel-to-json)
- **開票地圖與即時選情**：使用 firestore realtime database 即時呈現開票結果。歷屆資料則存放在 storage。
- **視覺化圖表與多樣化選票觀看視角**：以多種圖表來呈現指定情境中歷屆選票狀況。
  - 各級行政區分析：支援從縣市、鄉鎮市區、里三個層級檢視歷屆投開票情況、各政黨於該區域得票情況等。
  - 政黨分析：各區域投票優劣勢、歷屆得票趨勢走向、政黨於各級行政區的版圖變動

## 目錄

[開發者](#開發者)｜[作品說明](#作品說明)｜[操作](#操作)｜[開發技術](#開發工具)｜[開發筆記](#開發筆記)｜[資料夾與放置內容說明](#資料夾與放置內容說明)｜[數據與素材來源](#數據與素材來源)

## 操作

### 線上瀏覽與查詢

[2020臺灣總統大選情報站 2020 Taiwan Presidential Election Election Hub](https://chunkimi.github.io/vote-inquiry/#/)

### 下載後開發環境運行

1. git clone https://github.com/chunkimi/vote-inquiry.git
1. npm install - 安裝套件
1. npm run dev - 運行 dev 環境

## 開發技術

### Node.js version

v18.18.2

### 使用技術

- [vite](https://vitejs.dev/)
- [vue 3](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [pinia](https://pinia.vuejs.org/)
- [bootstrap 5](https://getbootstrap.com/)
- [bootstrap-icons](https://icons.getbootstrap.com/)
- [sass](https://sass-lang.com/)
- [d3.js](https://d3js.org/)
- [chart.js](https://www.chartjs.org/)
- [vueuse](https://vueuse.org/)
- [firebase](https://firebase.google.com/)
- [vuefire](https://vuefire.vuejs.org/)
- [topojson-client](https://github.com/topojson/topojson) - to parse topojson to geojson format

### 其他工具

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [husky](https://typicode.github.io/husky/)

### Plugin Upgrade tool

- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

### 部署

- [Github Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)

### Firebase 相關

#### Firebase Storage

- CORS setting: <https://firebase.google.com/docs/storage/web/download-files#cors_configuration>

## 數據與素材來源

#### 選票

- [中選會選舉資料庫](https://db.cec.gov.tw/ElecTable/Election?type=President)

#### 圖像

- https://www.irasutoya.com/

#### 文字

- 文案：開發團隊撰稿，部分使用ChatGPT生成或潤飾。

## 資料夾說明

- public - ico 圖片放置
- src
  - assets - 圖片放置處
  - components - 元件放置處
  - data - 基本資料放置處，如：行政區選單、候選人名單等資訊
  - plugins - 放置第三方套件的設定
  - router - 前端路由設定
  - stores - 全域狀態管理
  - styles - global style 設定、客製化 bootstrap styles
  - utils - 共用小工具放置處
  - views - 畫面放置處

## 開發筆記

#### 行政區相關

- 行政區選單顯示的名稱，需要根據當年的行政區劃來調整，因為可能會有升格或其他調整

#### 地圖相關

- 採用 d3.js 繪製地圖
- 選擇 [topojson](src/data/tw-topo.json) 的格式，大幅縮減檔案大小，從大約 10MB 縮減到 49KB
- 使用 `COUNTYID` 作為辨識行政區的代碼，避免行政區名稱不同，例如：桃園市 和 桃園縣，詳情可見匹配表 [src/data/city_id_map.json](src/data/city_id_map.json)。

#### Variables Naming Consistency

- 因為有遇到地圖提供的縣市名稱是 county, 但在前期已經使用 city 作為變數名稱，最後決定維持資料一致性， firebase 上的資料也使用 City 作為 id 名稱。

#### git

##### git flow

1. 主要分支名稱: main
2. 依照各項功能、頁面或元件建立 branch
3. 開發完畢，則 push 到 repo，開 PR 請對方 code review
4. code review 完則 merge

##### git conflict

如果開發到一半想更新專案到 main branch 的最新進度，或是 push 到 origin 前，要先將 branch 更新到最新進度：

1. 先將 main branch merge 回 feature branch
2. 確認是否有衝突，解好衝突後請務必先 commit
3. commit 之後再進行 push to origin，或是繼續開發

## 開發者

### 匿名山羌 Incognito Formosan Muntjac © 2023

UI設計、選票資料處理、前端：Fiona
內容企劃、wireframe、前端：Kimi
