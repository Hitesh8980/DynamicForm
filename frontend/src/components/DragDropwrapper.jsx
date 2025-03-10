import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableSection = ({ field, index, moveSection, handleChange, formData, errors, children }) => {
  const [, drag] = useDrag({
    type: 'section',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="border p-4 mb-4 rounded-md bg-gray-50 cursor-move"
    >
      {field.label && <h3 className="text-lg font-semibold mb-2">{field.label}</h3>}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default DraggableSection;