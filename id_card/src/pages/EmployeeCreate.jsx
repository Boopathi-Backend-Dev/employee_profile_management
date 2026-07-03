import { useState } from "react";
import axios from "axios";

export default function EmployeeCreate() {
  const [formData, setFormData] = useState({
    emp_id: "",
    name: "",
    designation: "",
    phone: "",
    email: "",
    instagram: "",
    website: "",
    profile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setFormData({
        ...formData,
        profile: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append("emp_id", formData.emp_id);
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("instagram", formData.instagram);
    data.append("website", formData.website);
    data.append("profile", formData.profile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/employees/create/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Employee Created Successfully");

      console.log(res.data);

      setFormData({
        emp_id: "",
        name: "",
        designation: "",
        phone: "",
        email: "",
        instagram: "",
        website: "",
        profile: null,
      });

      document.getElementById("profile").value = "";
    } catch (err) {
      console.log(err.response?.data);
      alert("Error Creating Employee");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="emp_id"
            placeholder="Employee ID"
            value={formData.emp_id}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            id="profile"
            type="file"
            name="profile"
            accept="image/*"
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}