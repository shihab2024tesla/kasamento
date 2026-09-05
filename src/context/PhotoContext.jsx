import { createContext, useEffect, useState } from "react";

export const PhotoContext = createContext(null);

const STORAGE_KEY = "kasamento.myphoto";

function readStoredPhoto() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function PhotoProvider({ children }) {
  const [photo, setPhoto] = useState(readStoredPhoto);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    try {
      if (photo) {
        window.localStorage.setItem(STORAGE_KEY, photo);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable (private mode, quota) - photo still works for this session.
    }
  }, [photo]);

  function clearPhoto() {
    setPhoto(null);
  }

  function openUpload() {
    setIsUploadOpen(true);
  }

  function closeUpload() {
    setIsUploadOpen(false);
  }

  const value = { photo, setPhoto, clearPhoto, isUploadOpen, openUpload, closeUpload };

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
}
