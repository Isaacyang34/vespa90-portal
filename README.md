# Vespa 90 (V9A1T) 經典維修圖資與技術手冊中心 🛵

專為 Piaggio Vespa 90 (V9A1T / Smallframe) 車主、翻新愛好者與機車工作室打造的現代化互動式維修手冊與圖資平台。

---

## 🌟 核心功能

1. **原廠規格與調校數據速查 (Specifications)**
   - 點火正時：`19° BTDC` (上死點前 19 度)
   - 白金間隙 (Breaker Point Gap)：`0.3 ~ 0.5 mm`
   - 火星塞規格：`NGK B6HS / Bosch W7AC` (間隙 0.5 ~ 0.6 mm)
   - 機油混合比：`2.0% (1:50)` 二行程專用油
   - 齒輪箱油：`SAE 30 專用礦物油` (容量約 250cc)
   - 輪胎與胎壓：`3.00-10 吋` (前 18 psi，後 25~32 psi)

2. **全車爆炸圖與原廠手冊直連 (Exploded Diagrams)**
   - **ScooterHelp 原廠備件手冊 PDF (6.4MB)** 直連下載
   - **Scooter Center 16 大分解系統導航**（含前期 c-5035 與後期 c-5213 專用分類圖紙）
   - **SIP Scootershop** 原廠料號直達

3. **全車電系線路圖互動檢視器 (Wiring Diagrams)**
   - 義大利標準「無電瓶純交流 6V 版」與「外銷附 6V 電瓶 / 方向燈 / 鎖頭版」雙切換
   - 義大利原廠導線色碼高亮追蹤 (Rosso 紅、Verde 綠、Giallo 黃、Blu 藍、Nero 黑)
   - 常見電系故障排除（踩煞車熄火、按熄火鈕無效、車燈昏暗排查）

4. **二行程預混油比計算機 (2T Pre-mix Calculator)**
   - 支援 2.0% (1:50 原廠標準)、2.5% (夏季雙載)、3.0% (爬坡)、4.0% (新缸磨合) 及自訂比
   - 視覺化機油量杯刻度動畫與加油站標準 SOP

5. **車架號碼 (Chassis VIN) 判定器**
   - 以分水嶺號碼 `V9A1T 141544` 自動判定「前期小側蓋」或「後期大側蓋」
   - 推估出廠年份與外觀特徵對照

6. **精密翻新數據與維修日誌 (Restoration Log)**
   - 曲軸箱培林 (6303, 6204)、油封 (Corteco 22.7x47x7, 19/20x32x7) 規格
   - Dell'Orto SHB 16/16 化油器出廠油嘴數值 (主 74 / 慢 42 / 阻 50)
   - 全車關鍵部位螺絲鎖緊扭力值 (Torque)
   - 瀏覽器本地儲存 (localStorage) 保養檢核表與修復花費紀錄

---

## 🚀 啟動方式

本專案採用 **Vite + React + TypeScript + Tailwind CSS** 建置：

```bash
# 進入專案目錄
cd vespa90-portal

# 安裝依賴（若尚未安裝）
npm install

# 啟動開發伺服器
npm run dev

# 建置正式版本
npm run build

# 本地預覽正式版本
npm run preview
```

---

## 📚 參考資料庫致謝

- **ScooterHelp.com**：原廠手冊與線路圖 PDF 資料庫
- **Scooter Center GmbH**：線上互動式爆炸圖
- **SIP Scootershop**：Vespa 零件料號與技術圖資
- **Piaggio & C. S.p.A.**：原廠設計圖紙與規格
