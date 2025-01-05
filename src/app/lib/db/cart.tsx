import { Cart, CartItem, Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true }
}>

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;

}

export async function getCart(): Promise<ShoppingCart | null> {

    const session = await getServerSession(authOptions);

    const cookieStore = await cookies();
    const localCartId = cookieStore.get("localCartId")?.value;

     let cart: CartWithProducts | null = null;
    if (session) {
        cart = await prisma.cart.findFirst({
            where: { userId: session.user.id },
            include: { items: { include: { product: true } } }
        })
    }
        else{
            cart = localCartId ?
            await prisma.cart.findUnique({
                where: { id: localCartId },
                include: { items: { include: { product: true } } }
            })
            : null;
        }

   

    if (!cart) {
        return null;
    }

    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    }
}

export async function createCart(): Promise<ShoppingCart> {

    const session =  await getServerSession( authOptions );
    const cookieStore = await cookies();

    let newCart : CartWithProducts;

    if(session) {
        newCart = await prisma.cart.create({
            data: {
                userId: session.user.id
            },
            include: { items: { include: { product: true } } }
        });
    } else {

        const cart = await prisma.cart.create({
            data: {},
            include: { items: { include: { product: true } } }
        });

        cookieStore.set("localCartId", cart.id, {
            secure: true,
            sameSite: 'lax',
            httpOnly: true
        });

        newCart = cart;
    }

  
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    }
}


export async function mergeanoymousCartIntoUserCart(userId: string) {
    const cookieStore = await cookies();

    const localCartId =   cookieStore.get("localCartId")?.value;
    
    const localCart = localCartId ?
        await prisma.cart.findUnique({
            where: { id: localCartId },
            include: { items: { include: { product: true } } }
        })
        : null;

    if (!localCart) return;

    const userCart = await prisma.cart.findFirst({
        where: { userId },
        include: { items: { include: { product: true } } }
    });

    await prisma.$transaction(async (tx) => {
        if (userCart) {
            const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

            await tx.cartItem.deleteMany({
                where: { cartId: userCart.id }
            });

            await tx.cart.update({
                where: { id: userCart.id },
                data: {
                    items: {
                        createMany: {
                            data: mergedCartItems.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
                
            });
        } 
        else {
            await prisma.cart.create({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: localCart.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
            });
        }
              await tx.cart.delete({
                  where: { id: localCart.id }
              });

              const cookieStore = await cookies();
              cookieStore.set("localCartId", "", {
                  secure: true,
                  sameSite: 'lax',
                  httpOnly: true
              });
          });
}

function mergeCartItems(...cartItems: CartItem[][]) {
    return cartItems.reduce((acc, items) => {
        items.forEach((item) => {
            const existingItem = acc.find((i) => i.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
        });
        return acc;
    }, [] as CartItem[]);
}