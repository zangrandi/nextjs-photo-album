"use client";

import React, { useState } from "react";

interface Params {
  albumId: number;
  fetchAlbum: () => void;
}

const UploadForm: React.FC<Params> = ({ albumId, fetchAlbum }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("albumId", albumId.toString());

    setUploadStatus("Uploading file...");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        fetchAlbum();
        closeModal();
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred during file upload.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setUploadStatus("");
  };

  return (
    <div className="p-4">
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="fixed top-4 right-5 z-20 px-4 py-2 bg-white text-blue rounded-lg hover:bg-gray-200"
      >
        Upload Picture
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Upload
              </button>
            </form>
            {uploadStatus && <p className="mt-4 text-sm text-gray-700">{uploadStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
