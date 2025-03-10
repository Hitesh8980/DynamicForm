import React from "react";
import { motion } from "framer-motion";

const FormField = ({ field, handleChange, value, error }) => {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <motion.input
            whileFocus={{ scale: 1.05, boxShadow: "0px 0px 10px #00f2ff" }}
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none input-focus glass"
            placeholder={field.placeholder}
          />
        );
      case "select":
        return (
          <motion.select
            whileFocus={{ scale: 1.05 }}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none glass"
          >
            <option value="">Select an option</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        );
        case "checkbox":
      return (
        <motion.label
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            name={field.name}
            checked={value || false}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          {/* <span className="text-black">{field.label}</span> */}
        </motion.label>
      );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col p-4 bg-gradient-to-r from-800 to--900 shadow-lg rounded-xl"
    >
      <label htmlFor={field.name} className="mb-1 font-medium text-gray-200">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </motion.div>
  );
};

export default FormField;

