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

### Projektbeskrivning och syfte
Bun Drop är en webbapplikation byggd med hjälp av React (Vite). Syftet med applikationen är att användare ska kunna se och filtrera menyn, beställa produkter, betala och få ett kvitto. Applikationen inkluderar även funktioner för att skapa användarkonton. Databasen är strukturerad med tre huvudlistor: `menu`, `users` och `receipts`. `menu` innehåller alla produkter kategoriserade, `users` lagrar alla skapade användare, och `receipts` innehåller alla beställningar. Varje kvitto är märkt med ett unikt ID som börjar med prefixet BD (Bun Drop) följt av nio siffror. Användare kan även spara sina favoritprodukter i sin profil.

### Projektets arkitektur och uppbyggnad
Jag började med att skissa upp de olika sidorna i Figma, vilket underlättade designprocessen med CSS. Strukturen för applikationen är byggd inuti `App.jsx` och består av nio sidor: Account, Confirmation, Favorites, Home, Menu, NotFound, Order, Product och Receipts. Varje sida innehåller de nödvändiga komponenterna för dess specifika funktionalitet. Den mest utmanande sidan var `Order.jsx`, där flera komponenter behöver samarbeta effektivt, vilket tog längst tid att utveckla.

### Valda tekniska lösningar
För att säkerställa en smidig användarupplevelse valde jag att separera menyn och beställningsprocessen på två olika sidor: Menu och Order. Detta bidrog till en tydligare struktur och enklare navigering. De tekniska lösningarna inkluderade användningen av olika hooks, såsom `useEffect`, `useState`, `useLocation`, `useNavigate`, `useContext` och `useParams`, för att hantera autentisering, dynamiska bakgrundsfärger och en timer för att räkna ner tiden till leverans.

För att förbättra användargränssnittet installerade jag Font Awesome Icon-paketet och använde `react-router-dom` för navigering mellan sidorna. Dessa verktyg var avgörande för att skapa en attraktiv och användarvänlig applikation.

### Utmaningar och lärdomar
Den största utmaningen var Order-sidan, där många komponenter behövde integreras och fungera tillsammans. Samarbete mellan olika UI/UX-komponenter var särskilt komplext och krävde noggrann hantering.

En annan utmaning var att justera antalet sidor och deras innehåll för att hinna med projektets deadline. Detta innebar att prioritera vissa funktioner och skära ner på andra.

En viktig insikt var vikten av att designa med en "mobile-first"-strategi. Att inte göra detta från början ledde till svårigheter och extra arbete för att anpassa designen senare.

### Personlig reflektion
Genom detta projekt har jag lärt mig otroligt mycket på kort tid. Jag har insett vikten av att undvika kodupprepning och att arbeta effektivt för att undvika utbrändhet. Jag planerar att fortsätta utveckla mina CSS-kunskaper under sommaren och vidareutveckla Bun Drop för att förbättra användarupplevelsen.

Som framtida systemutvecklare har jag fått värdefulla insikter i hur man balanserar tekniska lösningar och användarvänlighet. Att reflektera över och lära av processen har varit en viktig del av min utveckling och jag ser fram emot att tillämpa dessa lärdomar i framtida projekt.
