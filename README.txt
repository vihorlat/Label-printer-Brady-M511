README - Brady Web SDK – HTML + JS verzia
=========================================

Tento projekt je jednoduchá webová aplikácia na interakciu s tlačiarňou Brady M511 cez Brady Web SDK
a Bluetooth Low Energy (BLE). Aplikácia umožňuje:

 Vyhľadanie a pripojenie k BLE tlačiarni  
 Tlač PDF alebo obrázka ako bitmapy  
 Voľbu počtu kópií a typu rezania  
 Výber šablóny labelu (PDF) s preview  
 Upload vlastného obrázka alebo PDF  
 Ovládanie: Feed, Cut, Disconnect  

-----------------------------------------

 STRUKTÚRA PROJEKTU
-------------------------
- `index.html` - hlavná HTML stránka
- `script.js` - JavaScript logika + BLE + renderovanie PDF
- `style.css` - vzhľad aplikácie
- `node_modules` - bundle.js pre fungovanie brady web sdk
- `templates` - predvolené .pdf súbory 
-----------------------------------------

 HTML PREHĽAD (index.html)
-------------------------

- `<button id="startBleScanButton">`  
  Spustí skenovanie BLE zariadení a pripojenie k tlačiarni.

- `<input type="file" id="image_uploads" ...>`  
  Umožňuje nahrať obrázok alebo PDF. Automaticky sa zobrazí náhľad.

- `<div class="preview">`  
  Tu sa zobrazí náhľad obrázka, ktorý sa bude tlačiť.

- `<button id="printBitmapButton">Print</button>`  
  Tlačí aktuálny obrázok (`imageToPrint`) ako bitmapu.

- `<select id="cutOptions">`  
  Umožňuje zvoliť štýl rezania po vytlačení.

- `<input id="numCopies">`  
  Počet vytlačených kópií.

- Label buttons (Label 1, Label 2, Warning)  
  Načítajú šablónu z `/templates/*.pdf`, konvertujú ju na PNG a ukážu v náhľade.

- `<p id="statusLabel">`  
  Dynamicky zobrazuje stav tlačiarne alebo výsledok akcie.

-----------------------------------------

 SCRIPT.JS - HLAVNÁ FUNKCIONALITA
-------------------------

### SDK inicializácia:
```js
const bradySdk = new BradySdk(printerUpdatesCallback, false)
```
Inicializuje Brady Web SDK a nastaví callback na zmeny stavu tlačiarne.

---

### BLE skenovanie a pripojenie:
```js
await bradySdk.showDiscoveredBleDevices()
```
Zobrazí modálne okno s BLE zariadeniami. Po úspešnom spojení zobrazí "Successfully Connected!".

---

### Upload a preview obrázkov/PDF:
```js
input.addEventListener('change', updateImageDisplay)
```
Ak je PDF, konvertuje sa na obrázok cez `pdf.js`, inak sa len zobrazí obrázok.

---

### PDF konverzia (pdf.js):
```js
const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
const page = await pdf.getPage(1)
page.render(...).promise
```
Konvertuje 1. stranu PDF na PNG (base64) a zobrazí v `<img>`.

---

### Výber šablóny (Label 1, 2, Warning):
```js
async function selectTemplate(templateName)
```
Načíta PDF zo `/templates/`, zobrazí jeho náhľad a nastaví ako `imageToPrint`.

---

### Tlač:
```js
await bradySdk.printBitmap(imageToPrint, 0.2, 0.0)
```
Tlačí obrázok ako bitmapu s daným offsetom. Predtým nastaví `copies`, `cutOption`, a `cutAfterRow`.

---

### Feed, Cut, Disconnect:
Príkazy:
```js
await bradySdk.feed()
await bradySdk.cut()
await bradySdk.disconnect()
```

---

### Stavový výpis:
```js
statusLabel.innerText = `
PrinterStatus: ${bradySdk.status}
PrinterName: ${bradySdk.printerName}
...`
```
Zobrazí všetky dôležité parametre z Brady SDK vrátane typu média, DPI, batérie atď.

---

 DOPLNKY
-------------------------

- `window.toggleCutAfterRowOption()`  
  Ukáže/skryje `cutAfterRowOption` input podľa vybranej hodnoty.

- `localStorage.setItem("imageToPrint", ...)`  
  Ukladá naposledy použitý obrázok lokálne.

---

 ZÁVISLOSTI
-------------------------
- Brady Web SDK (`@bradycorporation/brady-web-sdk`)
- PDF.js (`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/...`)

---

 POZNÁMKY
-------------------------
- Funkcia `selectTemplate(...)` sa volá z HTML cez `onclick`, takže je potrebné ju zverejniť:
  ```js
  window.selectTemplate = selectTemplate
  ```
  (inak nebude fungovať kliknutie na tlačidlá šablón)


---

 Webové aplikácie
----------------------

 Podporované:
JavaScript / TypeScript (s/bez frameworku)

React

Vue.js

Angular

Next.js (na strane klienta)

Svelte (cez JS importy)

REST API – môžeš volať z ľubovoľného frontend frameworku

---

Integrácia-Angular
----------------------

import { BradyPrinter } from 'brady-web-sdk';
const printer = new BradyPrinter();
