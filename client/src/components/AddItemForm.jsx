import { useState, useEffect } from "react";
import { addItem, fetchItems } from "../api/api.js"; // Import API function
import ItemList from "./ItemList.jsx";

const AddItemForm = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dateLastUsed: "",
    imageUrl: "", // Store uploaded image URL here
    ageRange: "",
    quantity: 1,
    description: "",
  });

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //fetch items with useEffect
  useEffect(() => {
    loadItems();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      alert("Please fill all fields");
      return;
    }
    // if (!file) {
    //   alert("Please attach a file");
    //   return;
    // }

    let imageUrl = "";
    if (file) {
      // create a new form data object
      const newFileData = new FormData();

      newFileData.append("file", file);
      newFileData.append("upload_preset", "direct_upload"); // Cloudinary Upload Preset

      try {
        console.log("Sending POST request to Cloudinary");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dds0wmt3k/image/upload",
          {
            method: "POST",
            body: newFileData,
          }
        );

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        imageUrl = data.secure_url;
        //setImageUrl(data.secure_url);
        //setImageUrl(data.secure_url); // Pass image URL back to parent
        //setFormData({ ...formData, imageUrl: data.secureurl }); // Store Cloudinary URL
        alert("Upload successful!");
        console.log("Upload successful!");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    //Add item to database
    const newItem = {
      name: formData.name,
      category: formData.category,
      image_url: imageUrl,
      last_used: formData.dateLastUsed,
      age_range: formData.ageRange,
      quantity: formData.quantity,
      description: formData.description,
    };
    await addItem(newItem);
    await loadItems();

    // reset state of formData
    setFormData({
      name: "",
      category: "",
      dateLastUsed: "",
      imageUrl: "",
      ageRange: "",
      quantity: 1,
      description: "",
    });
  };

  return (
    <div>
      <h1>Evelyn&apos;s Inventory</h1>
      <form onSubmit={handleSubmit}>
        <h2>Add an item below...</h2>
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
        <input
          type="text"
          placeholder="Age Range"
          name="ageRange"
          onChange={handleChange}
        />{" "}
        Quantity:{" "}
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          min="1"
          onChange={handleChange}
        />{" "}
        <textarea
          placeholder="Description (optional)"
          name="description"
          onChange={handleChange}
        />
        Last Used:{" "}
        <input type="date" name="dateLastUsed" onChange={handleChange} />{" "}
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Add Item</button>
      </form>
      {/* Display Items */}
      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
};

export default AddItemForm;
