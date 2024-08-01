import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

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
        setLoading(false);
        setError(data.message);
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        p-3 rounded-lg uppercase hover:opacity-95 disabled:m-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
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

