import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const specialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

const Register = () => {
  //   const { state } = useLocation();
  const {register} = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);

  //   useEffect(() => {
  //     Aos.init();
  //   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    const form = new FormData(e.currentTarget);
    const displayName = form.get("name");
    const photoURL = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
    console.log(displayName, photoURL, email);
    // if (password.length < 6) {
    //   setErr("Password must be at least 6 characters!");
    //   return;
    // }

    // if (!/[A-Z]/.test(password)) {
    //   setErr("Password must contain at least 1 upper case letter!");
    //   return;
    // }

    // if (!specialCharacter.test(password)) {
    //   setErr("Password should have at least 1 special character!");
    //   return;
    // }

    // if (!/\d/.test(password)) {
    //   setErr("Password must contain at least 1 number!");
    //   return;
    // }

    const user = { displayName, email, photoURL };
   
    register(email,password)
    .then(res=>{
      updateProfile(res.user,{
        displayName,photoURL
      })
      const u = res.user
      console.log(res.user)
      fetch("https://coffee-store-server-musleh.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          creationTime: u.metadata.creationTime,
          lastSignInTime: u.metadata.lastSignInTime,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    })
    .catch(error=>{
      console.log(error);
      setErr(error.message)
    })
  };

  return (
    <section className="relative  py-20">
      <div>
        <div className="max-w-md relative z-10  py-10 px-12 mx-auto space-y-8  bg-orange-800 text-white bg-opacity-90 backdrop-blur-md rounded-md">
          <h2 className="font-semibold text-3xl">Register Account</h2>
          <hr />
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-semibold">Your Name</p>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Your Photo</p>
            <input
              type="url"
              name="photoUrl"
              placeholder="Your photo url"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Your Email</p>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Set Password</p>
            <div className="relative">
              <input
                id="password"
                required
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="Password must be at-least 6 characters"
                className="input input-bordered w-full bg-gray-100 text-black"
              />
              <div
                className="hover:cursor-pointer absolute right-3 bottom-3 text-black text-xl"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {err && (
              <div className="text-red-500 rounded-lg p-2 bg-white font-serif font-light">
                <p>{err}</p>
              </div>
            )}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <input
                  required
                  type="checkbox"
                  className="checkbox checkbox-sm bg-white"
                  name=""
                  id=""
                />
                <label>
                  Accept{" "}
                  <a className="hover:underline" href="">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <input
                type="submit"
                value="Register"
                className="btn btn-neutral outline outline-white bg-black text-white w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
