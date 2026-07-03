import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  LayoutDashboard,
  LogOut,
  Menu,
} from "lucide-react";
import EmployeeList from "./pages/EmployeeList";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeId, setEmployeeId] = useState("");


const handleDelete = async () => {
  if (!employeeId) {
    alert("Please enter Employee ID");
    return;
  }

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/employees/delete/${employeeId}/`
    );

    alert("Employee Deleted Successfully");

    setShowDeleteModal(false);
    setEmployeeId("");

    // Refresh employee list if needed
    // fetchEmployees();

  } catch (error) {
    alert("Employee Not Found");
    console.log(error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">NOVA EDGE</h1>
          <p className="text-gray-400 text-sm mt-1">Employee Management</p>
        </div>

        <nav className="mt-6">
          <button className="w-full flex items-center gap-3 px-6 py-3 bg-yellow-500 text-black font-semibold">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/employees")}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800"
          >
            <Users size={20} />
            Employee List
          </button>

          <button
            onClick={() => navigate("/add-employee")}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800"
          >
            <UserPlus size={20} />
            Add Employee
          </button>

          <button
            onClick={() => setShowUpdateModal(true)}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800"
          >
            <UserPlus size={20} />
            Update Employee
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800"
          >
            <UserPlus size={20} />
            Delete Employee
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Employee Dashboard
          </h2>

          <button
            onClick={() => navigate("/add-employee")}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
          >
            <UserPlus size={18} />
            Add Employee
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Total Employees</h3>
            <p className="text-4xl font-bold mt-3">3</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Active</h3>
            <p className="text-4xl font-bold text-green-600 mt-3">3</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Departments</h3>
            <p className="text-4xl font-bold text-blue-600 mt-3">8</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="px-8 pb-8">
          <div className="bg-white rounded-xl shadow">
            {/* Top */}
            <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b gap-4">
              <h3 className="text-xl font-semibold">Employee List</h3>

              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search Employee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <EmployeeList></EmployeeList>
            </div>
          </div>
        </div>
      </main>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Employee ID</h2>

            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setEmployeeId("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!employeeId) {
                    alert("Please Enter Employee ID");
                    return;
                  }

                  navigate(`/edit/${employeeId}`);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-96 rounded-xl p-6 shadow-xl">

      <h2 className="text-xl font-bold mb-4 text-red-600">
        Delete Employee
      </h2>

      <input
        type="text"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-5"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setEmployeeId("");
          }}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}
