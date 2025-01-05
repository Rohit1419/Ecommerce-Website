import prisma from "../../lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from 'next';
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./action";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) notFound();
  return product;
};

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product.name + " - Mytailorzone",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={500} 
          height={500} 
          className="rounded-lg" 
          priority 
        />
      </div>

      <div>
        <h1 className="text-5xl font-bold">
          {product.name}
        </h1>
        <p className="mt-4">{product.price}</p>
        <p className="py-6">{product.description}</p>
        <AddToCartButton productId={product.id} 
        incrrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  );
}
