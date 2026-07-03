import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
   const { id } = useParams();

     useEffect(() => {
    axios
      .get(`https://employee-profile-management.onrender.com/api/employees/${id}/`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  
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

  // Fetch Employee
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees/1/")
      .then((res) => {
        setFormData({
          ...res.data,
          profile: null,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile") {
      setFormData((prev) => ({
        ...prev,
        profile: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("emp_id", formData.emp_id);
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("instagram", formData.instagram);
    data.append("website", formData.website);

    if (formData.profile) {
      data.append("profile", formData.profile);
    }

    try {
      await axios.put(
        "http://127.0.0.1:8000/api/employees/update/1/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Employee Updated Successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Update Employee
        </h2>

        <input
          type="text"
          name="emp_id"
          value={formData.emp_id}
          onChange={handleChange}
          placeholder="Employee ID"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="Instagram"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="file"
          name="profile"
          accept="image/*"
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}