# 2023 The F2E Mission 2 - 總統即時開票全台地圖

## 作品說明

透過圖表檢視市、區、里的歷史數據分布，畫面依使用者友善

## 系統說明

- npm install - 安裝套件
- npm run dev - 運行 dev 環境

## Node.js version

v18.18.2

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

## 使用技術

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

## 其他工具

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [husky](https://typicode.github.io/husky/)

## Firebase 相關

### Firebase Storage

- CORS setting: <https://firebase.google.com/docs/storage/web/download-files#cors_configuration>

### 開發筆記

#### 行政區相關

- 行政區選單顯示的名稱，需要根據當年的行政區劃來調整，因為可能會有升格或其他調整

#### 地圖相關

- 採用 d3.js 繪製地圖
- 選擇 [topojson](src/data/tw-topo.json) 的格式，大幅縮減檔案大小，從大約 10MB 縮減到 49KB
- 使用 `COUNTYID` 作為辨識行政區的代碼，避免行政區名稱不同，例如：桃園市 和 桃園縣，詳情可見匹配表 [src/data/city_id_map.json](src/data/city_id_map.json)。

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
