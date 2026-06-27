import { Mail, Phone, Star } from "lucide-react";

interface UserHeaderProps {
  name: string;
  roleId: string;
  email: string;
  phone: string;
  rating: number;
}

export function UserHeader({ name, roleId, email, phone, rating }: UserHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 mt-2">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-200">
          <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
            {name.charAt(0)}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            <div className="flex items-center gap-1 bg-orange-50 text-brand px-2 py-0.5 rounded text-xs font-semibold">
              <Star className="w-3 h-3 fill-brand text-brand" />
              {rating}
            </div>
          </div>
          <p className="text-sm font-medium text-brand/70 uppercase mt-0.5">ID: {roleId}</p>
        </div>
      </div>

      <div className="hidden md:block w-px h-12 bg-gray-200 mx-4" />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Email</p>
            <p className="text-sm font-semibold text-gray-900">{email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-500">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Phone</p>
            <p className="text-sm font-semibold text-gray-900">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
