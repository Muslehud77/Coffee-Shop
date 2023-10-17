
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

export default function updateCoffee() {
     const coffee = useLoaderData();
     const {
       _id,
       name,
       chef,
       company,
       supplier,
       taste,
       category,
       details,
       photo,
     } = coffee;
    

    const [coffeeName, setcoffeeName] = useState(name);
    const [coffeeChef, setcoffeeChef] = useState(chef);
    const [coffeeSupplier, setcoffeeSupplier] = useState(supplier);
    const [coffeeCompany, setcoffeeCompany] = useState(company);
    const [coffeeTaste, setcoffeeTaste] = useState(taste);
    const [coffeeCategory, setcoffeeCategory] = useState(category);
    const [coffeeDetail, setcoffeeDetail] = useState(details);
    const [coffeePhoto, setcoffeePhoto] = useState(photo);
  


  

    const realtimeUpdate = (e)=> {
        e.target.name === 'name' && setcoffeeName(e.target.value);
        e.target.name === 'chef' && setcoffeeChef(e.target.value);
        e.target.name === 'supplier' && setcoffeeSupplier(e.target.value);
        e.target.name === 'company' && setcoffeeCompany(e.target.value);
        e.target.name === 'taste' && setcoffeeTaste(e.target.value);
        e.target.name === 'category' && setcoffeeCategory(e.target.value);
        e.target.name === 'details' && setcoffeeDetail(e.target.value);
        e.target.name === 'photo' && setcoffeePhoto(e.target.value);
       
       
       
    }






  const addCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const coffee = { name, chef, supplier, taste, category, details, photo };
    console.log(coffee);

    Swal.fire({
      title: `Do you want to Update ${coffeeName}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`https://coffee-store-server-musleh.vercel.app/coffee/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(coffee),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data.modifiedCount
              ? Swal.fire("Updated!", "", "success")
              : Swal.fire("Already up-to-date", "", "info");
            // form.reset();
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
        <h1 className="text-3xl font-bold text-center mt-10">Update {name}</h1>
      <div className="isolate flex justify-center gap-10 items-center bg-white ">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div>
          <form
            onChange={realtimeUpdate}
            onSubmit={addCoffee}
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Coffee Name
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={name}
                    type="text"
                    name="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Chef
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={chef}
                    type="text"
                    name="chef"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={company}
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Supplier
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={supplier}
                    type="Supplier"
                    name="supplier"
                    id="Supplier"
                    autoComplete="Supplier"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Category
                </label>
                <div className=" mt-2.5">
                  <input
                    defaultValue={category}
                    type="Category"
                    name="category"
                    className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Taste
                </label>
                <div className=" mt-2.5">
                  <input
                    defaultValue={taste}
                    type="taste"
                    name="taste"
                    className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Photo URL
                </label>
                <div className=" mt-2.5">
                  <input
                    defaultValue={photo}
                    type="photo"
                    name="photo"
                    className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Details
                </label>
                <div className="mt-2.5">
                  <textarea
                    defaultValue={details}
                    name="details"
                    id="details"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Coffee
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="w-96 overflow-hidden bg-transparent rounded-lg shadow-md dark:bg-gray-800">
            <img
              className="object-contain w-full h-64"
              src={coffeePhoto}
              alt="Article"
            />

            <div className="p-6">
              <div>
                <span className="text-xs font-medium  capitalize dark:text-blue-400">
                  Company: {coffeeCompany}
                </span>
                <span className="text-xs ml-5 font-medium  capitalize dark:text-blue-400">
                  Supplier: {coffeeSupplier}
                </span>
                <span className="text-xs ml-5 font-medium  capitalize dark:text-blue-400">
                  Category: {coffeeCategory}
                </span>
                <a
                  href="#"
                  className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                  role="link"
                >
                  Name: {coffeeName}
                </a>
                <p className="mt-2 capitalize text-sm text-gray-600 dark:text-gray-400">
                  Details: {coffeeDetail}
                </p>
                <p className="mt-2 capitalize text-sm text-gray-600 dark:text-gray-400">
                  Taste: {coffeeTaste}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img
                      className="object-cover h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                      alt="Avatar"
                    />
                    <a
                      href="#"
                      className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                      role="link"
                    >
                      Chef: {coffeeChef}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
