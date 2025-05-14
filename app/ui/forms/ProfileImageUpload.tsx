import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "~/core/lib/firebase/firebase.client";
import { useState } from "react";

const fallbackImageUrl = "/img/actors/profile-unknown.png";

type Props = {
  id: string;
  name: string;
  imageUrl?: string;
  uploadPath: string;
  postUrl: string;
};

export function ProfileImageUpload({
  id,
  name,
  imageUrl,
  uploadPath,
  postUrl,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState(imageUrl || fallbackImageUrl);

  const handleUpload = async (file: File) => {
    const storageRef = ref(storage, uploadPath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    setPreviewUrl(url);

    await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url }),
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={`file-input-${id}`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          console.log("[ProfileImageUpload] Uploading file:", file.name);
          handleUpload(file);
        }}
      />
      <label htmlFor={`file-input-${id}`}>
        <img
          src={previewUrl}
          alt={`${name}'s profile`}
          className="w-32 h-32 rounded-full border cursor-pointer hover:opacity-75"
          title="Click to upload new image"
        />
      </label>
    </div>
  );
}
