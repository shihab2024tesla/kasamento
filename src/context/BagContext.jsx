import { createContext, useEffect, useMemo, useState } from "react";

export const BagContext = createContext(null);

const STORAGE_KEY = "kasamento.bag.items";

function readStoredItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(readStoredItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function setQty(id, qty) {
    if (qty < 1) {
      removeItem(id);
      return;
    }
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)));
  }

  function openBag() {
    setIsOpen(true);
  }

  function closeBag() {
    setIsOpen(false);
  }

  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.qty * item.priceValue, 0), [items]);

  const value = useMemo(
    () => ({ items, isOpen, totalCount, subtotal, addItem, removeItem, setQty, openBag, closeBag }),
    [items, isOpen, totalCount, subtotal]
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
