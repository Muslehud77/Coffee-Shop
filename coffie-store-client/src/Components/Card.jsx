import PropTypes from "prop-types";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const Card = ({ coffee, coffeee, setcoffeee }) => {
  const { _id, name, chef, supplier, taste, category, details, photo } = coffee;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-store-server-musleh.vercel.app/coffee/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            data.deletedCount > 0 &&
              Swal.fire("Deleted!", `${name} has been deleted.`, "success");
              const remaining = coffeee.filter(cof => cof._id !== id)
              setcoffeee(remaining)
            console.log(data);
          });
      }
    });
  };

  return (
    <div>
      <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2">
          <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">
            {name}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {details}
          </p>
        </div>

        <img
          className="object-contain w-full h-48 mt-2"
          src={photo}
          alt={name}
        />

        <div className="flex items-center justify-end px-4 py-2 bg-gray-900">
        
          <div className="flex gap-2">
            <Link className="btn btn-sm text-2xl">
              <AiFillEye />
            </Link>
            <Link to={`/updatecoffee/${_id}`} className="btn btn-sm text-2xl">
              <AiFillEdit />
            </Link>
            <Link
              onClick={() => handleDelete(_id)}
              className="btn hover:bg-red-600 bg-red-500 border-none text-white btn-sm text-2xl"
            >
              <AiFillDelete />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  coffee: PropTypes.object.isRequired
};

export default Card;


