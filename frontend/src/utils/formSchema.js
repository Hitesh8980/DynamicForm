const formSchema = {
    title: "User Information",
    fields: [
      { label: "Full Name", name: "fullName", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
      { label: "Age", name: "age", type: "number" },
      {
        label: "Gender",
        name: "gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
      { label: "Subscribe to newsletter", name: "subscribe", type: "checkbox" },
      {
        label: "Education",
        name: "education",
        type: "section",
        fields: [
          { label: "Degree", name: "degree", type: "text", required: true },
          { label: "University", name: "university", type: "text", required: true },
          {
            label: "Details",
            name: "educationDetails",
            type: "section",
            fields: [
              { label: "Year of Graduation", name: "gradYear", type: "number", required: true },
              { label: "GPA", name: "gpa", type: "number" },
            ],
          },
        ],
      },
      {
        label: "Work Experience",
        name: "workExperience",
        type: "section",
        fields: [
          { label: "Job Title", name: "jobTitle", type: "text", required: true },
          { label: "Company", name: "company", type: "text", required: true },
        ],
      },
    ],
  };
  
  export default formSchema;