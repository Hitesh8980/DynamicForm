import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormField from "./FormField";
import NestedSection from "./NestedSection";
import { validateForm } from "../utils/validation";

const DraggableField = ({ field, index, moveField, handleChange, formData, errors }) => {
  const [, ref] = useDrag({
    type: "field",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "field",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="border p-2 mb-2 rounded-md bg-gray-100 cursor-move">
      {field.type === 'section' ? (
        <NestedSection
          field={field}
          handleChange={handleChange}
          formData={formData}
          errors={errors}
          index={index}
          moveSection={moveField}
        />
      ) : (
        <FormField
          field={field}
          handleChange={handleChange}
          value={formData[field.name] || ''}
          error={errors[field.name]}
        />
      )}
    </div>
  );
};

const DynamicForm = ({ schema, onSubmit }) => {
  const [fields, setFields] = useState(schema.fields);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false); 
  const [submittedData, setSubmittedData] = useState(null);

  const moveField = (fromIndex, toIndex) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      const [movedField] = updatedFields.splice(fromIndex, 1);
      updatedFields.splice(toIndex, 0, movedField);
      return updatedFields;
    });
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(schema, formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setSubmittedData(formData); 
    setShowDialog(true); 
  
    onSubmit(formData); 
  
    setTimeout(() => {
      setFormData({}); 
    }, 100); 
  };
  
  const closeDialog = () => {
    setShowDialog(false);
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">{schema.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <DraggableField
              key={field.name}
              field={field}
              index={index}
              moveField={moveField}
              handleChange={handleChange}
              formData={formData}
              errors={errors}
            />
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>

      {/* Modal for Submitted Data */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2 text-center text-green-600">Data Submitted Successfully</h2>
            <div className="text-gray-700">
              {Object.entries(submittedData).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {String(value)}</p>
              ))}
            </div>
            <button
              onClick={closeDialog}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default DynamicForm;
