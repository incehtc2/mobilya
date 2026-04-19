"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ImageGallery } from "@/components/product/image-gallery";
import type { Product } from "@/types";

const ProductViewer3D = dynamic(
  () => import("@/components/product/product-viewer-3d").then((m) => m.ProductViewer3D),
  {
    ssr: false,
    loading: () => <div className="aspect-square bg-cream-dark animate-pulse" />,
  }
);

export function ProductDetailClient({ product }: { product: Product }) {
  const [show3D, setShow3D] = useState(false);

  return (
    <div>
      {show3D && product.model_url ? (
        <ProductViewer3D modelUrl={product.model_url} />
      ) : (
        <ImageGallery
          images={product.images}
          name={product.name}
          hasModel={!!product.model_url}
          on3DClick={() => setShow3D(true)}
          show3D={show3D}
        />
      )}
    </div>
  );
}
