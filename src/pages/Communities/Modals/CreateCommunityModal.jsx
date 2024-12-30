import React, { useState } from "react";

const CreateCommunity = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
    banner: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  return <div></div>;
};

export default CreateCommunity;
