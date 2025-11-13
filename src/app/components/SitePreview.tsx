"use client";

import Image from "next/image";

interface SitePreviewProps {
  url: string;
  width?: number;
  height?: number;
}

export default function SitePreview({
  url,
  width = 320,
  height = 180,
}: SitePreviewProps) {
  const token = "QV0HR7N-56RMTJK-QGXKJJH-JEEPR68"; // coloque seu token aqui
  const screenshotURL = `https://api.screenshotapi.net/screenshot?token=${token}&url=${encodeURIComponent(
    url
  )}&output=image&file_type=png`;

  return (
    <div
      style={{ width, height, position: "relative" }}
      className="rounded-lg shadow-lg overflow-hidden bg-gray-100"
    >
      <Image
        src={screenshotURL}
        alt={`Preview do site ${url}`}
        fill
        className="object-cover"
      />
    </div>
  );
}
