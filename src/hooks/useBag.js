import { useContext } from "react";
import { BagContext } from "../context/BagContext";

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
}
