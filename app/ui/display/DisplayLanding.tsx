interface DisplayLandingProps {
  paragraphs: React.ReactNode[];
  imageSrc: string;
  imageAlt: string;
  imageWidthClass?: string;
  imageSide?: "left" | "right";
}

export function DisplayLanding({
  paragraphs,
  imageSrc,
  imageAlt,
  imageWidthClass = "w-3/4",
  imageSide = "right",
}: DisplayLandingProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 py-12">
      {imageSide === "left" && (
        <LandingImage
          src={imageSrc}
          alt={imageAlt}
          widthClass={imageWidthClass}
        />
      )}
      <div className="flex-1 text-lg font-light text-gray-700 space-y-4">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {imageSide === "right" && (
        <LandingImage
          src={imageSrc}
          alt={imageAlt}
          widthClass={imageWidthClass}
        />
      )}
    </div>
  );
}

function LandingImage({
  src,
  alt,
  widthClass,
}: {
  src: string;
  alt: string;
  widthClass: string;
}) {
  return (
    <div className="flex-1 flex justify-end">
      <img
        src={src}
        alt={alt}
        className={`${widthClass} rounded-lg shadow-lg`}
      />
    </div>
  );
}
