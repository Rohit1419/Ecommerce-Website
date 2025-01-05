import React from 'react';
import Image from 'next/image';
import { Product } from '@prisma/client';
import Link from 'next/link';
import CartButton from '@/app/Navbar/CartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card-normal card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        <figure>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            {isNew && <div className="badge badge-secondary">NEW</div>}
          </h2>
          {/* <p>{product.description}</p> */}
          <div className="card-actions justify-between items-center">
            <span className="text-xl font-bold">${product.price}</span>
            
          </div>
        </div>
      </div>
    </Link>
  );
}
