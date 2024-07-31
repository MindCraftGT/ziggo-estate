import { Link } from "react-router-dom";


export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center 
      font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        />
         <input 
          type="email" 
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        />
         <input 
          type="password" 
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        />
        <button className="bg-slate-700 text-white 
        p-3 rounded-lg uppercase hover:opacity-95 disabled:m-80">
          Sign Up
        </button>
      </form>
      <div className="flex space-x-4 mt-6">
        <p>Do you have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  )
}
