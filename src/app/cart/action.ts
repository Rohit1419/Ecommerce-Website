"use server"

import { revalidatePath } from "next/cache";
import { getCart, createCart } from "../lib/db/cart";
import prisma from "../lib/db/prisma";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(item => item.productId === productId);

    if (quantity === 0) {
        if (articleInCart) {
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: {
                        delete: {
                            id: articleInCart.id
                        }
                    }
                }
            }); 

           
        }
    } else {
        if (articleInCart) {

            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: {
                        update: {
                            where: { id: articleInCart.id },
                            data: { quantity },
                        }
                    }
                }
            })}
            else{
                await prisma.cart.update({
                    where: { id: cart.id },
                    data: {
                        items: {
                            create: {
                                quantity,
                                product: {
                                    connect: {
                                        id: productId
                                    }
                                }
                            }
                        }
                    }
                });
            }

        }       

    revalidatePath("/cart");
}
