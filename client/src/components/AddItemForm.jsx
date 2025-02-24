import { useState } from "react";
import { addItem } from "../api/api.js"; // Import API function
import FileUpload from "./FileUpload.jsx";

const AddItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dateLastUsed: "",
    imageUrl: "", // Store uploaded image URL here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, imageUrl: url }); // Store Cloudinary URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.dateLastUsed) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      name: formData.name,
      category: formData.category,
      image_url: formData.imageUrl,
      last_used: formData.dateLastUsed,
    };
    const addedItem = await addItem(newItem);
    onItemAdded(addedItem); // Update parent state

    // reset state of formData
    setFormData({
      name: "",
      category: "",
      dateLastUsed: "",
      imageUrl: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        name="name"
        onChange={handleChange}
      />{" "}
      <input
        type="text"
        placeholder="Category"
        name="category"
        onChange={handleChange}
      />{" "}
      Last Used:{" "}
      <input type="date" name="dateLastUsed" onChange={handleChange} />{" "}
      <FileUpload OnUploadSuccess={handleImageUpload} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
