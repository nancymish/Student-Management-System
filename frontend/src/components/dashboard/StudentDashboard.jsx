import React, { useState, useEffect } from "react";
import EditProfile from "./StudentEditProfieDialog";
import { getProfile, logout } from "../../api/studentApi";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

 // 🔹 Fetch student data
  useEffect(() => {
    getProfile()
      .then((res) => {
      console.log("PROFILE:", res.data);
      setProfile(res.data);
    })
    .catch((err) => {
      console.log("ERROR:", err.response?.data);
      navigate("/login");
    });
  }, []);

  // 🔹 Logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="font-semibold text-lg">Student Dashboard</h1>
        <button className="text-sm hover:underline"  onClick={handleLogout}>Logout</button>
      </header>

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold">My Profile</h2>

            <button
              onClick={() => setOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Details (Read-only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                value={profile.name}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                value={profile.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Course</label>
              <input
                value={profile.course}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Enrollment Date</label>
              <input
                value={new Date(profile.createdAt).toLocaleDateString()}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>
          </div>
        </div>
      </main>

      {/*  EDIT PROFILE DIALOG */}
      <EditProfile
        isOpen={open}
        onClose={() => setOpen(false)}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  );
};

export default StudentDashboard;
