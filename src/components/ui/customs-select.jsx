import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const CustomSelect = ({ options, selectedOption, onChange, id = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger for select */}
      <button
        className="w-full bg-gray-800 text-white p-3 border border-gray-600 rounded-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Image
            src={selectedOption.logo}
            alt={selectedOption.name}
            width={24}
            height={24}
            className="mr-2"
          />
          <span>{selectedOption.name} - {selectedOption.odds}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Options list */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-lg mt-2 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={"select-" + id + "option-" + option.id}
              className="flex items-center w-full p-3 text-left hover:bg-gray-700 focus:bg-gray-700"
              onClick={() => handleSelect(option)}
            >
              <Image
                src={option.logo}
                alt={option.name}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-white">{option.name} - {option.odds}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
