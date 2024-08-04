import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile"
        className="rounded-full h-25 w-25 object-cover cursor-pointer
        self-center mt-3"/>
        <input type="text" placeholder="Username" id="username"
        className="border rounded-lg p-3 "/>
        <input type="text" placeholder="Email" id="email"
        className="border rounded-lg p-3 "/>
        <input type="text" placeholder="Password" id="password"
        className="border rounded-lg p-3 "/>
        <button className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between items-center p-4 mt-4">
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Delete Account</span>
        <span className="text-red-500 hover:text-red-800 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
