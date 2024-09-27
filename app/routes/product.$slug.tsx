import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { json, useLoaderData } from "@remix-run/react";
import React from "react";
import { ProductId } from "~/lib/interface";
import { client } from "~/lib/sanity";
import { UrlFor } from "~/lib/sanityImageUrl";
import { useCartState } from "~/lib/useCart";

export async function loader({ params }) {
   const slug = params.slug;
   const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
   const product = await client.fetch(query);
   return json({ product });
}

interface iAppProps {
   product: ProductId;
}

function classNames(...classes: any) {
   return classes.filter(Boolean).join(" ");
}

export default function Product() {
   const { product } = useLoaderData<typeof loader>() as iAppProps;
   const addToCart = useCartState(state => state.addToCart);
   return (
      <main className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
         <TabGroup as="div" className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
               <TabList className="grid grid-cols-4 gap-6">
                  {product.image.map(image => (
                     <Tab
                        key={image._key}
                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                     >
                        {({ selected }) => (
                           <>
                              <span className="absolute inset-0 rounded-md overflow-hidden">
                                 <img
                                    src={UrlFor(image).url()}
                                    alt="Product Image"
                                    className="w-full h-full object-center object-cover"
                                 />
                              </span>
                              <span
                                 className={classNames(
                                    selected
                                       ? "ring-indigo-500"
                                       : "ring-transparent",
                                    "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                                 )}
                              ></span>
                           </>
                        )}
                     </Tab>
                  ))}
               </TabList>
            </div>
            <TabPanels className="w-full aspect-w-1 aspect-h-1">
               {product.image.map(image => (
                  <TabPanel key={image._key}>
                     <img
                        src={UrlFor(image).url()}
                        alt="Product Image"
                        className="-full h-full object-center object-cover sm:rounded-lg"
                     />
                  </TabPanel>
               ))}
            </TabPanels>
         </TabGroup>
         <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
               {product.name}
            </h1>
            <div className="mt-3">
               <p className="text-3xl text-gray-900">$ {product.price}</p>
            </div>
            <div>
               <div className="mt-6">
                  <div
                     className="text-base text-gray-700"
                     dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <div className="mt-6">
                     <div className="mt-10 flex sm:flex-col-1">
                        <button
                           onClick={() => addToCart(product)}
                           className="w-full flex-1 bg-indigo-600 border border-transparent rounded-md py-3 flex items-center justify-center font-medium text-white hover:bg-indigo-500"
                        >
                           Add To Bag
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}

// <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
//             <img
//                src={product.imageUrl}
//                alt="Image of Product"
//                className="w-full h-full object-center object-contain"
//             />
//          </div>
//          <h3 className="mt-4 text-sm text-gray-700 text-center">
//             {product.name}
//          </h3>
//          <p className="mt-1 text-sm font-medium text-gray-900 text-center">
//             ${product.price}
//          </p>
//          <p>{product.description}</p>
