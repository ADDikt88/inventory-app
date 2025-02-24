import { useState } from "react";

const FileUpload = ({ OnUploadSuccess }) => {
  const [file, setFile] = useState(null);
  //const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please attach a file");
      return;
    }

    // create a new form data object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "direct_upload"); // Cloudinary Upload Preset

    try {
      console.log("Sending POST request to Cloudinary");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dds0wmt3k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      //setImageUrl(data.secure_url);
      OnUploadSuccess(data.secure_url); // Pass image URL back to parent
      alert("Upload successful!");
      console.log("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image To Server</button>
    </div>
  );
};

export default FileUpload;
