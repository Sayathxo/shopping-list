# Nákupní seznamy

Webová aplikace pro správu nákupních seznamů vytvořená v Reactu.

## Funkce

- Zobrazení všech nákupních seznamů
- Vytvoření nového seznamu
- Smazání seznamu
- Detail seznamu s položkami a členy
- Přidávání a odebírání položek ze seznamu
- Označování položek jako vyřešené / nevyřešené
- Filtrování položek (jen nevyřešené / vše)
- Správa členů seznamu (přidání, odebrání, odchod)
- Komunikace se serverem s podporou mock režimu

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

## Komunikace se serverem

Aplikace podporuje dva režimy komunikace, přepínané přes `.env`:

```env
# Mock režim (výchozí) — data se ukládají v paměti, server není potřeba
VITE_USE_MOCK=true

# Reálný režim — volá backend API na http://localhost:3000
VITE_USE_MOCK=false
```

V mock režimu jsou přednačtena tato testovací data:
- **Seznam na party** (vlastník: Petr Novák, 3 členové, 4 položky)
- **Nákup na dovolenou** (vlastník: Anna Nováková, 2 členové, 2 položky)
- **Týdenní nákup** (vlastník: Petr Novák, 1 člen, 3 položky)

Přihlášený uživatel je simulován jako **Petr Novák** (`u1`).

## Struktura projektu

```
src/
├── api/
│   └── shoppingListApi.js     # API vrstva (reálná volání + mock)
├── pages/
│   ├── ShoppingListsPage.jsx
│   └── ShoppingListDetailPage.jsx
├── components/
│   ├── list/
│   │   ├── PageHeader.jsx
│   │   ├── ShoppingListsGrid.jsx
│   │   ├── ShoppingListCard.jsx
│   │   ├── CreateListModal.jsx
│   │   └── DeleteConfirmModal.jsx
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
