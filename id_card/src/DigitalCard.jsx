import { Mail, Globe, ChevronRight, Phone } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import bg from "./assets/back.jpeg";

export default function DigitalCard() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://employee-profile-management.onrender.com/api/employees/${id}/`,
    )
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!employee) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }
  const BASE_URL = "https://employee-profile-management.onrender.com";
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="relative w-full max-w-[466px] h-[920px] overflow-hidden shadow-2xl rounded-sm">
        {/* Background */}
        <img
          src={bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-fill"
        />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-7">
          {/* Logo */}
          <div className="pt-16 text-center">
            <h1 className="text-[32px] font-bold tracking-[6px]">
              <span className="text-[#0A1633]">NOVA</span>
              <span className="text-[#D88A16]">EDGE</span>
            </h1>

            <p className="text-[10px] tracking-[4px] text-gray-500 mt-1">
              DESIGN • INNOVATE • ELEVATE
            </p>
          </div>

          {/* Profile */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full border border-[#D88A16] flex items-center justify-center bg-white/40 mt-4">
              <img
                src={`${BASE_URL}${employee.profile}`}
                className="w-28 h-28 rounded-full object-cover"
                alt={employee.name}
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-[30px] font-extrabold text-[#08152F]">
              {employee.name}
            </h2>

            <p className="text-[#D88A16] text-lg mt-1">
              {employee.designation}
            </p>

            <div className="w-20 h-[2px] bg-[#D88A16] mx-auto mt-3"></div>

            <p className="text-sm mt-3 text-gray-600">
              {employee.emp_id}
              <span className="font-bold text-[#08152F] ml-1">NEMD002</span>
            </p>
          </div>

          {/* Contact Cards */}
          <div className="mt-8 space-y-5">
            <ContactCard
              icon={<FaInstagram />}
              title="INSTAGRAM"
              value={`@${employee.instagram}`}
              link={`https://instagram.com/${employee.instagram}`}
            />

            <ContactCard
              icon={<Phone size={24} />}
              title="PHONE"
              value={employee.phone}
              link={`tel:${employee.phone}`}
            />

            <ContactCard
              icon={<Mail size={24} />}
              title="EMAIL"
              value={employee.email}
              link={`mailto:${employee.email}`}
            />

            <ContactCard
              icon={<Globe size={24} />}
              title="WEBSITE"
              value={employee.website}
              link={`https://${employee.website}`}
            />
          </div>

          {/* Push Footer Down */}
          <div className="flex-1"></div>

          {/* Footer */}
          <div className="mb-8 text-center">
            <p className="text-[11px] tracking-[2px] font-semibold text-[#08152F] ">
              WE DESIGN.
              <span>WE INNOVATE.</span>
              <span className="text-[#D88A16]">WE ELEVATE.</span>
            </p>

            <div className="w-12 h-[2px] bg-[#D88A16] mx-auto mt-3"></div>

            <p className="text-[10px] text-gray-600 mt-4">
              © 2026 Nova Edge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value, link }) {
  const isExternal =
    link?.startsWith("http://") || link?.startsWith("https://");

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="bg-white rounded-2xl shadow-lg h-[78px] flex items-center px-5 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="text-[#D88A16] text-2xl w-10 flex justify-center">
        {icon}
      </div>

      <div className="w-px h-10 bg-[#D88A16]/40 mx-4"></div>

      <div className="flex-1">
        <p className="text-[10px] tracking-widest text-gray-500">{title}</p>

        <p className="text-[#08152F] font-semibold text-[16px] mt-1">{value}</p>
      </div>

      <IoIosArrowForward className="text-[#D88A16] text-xl" />
    </a>
  );
}
