import { useEffect, useState } from "react";

export function useImageLoader(selectFile) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!selectFile) {
      setImageSrc(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(selectFile);

    return () => {
      reader.onload = null;
    };
  }, [selectFile]);

  return imageSrc;
}
