import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {  placeholder?: string;
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export function SearchInput({ 
  placeholder = "Search", 
  value, 
  onChange 
}: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value} 
        onChange={onChange} 
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
      />
    </div>
  );
}