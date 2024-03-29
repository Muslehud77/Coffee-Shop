import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
 const {googleSignIn,login} = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    // const email = e.target.email.value;
    // const password = e.target.password.value;

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");
    login(email,password)
    .then(res=>{
        console.log(res.user)
        const user = {email, lastSignInTime: res.user.metadata.lastSignInTime };
        fetch(`https://coffee-store-server-musleh.vercel.app/user/`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
           
            console.log(data);
            
          });
        navigate('/')
    })
    .catch(err=>console.log(err))
  };

  const handleSocial = (social)=>{
    social()
      .then((res) => {
        console.log(res.user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="bg-black flex justify-center">
      <section className="w-full container  mx-auto px-8 py-20 gap-8 ">
        <div className="">
          <div
            data-aos="zoom-in-down"
            className="max-w-md relative z-10 border py-8 md:py-10 px-5 md:px-12 mx-auto space-y-8 bg-white rounded-md"
          >
            <h2 className="font-semibold text-3xl">Login your account</h2>
            <hr />
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-semibold">Your Email</p>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-100"
              />
              <p className="font-semibold">Password</p>
              <div className="relative">
                <input
                  id="password"
                  required
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  placeholder="Password "
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
              <div className="space-y-2">
                {err && (
                  <p className="capitalize text-red-500 font-serif  rounded-xl">
                    {err}
                  </p>
                )}
                <input
                  type="submit"
                  value="login"
                  className="btn btn-neutral w-full"
                />
              </div>
            </form>
            <div>
              <span>
                Don't Have An Account ?{" "}
                <Link
               
                  className="hover:font-semibold text-blue-700"
                  to="/register"
                >
                  Register
                </Link>
              </span>
              <div className="mt-3">
                <div className="flex justify-center gap-5 items-center mb-2">
                  <div className="w-16 h-[1px] bg-black"></div>
                  <h2 className="text-xl font-bold ">or</h2>
                  <div className="w-16 h-[1px] bg-black"></div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleSocial(googleSignIn)}
                    className="btn w-full btn-outline"
                  >
                    <FcGoogle className="text-2xl" /> continue with Google
                  </button>
                  <button
                    // onClick={() => socialLogin(facebookSignIn)}
                    className="btn w-full btn-outline"
                  >
                    {" "}
                    <BsFacebook className="text-2xl" /> continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
