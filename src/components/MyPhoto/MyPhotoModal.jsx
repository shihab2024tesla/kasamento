import { useRef, useState } from "react";
import { Button } from "../Button";
import { CameraIcon, CloseIcon } from "../icons";
import { usePhoto } from "../../hooks/usePhoto";
import { useToast } from "../../hooks/useToast";
import { fileToResizedDataUrl } from "../../utils/image";
import styles from "./MyPhotoModal.module.css";

export function MyPhotoModal() {
  const { photo, setPhoto, clearPhoto, isUploadOpen, closeUpload } = usePhoto();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  if (!isUploadOpen) return null;

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setIsProcessing(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      setPhoto(dataUrl);
      showToast("Photo saved.", "success");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleRemove() {
    clearPhoto();
    showToast("Photo removed.", "info");
  }

  return (
    <>
      <div className={styles.backdrop} onClick={closeUpload} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Your photo">
        <button type="button" className={styles.closeButton} onClick={closeUpload} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.eyebrow}>Your Photo</div>
        <h2 className={styles.title}>See yourself in each piece</h2>
        <p className={styles.subtitle}>
          Upload a clear, front-facing photo. We'll use it to show you wearing any dress or sherwani in the
          collection.
        </p>

        <div className={styles.preview}>
          {photo ? (
            <img src={photo} alt="Your uploaded photo" className={styles.previewImage} />
          ) : (
            <div className={styles.placeholder}>
              <CameraIcon />
              <span>No photo yet</span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handleFileChange}
        />

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => inputRef.current?.click()}
            loading={isProcessing}
          >
            {photo ? "Replace Photo" : "Choose Photo"}
          </Button>
          {photo && (
            <button type="button" className={styles.removeButton} onClick={handleRemove} disabled={isProcessing}>
              Remove photo
            </button>
          )}
        </div>
      </div>
    </>
  );
}
