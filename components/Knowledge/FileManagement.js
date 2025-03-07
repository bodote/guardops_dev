import React, { useEffect, useRef, useState } from "react";
import {
  FaFolder,
  FaPlus,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaFilePdf,
  FaFileAlt,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileCode,
  FaFileArchive,
  FaEnvelope,
  FaTable,
  FaMarkdown,
  FaSpinner,
} from "react-icons/fa";
import { FaSync, FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaTrashAlt } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { HubShareIcon } from "@/public/Assets/Icons/Allsvg";
import AddFolderModal from "../modal/AddFolderModal";
import FileContentModal from "../modal/FileContentModal";
import { useUploadStore } from "../utils/UploadManager";
import UploadProgressOverlay from "./UploadProgressOverlay"; // Global upload overlay

const FileManagement = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentFolderFiles, setCurrentFolderFiles] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFolderName, setEditFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");

  // New states for initial file processing display
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [showUploadingOverlay, setShowUploadingOverlay] = useState(false);

  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const editInputRef = useRef(null);
  const folderNameRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Add sorti
  // Get upload functions from the global store
  const { addUploads, updateUpload } = useUploadStore();
  // Add sorting function
  const sortFiles = (files) => {
    if (!files) return [];

    return [...files].sort((a, b) => {
      if (sortConfig.key === 'name') {
        // Sort by full filename
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortConfig.key === 'type') {
        // First sort by extension, then by filename for same extensions
        const extA = a.name.split('.').pop().toLowerCase();
        const extB = b.name.split('.').pop().toLowerCase();

        if (extA === extB) {
          // If extensions are the same, sort by filename
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }

        // Sort by extension
        return sortConfig.direction === 'asc'
          ? extA.localeCompare(extB)
          : extB.localeCompare(extA);
      }
      return 0;
    });
  };

  // Add file filtering function
  const filterFiles = (files) => {
    if (!searchQuery) return files;
    try {
      const regex = new RegExp(searchQuery, 'i');
      return files?.filter(file => regex.test(file.name));
    } catch (e) {
      // If regex is invalid, fall back to simple includes
      return files?.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };

  // Add bulk delete function
  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${selectedFiles.length} selected file(s)?`
    );

    if (!isConfirmed) return;

    for (const fileId of selectedFiles) {
      await deleteFile(fileId);
    }

    setSelectedFiles([]);
  };

  // Toggle file selection
  const toggleFileSelection = (e, fileId) => {
    e.stopPropagation();
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };
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
      const response = await fetch(
        `/api/knowledge/files?folder_id=${folder_id}`,
        {
          method: "GET",
        }
      );
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
        folderNameRef.current &&
        !folderNameRef.current.contains(event.target) &&
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
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

  // Updated processAndUploadFiles function:
  const processAndUploadFiles = async (files) => {
    if (files.length === 0 || currentFolder === null) {
      alert("No files dropped or no folder selected.");
      return;
    }

    const allowedFileTypes = [
      ".bmp",
      ".csv",
      ".doc",
      ".docx",
      ".eml",
      ".epub",
      ".heic",
      ".html",
      ".jpeg",
      ".jpg",
      ".png",
      ".md",
      ".msg",
      ".odt",
      ".org",
      ".p7s",
      ".pdf",
      ".png",
      ".ppt",
      ".pptx",
      ".rst",
      ".rtf",
      ".tiff",
      ".txt",
      ".tsv",
      ".xls",
      ".xlsx",
      ".xml",
    ];

    let filesToSend = [];
    let invalidFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();

      if (allowedFileTypes.includes(fileExtension)) {
        filesToSend.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      alert(
        `Incompatible file(s): ${invalidFiles.join(
          ", "
        )}\n\nAllowed file types:\n${allowedFileTypes.join(", ")}`
      );
      return;
    }

    if (filesToSend.length === 0) {
      return;
    }

    // Show the initial uploading overlay preview
    setUploadingFiles(
      filesToSend.map((f) => ({
        name: f.name,
        status: "pending",
      }))
    );
    setShowUploadingOverlay(true);

    // Create upload tracking objects
    const newUploads = filesToSend.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      fileName: file.name,
      progress: 0,
      status: "pending",
      folder_id: currentFolder,
      file,
    }));

    // Add to global store
    addUploads(newUploads);

    // Process each file sequentially
    for (let i = 0; i < newUploads.length; i++) {
      const upload = newUploads[i];

      try {
        // Update local state to show this file is processing
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.name === upload.fileName
              ? { ...f, status: "processing" }
              : f
          )
        );

        // Update global status to processing
        updateUpload(upload.id, { status: "processing", progress: 10 });

        const formData = new FormData();
        formData.set("folder_id", upload.folder_id);
        formData.append("files[]", upload.file);

        const startTime = Date.now();
        const response = await fetch(`/api/knowledge/files`, {
          method: "POST",
          body: formData,
          keepalive: true,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${upload.fileName}`);
        }

        const data = await response.json();
        console.log("Upload response data:", data);

        let fileId = null;
        if (data?.file_ids && data.file_ids.length > 0) {
          fileId = data.file_ids[0];
        } else if (data.data?.file_ids && data.data.file_ids.length > 0) {
          fileId = data.data.file_ids[0];
        } else {
          console.error("Invalid response structure:", data);
          throw new Error(
            "Server returned invalid response format - missing file_ids"
          );
        }

        console.log(`Got file_id for ${upload.fileName}: ${fileId}`);
        updateUpload(upload.id, {
          file_id: fileId,
          progress: 50,
          status: "processing",
        });

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 200) {
          await new Promise((resolve) => setTimeout(resolve, 200 - elapsedTime));
        }

        // Mark this file as completed in the preview overlay (still processing in backend)
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.name === upload.fileName ? { ...f, status: "completed" } : f
          )
        );
      } catch (error) {
        console.error(`Error uploading file ${upload.fileName}:`, error);

        updateUpload(upload.id, {
          status: "error",
          progress: 0,
          error: error.message,
        });

        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.name === upload.fileName
              ? { ...f, status: "error", error: error.message }
              : f
          )
        );
      } finally {
        console.log(
          `Re-fetching files for folder ${currentFolder} after processing ${upload.fileName}`
        );
        // Add a short delay to allow backend updates to settle
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (currentFolder) {
          await fetchFiles(currentFolder);
        }
      }
    }

    // All files have been processed - close the initial overlay and perform one final re-fetch.
    setTimeout(() => {
      setShowUploadingOverlay(false);
      if (currentFolder) {
        fetchFiles(currentFolder);
      }
    }, 500);
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

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

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

      setCurrentFolderFiles(
        currentFolderFiles?.filter((file) => file.file_id !== fileId)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const deleteFolder = async (folder_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this folder?"
    );

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
    setEditingFolder(folder.folder_id);
    setShowMenu(null);
  };

  const handleInputChange = (event) => {
    setEditFolderName(event.target.value);
  };

  const openFileContentModal = (fileContent, fileName) => {
    setFileContent(fileContent);
    setFileName(fileName);
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
      {/* Folders Section */}
      <div className="folders grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[23vh] overflow-y-auto">
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
            className={`relative folder-card border border-gray-200 rounded-lg p-4 flex flex-col items-center cursor-pointer ${folder.folder_id === currentFolder
              ? "bg-gray-400 text-white"
              : "hover:bg-gray-300"
              }`}
            onClick={() => setCurrentFolder(folder.folder_id)}
            ref={folderNameRef}
            onDoubleClick={() => renameFolder(folder)}
          >
            <FaFolder className="text-coai-blue text-4xl mb-2" />
            {editingFolder === folder.folder_id ? (
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

      {/* Files Section */}
      {currentFolder && (
        <div className="files mt-8">
          {/* Header with Reload Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Files</h2>
            <button
              onClick={() => fetchFiles(currentFolder)}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-200 group"
              title="Reload files"
            >
              <FaSync className="text-gray-600 group-hover:text-coai-blue transition-colors duration-200 w-5 h-5" />
            </button>
          </div>
          {/* Upload Area */}
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
                  className="absolute pointer-events-none dark:bg-zinc-900/90 z-10 flex flex-row justify-center items-center flex flex-col gap-1 bg-zinc-100/90 top-0 left-0 right-0 bottom-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>Drag and drop files here</div>
                  <div className="text-sm dark:text-zinc-400 text-zinc-500">
                    Supported file types include PDF, Word Documents, Excel Sheets, Mails and more
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <HubShareIcon className="text-gray-500 text-4xl mb-2" />
            <p className="text-gray-500">Drag and Drop Files Here</p>
            <input
              type="file"
              accept=".bmp,.csv,.doc,.docx,.eml,.epub,.heic,.html,.jpeg,.jpg,.png,.md,.msg,.odt,.org,.p7s,.pdf,.png,.ppt,.pptx,.rst,.rtf,.tiff,.txt,.tsv,.xls,.xlsx,.xml"
              onChange={handleFileUpload}
              className="hidden"
              ref={inputRef}
              multiple
            />
          </div>

          {/* Search and Sort Controls */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search files (supports regex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coai-blue"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortConfig({
                    key: 'name',
                    direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                  })}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 ${sortConfig.key === 'name' ? 'bg-gray-100' : ''
                    }`}
                  title="Sort by name"
                >
                  <span className="text-sm text-gray-600">Name</span>
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc'
                      ? <FaSortAlphaDown className="text-coai-blue" />
                      : <FaSortAlphaUp className="text-coai-blue" />
                  )}
                </button>
                <button
                  onClick={() => setSortConfig({
                    key: 'type',
                    direction: sortConfig.key === 'type' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                  })}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 ${sortConfig.key === 'type' ? 'bg-gray-100' : ''
                    }`}
                  title="Sort by type"
                >
                  <span className="text-sm text-gray-600">Type</span>
                  {sortConfig.key === 'type' && (
                    sortConfig.direction === 'asc'
                      ? <FaSortAlphaDown className="text-coai-blue" />
                      : <FaSortAlphaUp className="text-coai-blue" />
                  )}
                </button>
              </div>
            </div>


            {/* Bulk Delete Bar */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center justify-between bg-red-50 p-2 rounded-lg">
                <span className="text-sm text-red-600">
                  {selectedFiles.length} files selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <FaTrashAlt />
                  <span>Delete Selected</span>
                </button>
              </div>
            )}
          </div>

          {/* Files Grid */}
          <div className="files grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {sortFiles(filterFiles(currentFolderFiles))?.map((file) => {
              const fileExtension = file.name.split(".").pop().toLowerCase();
              let FileIcon = FaFileAlt;
              let iconColor = "text-blue-500";

              // Parse the file.file content if it's a string
              let fileContent;
              try {
                fileContent = typeof file.file === 'string' ? JSON.parse(file.file) : file.file;
              } catch (e) {
                fileContent = file.file;
              }

              // Check if file is still processing
              const isProcessing = fileContent?.status === "processing";

              // Only determine icon if not processing
              if (!isProcessing) {
                switch (fileExtension) {
                  case "pdf":
                    FileIcon = FaFilePdf;
                    iconColor = "text-red-500";
                    break;
                  case "doc":
                  case "docx":
                  case "odt":
                  case "rtf":
                    FileIcon = FaFileWord;
                    iconColor = "text-blue-600";
                    break;
                  case "xls":
                  case "xlsx":
                  case "csv":
                  case "tsv":
                    FileIcon = FaFileExcel;
                    iconColor = "text-green-600";
                    break;
                  case "ppt":
                  case "pptx":
                    FileIcon = FaFilePowerpoint;
                    iconColor = "text-orange-600";
                    break;
                  case "jpg":
                  case "jpeg":
                  case "png":
                  case "bmp":
                  case "tiff":
                  case "heic":
                    FileIcon = FaFileImage;
                    iconColor = "text-purple-500";
                    break;
                  case "html":
                  case "xml":
                    FileIcon = FaFileCode;
                    iconColor = "text-yellow-600";
                    break;
                  case "md":
                  case "rst":
                  case "org":
                    FileIcon = FaMarkdown;
                    iconColor = "text-gray-600";
                    break;
                  case "eml":
                  case "msg":
                    FileIcon = FaEnvelope;
                    iconColor = "text-blue-400";
                    break;
                  case "csv":
                  case "tsv":
                    FileIcon = FaTable;
                    iconColor = "text-green-500";
                    break;
                  default:
                    FileIcon = FaFileAlt;
                    iconColor = "text-gray-500";
                }
              }

              return (
                <div
                  key={file.file_id}
                  className={`relative file-card border border-gray-300 rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all duration-200
          ${selectedFiles.includes(file.file_id)
                      ? 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                      : 'hover:bg-gray-200'
                    }`}
                  onClick={() => openFileContentModal(file.file, file.name)}
                >
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.file_id)}
                      onChange={(e) => toggleFileSelection(e, file.file_id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Icon with processing state */}
                  <div className="relative">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <FaSpinner className="text-4xl mb-2 text-coai-blue animate-spin" />
                      </div>
                    ) : (
                      <FileIcon className={`${iconColor} text-4xl mb-2`} />
                    )}
                  </div>

                  <p className="text-center text-gray-700 text-sm truncate w-full overflow-hidden text-ellipsis whitespace-nowrap mt-2">
                    {file.name}
                  </p>

                  {!selectedFiles.includes(file.file_id) && (
                    <FaTrash
                      className="absolute text-gray-800 top-2 right-2 cursor-pointer hover:text-gray-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.file_id);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals and Overlays */}
      {showUploadingOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Uploading Files</h3>
            <div className="space-y-3">
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3">
                    {file.status === "pending" && (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    {file.status === "processing" && (
                      <FaSpinner className="w-5 h-5 text-blue-500 animate-spin" />
                    )}
                    {file.status === "completed" && (
                      <div className="w-5 h-5 bg-green-500 rounded-full" />
                    )}
                    {file.status === "error" && (
                      <div className="w-5 h-5 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="truncate">{file.name}</p>
                    {file.status === "error" && (
                      <p className="text-xs text-red-500">
                        {file.error || "Upload failed"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
        fileName={fileName}
      />

      <UploadProgressOverlay />
    </div>
  );
};

export default FileManagement;