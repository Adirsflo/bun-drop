# Bun Drop - by Rida Abdal

## Installation

För att köra denna applikation, kör följande kommandon:

```bash
npm install
npm install react-router-dom
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/react-fontawesome@latest
```

För att starta JSON-servern, använd följande kommando:
```bash
npx json-server --watch db.json --port 3001
```
# Projektanalys

## Projektanalys: Bun Drop

### Projektbeskrivning och syfte:
Bun Drop är en webbapplikation byggd med React (Vite) som låter användare se och filtrera menyn, beställa produkter, betala och få ett kvitto. En komplett design skapades i Figma. Appen inkluderar funktioner för att skapa användarkonton och har en databas med tre huvudlistor: `menu`, `users` och `receipts`. `Menu` innehåller alla produkter kategoriserade, `users` lagrar skapade användare, och `receipts` innehåller beställningar med kvitton märkta med prefixet BD följt av nio siffror. Användare kan även spara favoritprodukter i sin profil.

### Projektets arkitektur och uppbyggnad:
Strukturen är byggd inuti `App.jsx` med nio sidor: `Account`, `Confirmation`, `Favorites`, `Home`, `Menu`, `NotFound`, `Order`, `Product` och `Receipts`. Varje sida innehåller nödvändiga komponenter för dess funktionalitet. `Order.jsx` var mest utmanande att utveckla då flera komponenter behövde samarbeta effektivt. Local Storage användes för att lagra en temporär varukorg (cart).

### Valda tekniska lösningar:
Jag valde att separera menyn och beställningsprocessen på två olika sidor: `Menu` och `Order`, för tydligare struktur och enklare navigering. De tekniska lösningarna inkluderade användning av hooks som `useEffect`, `useState`, `useLocation`, `useNavigate`, `useContext` och `useParams` för autentisering, dynamiska bakgrundsfärger och en timer för att räkna ner leveranstid. Font Awesome Icon-paketet och `react-router-dom` installerades för att förbättra användargränssnittet och navigeringen. Appen är även responsiv och anpassad för både stora och små skärmar.

### Utmaningar och lärdomar:
`Order`-sidan var den största utmaningen med att integrera flera komponenter och hantera UI/UX-samarbete. En annan utmaning var att justera antalet sidor och deras innehåll för att hinna med projektets deadline, vilket krävde prioritering av vissa funktioner och nedskärning av andra. En viktig lärdom var vikten av att designa med en "mobile-first"-strategi, då att inte göra detta från början ledde till extra arbete senare.

### Personlig reflektion
Genom detta projekt har jag lärt mig otroligt mycket på kort tid. Jag har insett vikten av att undvika kodupprepning och att arbeta effektivt för att undvika utbrändhet. Jag planerar att fortsätta utveckla mina CSS-kunskaper under sommaren och vidareutveckla Bun Drop för att förbättra användarupplevelsen.

Som framtida systemutvecklare har jag fått värdefulla insikter i hur man balanserar tekniska lösningar och användarvänlighet. Att reflektera över och lära av processen har varit en viktig del av min utveckling och jag ser fram emot att tillämpa dessa lärdomar i framtida projekt.
