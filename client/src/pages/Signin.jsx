import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
    //setting the fetch function to collect data from the backend
    const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);
      //handling of form data error on button click
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center 
      font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <input 
          type="email" 
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email" onChange={handleChange}
        />
         <input 
          type="password" 
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password" onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white 
        p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex space-x-3 mt-6">
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-6">{error}</p>}
    </div>
  )
}

