import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { IoPersonSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { IoIosAddCircle, IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", course: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchStudents();
  }, []);

  // Fetch total students
  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");
      setTotalStudents(res.data.totalStudents);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) navigate("/login");
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
      fetchStats();
    } catch (err) {
      alert("Failed to delete student");
    }
  };

  // Open Add Student modal
  const openAddModal = () => {
    setFormData({ name: "", email: "", password: ""});
    setEditStudentId(null);
    setModalOpen(true);
  };

  // Open Edit Student modal
  const openEditModal = (student) => {
    setFormData({ name: student.name, email: student.email, course: student.course });
    setEditStudentId(student._id);
    setModalOpen(true);
  };

  // Handle Add/Edit form submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editStudentId) {
      // Update student (no password)
      const { name, email, course } = formData;
      await API.put(`/students/${editStudentId}`, { name, email, course });
    } else {
      // Add student (must include password)
      await API.post("/students", formData);
    }
    setModalOpen(false);
    fetchStudents();
    fetchStats();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error adding student");
  }
};



  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed md:static z-40 w-64 bg-green-700 text-white h-full transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition`}>
        <div className="p-5 text-xl font-bold border-b border-green-600 flex items-center gap-2">
          <IoPersonSharp /> Admin Panel
        </div>
        <nav className="p-4 space-y-3">
          <p className="cursor-pointer hover:text-green-200 flex items-center gap-2"><MdDashboard /> Dashboard</p>
          <p className="cursor-pointer hover:text-green-200 flex items-center gap-2"><PiStudentFill /> Students</p>
          <p className="cursor-pointer hover:text-green-200 flex items-center gap-2" onClick={openAddModal}><IoIosAddCircle /> Add Student</p>
          <p className="cursor-pointer hover:text-green-200 flex items-center gap-2" onClick={() => navigate("/login")}><IoMdLogOut /> Logout</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={() => setOpen(!open)} className="md:hidden text-green-700 text-xl">☰</button>
          <h1 className="font-semibold text-lg">Admin Dashboard</h1>
          <span className="text-sm text-gray-500">Admin</span>
        </header>

        <main className="p-6 space-y-6">
          {/* Total Students Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">No students found</td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s._id} className="border-b">
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.email}</td>
                      
                      <td className="p-3 flex gap-2">
                        <button className="text-blue-600 hover:underline" onClick={() => openEditModal(s)}>Edit</button>
                        <button className="text-red-600 hover:underline" onClick={() => handleDelete(s._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Add/Edit Student Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editStudentId ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="border p-2 rounded" />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="border p-2 rounded" />
              {!editStudentId && (
                <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required className="border p-2 rounded" />
              )}
              
              <div className="flex justify-end gap-2 mt-2">
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">{editStudentId ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
