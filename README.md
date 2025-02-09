# 2024 愛酷春酒 抽獎程式

根據當年的獎項與對應抽獎資格，設定 data.js 內的 lotteryConfig, pool，即可使用操作介面抽獎，資料會儲存在 local storage 裡。

- 單一獎項全數抽完後，可以下載名單截圖
- 可以匯出總中獎名單
- 加碼獎預設隱藏，點擊標題「2024 愛酷春酒」三次後才會出現
- 請假同仁的名單與預設獎項設定在 dayOffResult 裡，不會出現在抽獎畫面上，匯出總名單時才會放在檔案最下面

## 未來可改善方向

- 修正單一獎項截圖文字跑版
- 讓加碼獎的出現更澎湃
- 可查詢目前未中獎的名單，因 2024 最後有「一名頭獎與七名愛酷獎」一起揭曉的環節，若加上這功能，可直接唱名未中獎人到舞台
- 可納入[輪盤](https://wheelofnames.com/)，臨時有主管加碼或獎項捐出時可以用來抽獎

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
