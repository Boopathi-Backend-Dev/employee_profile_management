import { ChevronRight } from "lucide-react";

export default function ContactCard({
  icon,
  title,
  value,
  link,
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <div className="bg-white rounded-full px-6 py-4 flex items-center justify-between shadow-md hover:shadow-xl transition">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#D88A16] text-white flex items-center justify-center">
            {icon}
          </div>

          <div>
            <p className="text-xs text-gray-500">
              {title}
            </p>

            <p className="font-semibold text-[#08152F]">
              {value}
            </p>
          </div>

        </div>

        <ChevronRight className="text-[#D88A16]" />

      </div>
    </a>
  );
}