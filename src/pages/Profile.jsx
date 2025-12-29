import { useState } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const { user, setUser, removeUser } = useProfileStore();
  const [name, setName] = useState("");

  // If profile already exists → show profile card
  if (user) {
    return (
      <div className="absolute top-20 z-50 w-screen h-[90vh] flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-lg p-8 md:h-[380px] h-[400px] rounded-2xl shadow-xl flex flex-col items-center text-white w-[300px] md:w-[500px]">

          <div className="w-32 h-32 relative top-10 mt-6 rounded-full bg-white/20 flex items-center justify-center shadow-md">
            <CgProfile size={100} />
          </div>

          <h1 className="text-3xl relative top-10 mt-8 font-semibold tracking-wide text-center">
            Welcome, {user.name} 👋
          </h1>

          <p className="text-white/60 mt-2 relative top-15">
            This is your personal profile.
          </p>

          {/* REMOVE PROFILE BUTTON */}
          <button
            onClick={() => {
              removeUser();            // remove from zustand
              localStorage.removeItem("profile"); // remove from localStorage (optional)
            }}
            className="mt-8 w-full relative top-20 h-[40px] py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold"
          >
            Remove Profile
          </button>
        </div>
      </div>
    );
  }

  // If no profile → show profile creation form
  return (
    <div className="absolute top-20 z-50 w-screen h-[90vh] flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl flex flex-col items-center h-[350px] text-white w-[300px] md:w-[500px]">

        <div className="w-32 h-32 relative top-10 rounded-full bg-white/20 flex items-center justify-center shadow-md">
          <CgProfile size={100} />
        </div>

        <h2 className="text-2xl relative top-15  font-semibold mt-6">Create Your Profile</h2>
        <p className="text-white/60 relative top-18 text-center text-sm mt-1">
          Your profile helps personalize your task manager.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-6 w-[90%] relative top-20 h-[40px] text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => {
            if (name.trim().length < 1) return alert("Please enter your name");

            setUser({ name });
            localStorage.setItem("profile", JSON.stringify({ name }));
          }}
          className="mt-6 relative top-25 w-full h-[40px] py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
