import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const EditPopup = ({ isOpen, onClose, onSave, existingService }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingService) {
      setName(existingService.name || "");
      setDescription(existingService.description || "");
      setImage(existingService.image || "");
      setFile(null);
    } else {
      setName("");
      setDescription("");
      setImage("");
      setFile(null);
    }
  }, [existingService]);

  // Handle file upload (preview + validation)
  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      if (uploaded.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        setFile(null);
        return;
      }
      setError("");
      setFile(uploaded);
      const previewUrl = URL.createObjectURL(uploaded);
      setImage(previewUrl);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      setError("Please fill all required fields");
      return;
    }
    onSave({
      name,
      description,
      image,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 mx-4 shadow-xl">
        <h3 className="text-[20px] font-semibold text-gray-800 mb-5 text-center">
          {existingService ? "Edit Service" : "Add New Service"}
        </h3>

        {/* Service Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Service Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter service name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Service Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Service Description<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter service description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="3"
          />
        </div>

        {/* Upload Section */}
        <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-1">
            Service Image<span className="text-red-500">*</span>
          </label>
          <label className="bg-gray-100 border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-orange-400">
            <Upload className="text-orange-500 mb-2" size={22} />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-gray-500 text-sm">
              Click to upload or drag and drop
            </span>
            <span className="text-gray-400 text-xs">
              JPG, PNG up to 10MB
            </span>
          </label>

          {file && (
            <p className="mt-2 text-sm text-green-600">
              Selected: {file.name}
            </p>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
          onClick={handleSave}
          className="bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600"
        >
          Done
        </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
