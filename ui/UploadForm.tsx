"use client";

import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="p-4">
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
  );
}
