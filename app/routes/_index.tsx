import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { json, Link, useLoaderData } from "@remix-run/react"
import { Product } from "~/lib/interface"
import { client } from "~/lib/sanity"

export const meta: MetaFunction = () => {
   return [
      { title: "Tech Connect" },
      { name: "description", content: "We sell Apple" },
   ]
}

interface iAppProps {
   products: Product[]
}

export async function loader({}: LoaderFunctionArgs) {
   const query = `*[_type == 'product']{
  price,
  name, 
  slug,
  "imageUrl": image[0].asset->url
  }`
   const products = await client.fetch(query)
   return json({ products })
}

export default function Index() {
   const { products } = useLoaderData<typeof loader>() as iAppProps
   return (
      <>
         <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
               <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
                  Welcome to my shop!
               </p>
               <h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
                  Focus on tech that matters
               </h1>
               <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                  Welcome to TechConnect, your ultimate destination for all
                  things tech! Step into a world of innovation and discovery as
                  we bring you the latest and greatest gadgets, electronics, and
                  accessories.
               </p>
               <div>
                  <Link
                     to="#products"
                     className="rounded-lg bg-indigo-600 px-8 py-3 text-centert text-sm text-indigo-200 outline-none ring-indigo-300 transition-duration-100 md:text-base"
                  >
                     Shop Now
                  </Link>
               </div>
            </div>
            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
               <img
                  src="https://images.pexels.com/photos/28579172/pexels-photo-28579172/free-photo-of-minimalist-workspace-with-laptop-and-coffee-cup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Prodcut Image"
                  className="h-full w-full object-cover object-center"
               />
            </div>
         </section>
         <section id="products" className="border">
            <div className="py-24 sm:py-32 lg:pt-32">
               <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 border">
                  {products.map(product => (
                     <Link
                        key={product.slug}
                        to={`/product/${product.slug.current}`}
                        className="group relative border"
                     >
                        <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                           <img
                              src={product.imageUrl}
                              alt="Image of Product"
                              className="w-full h-full object-center object-contain"
                           />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700 text-center">
                           {product.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-900 text-center">
                           ${product.price}
                        </p>
                     </Link>
                  ))}
               </div>
            </div>
         </section>
      </>
   )
}
