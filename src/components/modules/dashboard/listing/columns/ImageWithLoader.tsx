import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import SanitizedImage from "@/components/shared/SanitizedImage";

interface ImageWithLoaderProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt = "Listing Image",
  width = 60,
  height = 60,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-[60px] h-[60px] overflow-hidden rounded-md border relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          {/* <Loader2 className="w-4 h-4 animate-spin text-gray-400" /> */}
          <p className="text-center">No <br />Image</p>
        </div>
      )}
      <SanitizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
