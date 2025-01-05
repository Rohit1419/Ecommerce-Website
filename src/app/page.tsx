import Image from "next/image";
import prisma from "../app/lib/db/prisma"
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner"
import PaginationBar from "@/components/PaginationBar";
import Link from "next/link";
import page from "../components/PaginationBar"
import { Metadata } from "next";




interface HomeProps {
  searchParams: { [key:string] : string | string[] | undefined };
}

export default async function Home( {searchParams}: HomeProps) {
  const params = await searchParams
  const page =  typeof params.page === 'string' ? params.page : '1'
  const currentPage = parseInt(page)
  const pageSize = 6
  
  const totalItemCount = await prisma.product.count()
  const totalPages = Math.ceil(totalItemCount / pageSize)

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });


  return (
    <main>
      <HeroBanner />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>


      {totalPages > 1&&  
        <div className="flex justify-center items-center my-4">
          <PaginationBar 
            currentPage={currentPage} 
            totalPages={totalPages} 
          /> 
        </div>
      }        
      </div>
    </main>
  );
}
