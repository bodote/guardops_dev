import React, { useEffect, useRef, useState } from "react";
import {
  FaFolder,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaFilePdf,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { HubShareIcon } from "@/public/Assets/Icons/Allsvg";
import AddFolderModal from "../modal/AddFolderModal";
import FileContentModal from "../modal/FileContentModal";

const FileManagement = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentFolderFiles, setCurrentFolderFiles] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editFolderName, setEditFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false); // State for file content modal
  const [fileContent, setFileContent] = useState(""); // State to store file content
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const editInputRef = useRef(null);
  const folderNameRef = useRef(null);

  const fetchFolders = async () => {
    try {
      const response = await fetch("/api/knowledge", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch folders");
      }
      const data = await response.json();
      setFolders(data.data.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const fetchFiles = async (folder_id) => {
    try {
      const response = await fetch(`/api/knowledge/files?folder_id=${folder_id}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setCurrentFolderFiles(data.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFolderCreated = (newFolder) => {
    fetchFolders();
    setCurrentFolder(newFolder.folder_id);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (currentFolder) {
      fetchFiles(currentFolder);
    }
  }, [currentFolder]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }

      if (
        folderNameRef.current && !folderNameRef.current.contains(event.target) &&
        editInputRef.current && !editInputRef.current.contains(event.target)
      ) {
        setEditingFolder(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setEditingFolder(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const processAndUploadFiles = async (files) => {
    if (files.length === 0 || currentFolder === null) {
      alert("No files dropped or no folder selected.");
      return;
    }
    const formData = new FormData();
    formData.set("folder_id", currentFolder);

    let filesToSend = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "application/pdf") {
        filesToSend.push(file);
        formData.append("files[]", file);
      } else {
        alert("Only PDF files are allowed.");
        return;
      }
    }

    try {
      const response = await fetch(`/api/knowledge/files`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      // Fetch updated files for the current folder
      const newFilesResponse = await fetch(`/api/knowledge/files?folder_id=${currentFolder}`, {
        method: "GET"
      });

      if (!newFilesResponse.ok) {
        throw new Error("Failed to fetch updated files");
      }
      
      const newFilesData = await newFilesResponse.json();
      setCurrentFolderFiles(newFilesData.data.files);

    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    await processAndUploadFiles(files);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    await processAndUploadFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const deleteFile = async (fileId) => {
    if (!currentFolder) {
      console.error("No folder selected");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete this file?");

    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/knowledge/files`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder_id: currentFolder, file_id: fileId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      // Remove the file from the state after successful deletion
      setCurrentFolderFiles(currentFolderFiles.filter(file => file.file_id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const deleteFolder = async (folder_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this folder?");

    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/knowledge`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }

      setFolders(folders.filter((folder) => folder.folder_id !== folder_id));
      setShowMenu(null);

      if (currentFolder === folder_id) {
        setCurrentFolder(null);
        setCurrentFolderFiles([]);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const renameFolder = (folder) => {
    setEditFolderName(folder.name);
    setEditingFolder(folder.name);
    setShowMenu(null);
  };

  const handleInputChange = (event) => {
    setEditFolderName(event.target.value);
  };
  const openFileContentModal = (fileContent) => {
    setFileContent(fileContent);
    setIsFileModalOpen(true);
  };
  const handleKeyPress = async (event, folder) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (editFolderName.trim() !== "") {
        const updatedFolders = folders.map((f) =>
          f.name === folder.name ? { ...f, name: editFolderName } : f
        );
        setFolders(updatedFolders);

        try {
          const formData = { folder_id: folder.folder_id, name: editFolderName };
          const response = await fetch(`/api/knowledge/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (!response.ok) {
            throw new Error("Failed to rename folder");
          }
        } catch (error) {
          console.error("Error renaming folder:", error);
        }

        setEditingFolder(null);
      }
    }
  };

  return (
    <div className="file-management p-4">
      <div className="folders grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          className="folder-card border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="text-gray-500 text-4xl mb-2" />
          <p className="text-gray-500">New Folder</p>
        </div>

        {folders.map((folder, index) => (
          <div
            key={folder.folder_id}
            className={`relative folder-card border border-gray-200 rounded-lg p-4 flex flex-col items-center cursor-pointer ${
              folder.folder_id === currentFolder ? "bg-gray-400 text-white" : "hover:bg-gray-300"
            }`}            
            onClick={() => setCurrentFolder(folder.folder_id)}
            ref={folderNameRef}
          >
            <FaFolder className="text-coai-blue text-4xl mb-2" />
            {editingFolder === folder.name ? (
              <input
                type="text"
                value={editFolderName}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, folder)}
                autoFocus
                ref={editInputRef}
                className="text-center text-gray-700 w-full"
              />
            ) : (
              <p className="text-center text-gray-700">{folder.name}</p>
            )}
            <FaEllipsisV
              className="absolute top-2 right-2 text-gray-500 cursor-pointer rounded hover:bg-gray-200"
              onClick={() => setShowMenu(showMenu === index ? null : index)}
            />
            {showMenu === index && (
              <div
                className="absolute top-8 right-2 bg-white shadow-lg rounded-lg py-2 z-10"
                ref={menuRef}
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                  onClick={() => renameFolder(folder)}
                >
                  <FaEdit className="inline mr-2" /> Rename
                </button>
                <button
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                  onClick={() => deleteFolder(folder.folder_id)}
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {currentFolder && (
        <div className="files mt-8">
          <h2 className="text-xl font-bold mb-4">
            Files
          </h2>

          <div
            className="file-upload-area border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current.click()}
          >
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  className="absolute pointer-events-none dark:bg-zinc-900/90  z-10 flex flex-row justify-center items-center flex flex-col gap-1 bg-zinc-100/90 top-0 left-0 right-0 bottom-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>Drag and drop files here</div>
                  <div className="text-sm dark:text-zinc-400 text-zinc-500">
                    Only PDF files are allowed
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <HubShareIcon className="text-gray-500 text-4xl mb-2" />
            <p className="text-gray-500">Drag and Drop Files Here</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              ref={inputRef}
            />
          </div>

          <div className="files grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {currentFolderFiles?.map((file) => (
              <div
                key={file.file_id}
                className="relative file-card border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:bg-gray-100 cursor-pointer hover:bg-gray-300"
                onClick={() => openFileContentModal(file.file)} // Open file content modal
                >
                <FaFilePdf className="text-red-500 text-4xl mb-2" />
                <p className="text-center text-gray-700 text-sm truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {file.name}
                </p>
                <FaTrash
                  className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-900"
                  onClick={() => deleteFile(file.file_id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddFolderModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onFolderCreated={handleFolderCreated}
        />
      )}
     <FileContentModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        fileContent={fileContent}
      />
    </div>
  );
};

export default FileManagement;
