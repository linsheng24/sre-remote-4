- 說明你的專案採用哪個程式語言與資料庫

  - 專案採用 typescript 配合 nest.js 框架，架構上採用最簡單的架構，因為功能比較簡單，接近一個 prototype，單純在 AppModule 上開了 controller，並且所有邏輯在上面完成，沒有做邏輯切分。
  - 資料庫使用 RDS Mysql。

- 說明你的專案達成哪些需求及怎麼部署的，例如： 完成哪些功能、需求？ 快取做到什麼程度？ 排程工作的結果是否有儲存到 S3 或其他地方？

  - 目前專案使用 pm2 這個 process 管理的工具來啟動，並且自帶錯誤重啟的功能。
  - 完成 fake API 及 Query API，目前 cache 尚未補上。
  - 排程未使用 crontab，而是使用 nest 內建的 schedule module，由程式做管理，輸出結果目前單純用 console.log 做輸出。
