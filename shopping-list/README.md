# Nákupní seznamy

Webová aplikace pro správu nákupních seznamů vytvořená v Reactu.

## Funkce

- Zobrazení všech nákupních seznamů
- Vytvoření nového seznamu
- Smazání seznamu
- Detail seznamu s položkami a členy
- Přidávání a odebírání položek ze seznamu
- Označování položek jako vyřešené
- Správa členů seznamu

## Technologie

- **React 19** — UI framework
- **React Router v7** — klientské routování
- **Vite** — build nástroj a dev server

## Instalace a spuštění

```bash
# Nainstaluj závislosti
npm install

# Spusť vývojový server
npm run dev
```

Aplikace poběží na `http://localhost:5173`.

## Struktura projektu

```
src/
├── pages/
│   ├── ShoppingListsPage.jsx
│   └── ShoppingListDetailPage.jsx
├── components/
│   ├── lists/
│   │   ├── PageHeader.jsx
│   │   ├── CreateListButton.jsx
│   │   ├── ShoppingListsGrid.jsx
│   │   └── ShoppingListCard.jsx
│   └── detail/
│       ├── ListHeader.jsx
│       ├── MembersSection.jsx
│       ├── MemberRow.jsx
│       ├── AddMemberForm.jsx
│       ├── AddItemForm.jsx
│       ├── ItemsList.jsx
│       └── ItemRow.jsx
├── constants/
│   └── data.js
└── App.jsx
```

## Dostupné příkazy

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Spustí vývojový server |
| `npm run build` | Sestaví produkční build |
| `npm run preview` | Spustí preview produkčního buildu |
| `npm run lint` | Spustí ESLint |
