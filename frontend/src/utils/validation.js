export const validateForm = (schema, formData) => {
    const errors = {};
  
    const validateField = (field, parentName = '') => {
      const fullName = parentName ? `${parentName}.${field.name}` : field.name;
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          errors[field.name] = 'Invalid email format';
        }
      }
    };
  
    const validateFields = (fields, parentName = '') => {
      fields.forEach((field) => {
        if (field.type === 'section') {
          validateFields(field.fields, field.name);
        } else {
          validateField(field, parentName);
        }
      });
    };
  
    validateFields(schema.fields);
    return errors;
  };