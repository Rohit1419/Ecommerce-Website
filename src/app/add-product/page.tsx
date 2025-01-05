import { redirect } from "next/navigation";
import prisma from "../lib/db/prisma"
import FormSubmitButton from "@/components/FormSubmitButton"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";



export const metadata = {
    title:  "Add Product - Mytailorzone",
}

async function addProduct(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);

  if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }
    const name  = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
      throw Error("Missing required fields");
    }

    // for(let i = 0; i<20; i++){
    //   await prisma.product.create({
    //     data: {
    //       name,
    //       description,
    //       imageUrl,
    //       price,
    //     },
    //   });
    // }

    await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
      },
    });

redirect("/");

}

export default  async function ADDProductPage() {
  const sessoin = await getServerSession(authOptions);
  
  if (!sessoin ) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold" >Add Product</h1>
      <form action={addProduct}>
      <input  
    name="name"
    className="input input-bordered mb-3 w-full " 
    type="text" 
    placeholder="Product Name"
    required 
/>

<textarea 
    name="description" 
    placeholder="Description" 
    className="textarea-bordered textarea mb-3 w-full"
></textarea>

<input  
    name="imageUrl"
    className="input input-bordered mb-3 w-full " 
    type="url" 
    placeholder="image-url"
    required 
/>

<input  
    name="price"
    className="input input-bordered mb-3 w-full " 
    type="number" 
    placeholder="Price"
    required 
/>

<FormSubmitButton>
    Add Product
</FormSubmitButton>



      </form>
    </div>
  );
}