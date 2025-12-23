import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { updateProfile } from "../../api/studentApi";

const EditProfile = ({ isOpen, onClose, profile, setProfile }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        course: profile.course || "",
      });
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateProfile({
        name: formData.name,
        course: formData.course,
      });

      setProfile(res.data.updatedUser);
      onClose();
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose}>
            <RxCross2 />
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <label className="text-sm text-gray-500">Email</label>
          <input
            value={formData.email}
            disabled
            className="w-full border px-4 py-2 rounded bg-gray-100"
          />
          <label className="text-sm text-gray-500">Course</label>
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
