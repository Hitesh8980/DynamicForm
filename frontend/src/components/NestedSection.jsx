import React from 'react';
import FormField from './FormField';
import DraggableSection from './DragDropwrapper';

const NestedSection = ({ field, handleChange, formData, errors, index, moveSection }) => {
  return (
    <DraggableSection
      field={field}
      index={index}
      moveSection={moveSection}
      handleChange={handleChange}
      formData={formData}
      errors={errors}
    >
      <div className="ml-4 space-y-4">
        {field.fields.map((subField, subIndex) => (
          subField.type === 'section' ? (
            <NestedSection
              key={subField.name}
              field={subField}
              handleChange={handleChange}
              formData={formData}
              errors={errors}
              index={subIndex}
              moveSection={() => {}}
            />
          ) : (
            <FormField
              key={subField.name}
              field={subField}
              handleChange={handleChange}
              value={formData[subField.name] || ''}
              error={errors[subField.name]}
            />
          )
        ))}
      </div>
    </DraggableSection>
  );
};

export default NestedSection;