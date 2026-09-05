const MAX_SOURCE_BYTES = 20 * 1024 * 1024;

/**
 * Reads an image file and returns a downscaled JPEG data URL. Phone camera
 * photos can be tens of megabytes at full resolution, which would blow past
 * localStorage's per-origin quota (and isn't needed for a try-on preview),
 * so this caps the longest edge before it's stored or sent anywhere.
 */
export function fileToResizedDataUrl(file, maxDimension = 1024, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      reject(new Error("That photo is too large. Please choose one under 20MB."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That doesn't look like a valid image."));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
