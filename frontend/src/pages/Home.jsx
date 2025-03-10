import React from "react";
import DynamicForm from "../components/DynamicForm";
import formSchema from "../utils/formSchema";

const Home = () => {
  const handleSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Dynamic Form Builder</h1>
        <DynamicForm schema={formSchema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;