import { useLoaderData } from "react-router-dom";
import Card from "./Card";
import { useState } from "react";



const Home = () => {
  
    const coffeeCollections = useLoaderData()
        const [coffeee, setcoffeee] = useState(coffeeCollections);
    return (
      <div>
        <h1 className="text-center text-5xl font-bold my-10">Home</h1>
        <div className="grid md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {coffeee.map((coffee) => (
            <Card
              coffeee={coffeee}
              setcoffeee={setcoffeee}
              key={coffee._id}
              coffee={coffee}
            ></Card>
          ))}
        </div>
      </div>
    );
};

export default Home;