
import { Link, useLoaderData } from 'react-router-dom';
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2';
import { useRef, useState } from 'react';
const Users = () => {
    const loadedUsers = useLoaderData()

 const [users, setUsers] = useState(loadedUsers);
    const [id,setId] = useState(null)
    const email = useRef('')
    const name = useRef('')
   
    const saveChanges = (id, creationTime, lastSignInTime) => {
      const updatedUser = {
        email: email.current.value,
        displayName: name.current.value,
        creationTime,
        lastSignInTime,
      };

      fetch(`https://coffee-store-server-musleh.vercel.app/user/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const usersToShow = users.filter((user) => user._id !== id);
          setUsers([...usersToShow, updatedUser]);
          console.log(data);
          data.modifiedCount === 1 &&
            Swal.fire("Updated!", "User info has been updated", "success");
        });

      setId(null);
    };

    const handleDelete = (id,name) =>{
      

          Swal.fire({
            title: `Delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://coffee-store-server-musleh.vercel.app/users/${id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then((data) => {
                  data.deletedCount > 0 &&
                    Swal.fire(
                      "Deleted!",
                      `${name} has been deleted.`,
                      "success"
                    );
                    const usersToShow = users.filter(user => user._id!== id)
                    setUsers(usersToShow)
                });
            }
          });




    }
    return (
      <div>
        <h1 className="text-3xl text-center my-10 font-bold">
          Users Shown Below
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Created at</th>
                <th className="text-center">Last SignIn</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="hover">
                  {id === user._id ? (
                    <>
                      <td className="w-56">
                        <div className="flex justify-center">
                          <input
                            ref={name}
                            required
                            type="text"
                            defaultValue={user.displayName}
                            className="input text-center input-sm input-bordered"
                          />
                        </div>
                      </td>
                      <td className="w-56 ">
                        <div className="flex justify-center">
                          <input
                            ref={email}
                            required
                            type="email"
                            defaultValue={user.email}
                            className="input text-center input-sm input-bordered"
                          />
                        </div>
                      </td>
                      <td className="w-56 text-center">{user.creationTime}</td>
                      <td className="w-56 text-center">
                        {user.lastSignInTime}
                      </td>
                      <td className="w-56">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              saveChanges(
                                user._id,
                                user.creationTime,
                                lastSignInTime
                              )
                            }
                            className="w-2/4 btn btn-sm"
                          >
                            Save Changes
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="w-56 text-center">{user.displayName}</td>
                      <td className="w-56 text-center">{user.email}</td>
                      <td className="w-56 text-center">{user.creationTime}</td>
                      <td className="w-56 text-center">
                        {user.lastSignInTime}
                      </td>
                      <td className="w-56 text-center">
                        <div className="flex justify-center gap-2">
                          <Link className="btn btn-sm text-2xl">
                            <AiFillEye />
                          </Link>
                          <Link
                            onClick={() => setId(user._id)}
                            className="btn btn-sm text-2xl"
                          >
                            <AiFillEdit />
                          </Link>
                          <Link
                            onClick={() =>
                              handleDelete(user._id, user.displayName)
                            }
                            className="btn hover:bg-red-600 bg-red-500 border-none text-white btn-sm text-2xl"
                          >
                            <AiFillDelete />
                          </Link>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Users;