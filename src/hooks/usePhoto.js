import { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

export function usePhoto() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhoto must be used within a PhotoProvider");
  }
  return context;
}
