export const CURRENT_USER = {
  id: "u1",
  name: "Petr Novák",
};

export const SHOPPING_LISTS = [
  {
    id: "list1",
    name: "Seznam na party",
    ownerId: "u1",
    archived: false,
    members: [
      { id: "u1", name: "Petr Novák" },
      { id: "u2", name: "Anna Nováková" },
      { id: "u3", name: "Mike Novák" },
    ],
    items: [
      { id: "i1", name: "Mléko", resolved: false },
      { id: "i2", name: "Chléb", resolved: false },
      { id: "i3", name: "Máslo", resolved: true },
      { id: "i4", name: "Jablka", resolved: false },
    ],
  },
  {
    id: "list2",
    name: "Nákup na dovolenou",
    ownerId: "u2",
    archived: false,
    members: [
      { id: "u2", name: "Anna Nováková" },
      { id: "u1", name: "Petr Novák" },
    ],
    items: [
      { id: "i5", name: "Opalovací krém", resolved: false },
      { id: "i6", name: "Ručník", resolved: true },
    ],
  },
];