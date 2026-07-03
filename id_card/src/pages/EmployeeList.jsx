import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/employees/list/"
      );

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        Employee List
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {employees.map((employee) => (

          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            <img
              src={`http://127.0.0.1:8000${employee.profile}`}
              alt=""
              className="w-full h-60 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {employee.name}
              </h2>

              <p className="text-gray-500">
                {employee.designation}
              </p>

              <p className="mt-3">
                <b>EMP ID :</b> {employee.emp_id}
              </p>

              <p>
                <b>Phone :</b> {employee.phone}
              </p>

              <p>
                <b>Email :</b> {employee.email}
              </p>

              <p>
                <b>Instagram :</b> {employee.instagram}
              </p>

              <p>
                <b>Website :</b> {employee.website}
              </p>

              <div className="mt-5">

                <p className="font-semibold mb-2">
                  QR Code
                </p>

                <img
                  src={`http://127.0.0.1:8000${employee.qr_code}`}
                  alt=""
                  className="w-40 h-40 border"
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}