import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import { redirect } from "next/navigation";
import CartButton from "./CartButton";
import { getCart, ShoppingCart } from "../lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function searchProducts(formData: FormData) {
    "use server";   
    const searchQuery = formData.get("searchQuery")?.toString();
    if(searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {
    const cart: ShoppingCart | null = await getCart();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="text-xl normal-case">
                        <Image src={Logo} height={100} width={100} alt="Pricious Models" />
                    </Link>
                </div>

                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input
                                name="searchQuery"
                                type="text"
                                placeholder="Search"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                    </form>
                    <CartButton cart={cart} />
                    <UserMenuButton session={session} />
                </div>
            </div>

        </div>
    );
}
