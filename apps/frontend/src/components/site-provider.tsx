"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DeferredBid, UserProfile } from "@/lib/domain";

type Toast = { message: string; tone?: "default" | "success" } | null;
type StoredState = {
  version: 1;
  user: UserProfile | null;
  cart: string[];
  favorites: string[];
  registrations: string[];
  deferredBids: Record<string, DeferredBid>;
};

type SiteContextValue = StoredState & {
  hydrated: boolean;
  toast: Toast;
  signIn: (email?: string, name?: string) => void;
  signOut: () => void;
  toggleFavorite: (artworkId: string) => void;
  addToCart: (artworkId: string) => void;
  removeFromCart: (artworkId: string) => void;
  registerForAuction: (auctionId: string) => void;
  saveDeferredBid: (lotId: string, maxAmount: number) => void;
  cancelDeferredBid: (lotId: string) => void;
  showToast: (message: string, tone?: "default" | "success") => void;
  clearToast: () => void;
  resetDemo: () => void;
};

const initialState: StoredState = { version: 1, user: null, cart: [], favorites: [], registrations: [], deferredBids: {} };
const storageKey = "kupi-kartinu-demo-v1";
const SiteContext = createContext<SiteContextValue | null>(null);

function readStoredState(): StoredState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    if (parsed.version !== 1) return initialState;
    return { ...initialState, ...parsed, deferredBids: parsed.deferredBids ?? {} };
  } catch { return initialState; }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    const taskId = window.setTimeout(() => {
      setState(readStoredState());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(taskId);
  }, []);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const update = useCallback((apply: (current: StoredState) => StoredState) => setState((current) => apply(current)), []);
  const value = useMemo<SiteContextValue>(() => ({
    ...state,
    hydrated,
    toast,
    signIn: (email = "anna@kupikartinu.ru", name = "Анна Петрова") => {
      update((current) => ({ ...current, user: { id: "demo-user", name, email, phone: "+7 999 123-45-67" } }));
      setToast({ message: "Вы вошли в демо-аккаунт.", tone: "success" });
    },
    signOut: () => { update((current) => ({ ...current, user: null })); setToast({ message: "Вы вышли из аккаунта." }); },
    toggleFavorite: (artworkId) => update((current) => ({ ...current, favorites: current.favorites.includes(artworkId) ? current.favorites.filter((id) => id !== artworkId) : [...current.favorites, artworkId] })),
    addToCart: (artworkId) => {
      update((current) => current.cart.includes(artworkId) ? current : { ...current, cart: [...current.cart, artworkId] });
      setToast({ message: "Работа добавлена в корзину.", tone: "success" });
    },
    removeFromCart: (artworkId) => update((current) => ({ ...current, cart: current.cart.filter((id) => id !== artworkId) })),
    registerForAuction: (auctionId) => {
      update((current) => current.registrations.includes(auctionId) ? current : { ...current, registrations: [...current.registrations, auctionId] });
      setToast({ message: "Допуск к аукциону оформлен.", tone: "success" });
    },
    saveDeferredBid: (lotId, maxAmount) => {
      update((current) => ({ ...current, deferredBids: { ...current.deferredBids, [lotId]: { lotId, maxAmount, state: "active", updatedAt: new Date().toISOString() } } }));
      setToast({ message: "Отложенная ставка сохранена.", tone: "success" });
    },
    cancelDeferredBid: (lotId) => {
      update((current) => ({ ...current, deferredBids: { ...current.deferredBids, [lotId]: { ...current.deferredBids[lotId], lotId, maxAmount: current.deferredBids[lotId]?.maxAmount ?? 0, state: "cancelled", updatedAt: new Date().toISOString() } } }));
      setToast({ message: "Отложенная ставка отменена." });
    },
    showToast: (message, tone = "default") => setToast({ message, tone }),
    clearToast: () => setToast(null),
    resetDemo: () => { setState(initialState); setToast({ message: "Демо-данные сброшены." }); },
  }), [hydrated, state, toast, update]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside SiteProvider");
  return value;
}
