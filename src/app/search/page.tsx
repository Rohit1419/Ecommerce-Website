import ProductCard from "@/components/ProductCard"
import prisma from "../lib/db/prisma"
import { Metadata } from "next"


interface searchPageProps{
    searchParams: {query:string}
}

export async function generateMetadata({searchParams}: searchPageProps): Promise<Metadata> {
    const params = await searchParams
    return {
        title: `Search: ${params.query} - Precious Models`,
    }
}

export default async function SearchPage({searchParams}: searchPageProps) {
    const params = await searchParams
    const query = params.query

    const products = await prisma.product.findMany({
        where:{
            OR: [
                {name: {contains: query, mode:"insensitive"}},
                {description: {contains: query, mode: "insensitive"}},
            ]
        },
        orderBy: {id: "desc"},
    })

    if(products.length === 0){
        return <div className="text-center">No products found</div>
    }

    return(
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )

}