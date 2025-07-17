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
import { FiFolderPlus, FiUpload, FiFile, FiCheckCircle } from "react-icons/fi";

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

  const selectedFolderName = folders.find(f => f.folder_id === currentFolder)?.name;

  return (
    <div className="p-6 space-y-8">
      {/* Folders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-Archivo text-xl font-semibold text-slate-900 flex items-center gap-2">
            <FiFolderPlus className="w-5 h-5 text-[#D4DB33]" />
            Folders
          </h2>
          <span className="text-sm text-slate-500">
            {folders.length} {folders.length === 1 ? 'folder' : 'folders'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[300px] overflow-y-auto p-1">
          {/* New Folder Card */}
          <div
            className="group border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4DB33] hover:bg-[#D4DB33]/5 transition-all duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-12 h-12 bg-slate-100 group-hover:bg-[#D4DB33]/10 rounded-lg flex items-center justify-center mb-2 transition-colors duration-200">
              <FaPlus className="text-slate-400 group-hover:text-[#D4DB33] text-xl transition-colors duration-200" />
            </div>
            <p className="text-slate-500 group-hover:text-[#D4DB33] font-Archivo text-sm font-medium transition-colors duration-200">New Folder</p>
          </div>

          {/* Folder Cards */}
          {folders.map((folder, index) => (
            <div
              key={folder.folder_id}
              className={`relative group border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all duration-200 ${folder.folder_id === currentFolder
                  ? "border-[#D4DB33] bg-[#D4DB33]/10 shadow-lg shadow-[#D4DB33]/20"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              onClick={() => setCurrentFolder(folder.folder_id)}
              ref={folderNameRef}
              onDoubleClick={() => renameFolder(folder)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 ${folder.folder_id === currentFolder
                  ? "bg-[#D4DB33]/20"
                  : "bg-[#0D859A]/10 group-hover:bg-[#0D859A]/20"
                }`}>
                <FaFolder className={`text-2xl transition-colors duration-200 ${folder.folder_id === currentFolder
                    ? "text-[#D4DB33]"
                    : "text-[#0D859A]"
                  }`} />
              </div>

              {editingFolder === folder.folder_id ? (
                <input
                  type="text"
                  value={editFolderName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyPress(e, folder)}
                  autoFocus
                  ref={editInputRef}
                  className="text-center text-slate-700 w-full bg-transparent border-b border-[#D4DB33] focus:outline-none font-Archivo text-sm"
                />
              ) : (
                <p className="text-center text-slate-700 font-Archivo text-sm font-medium truncate w-full">{folder.name}</p>
              )}

              <button
                className="absolute top-2 right-2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/80 opacity-0 group-hover:opacity-100 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(showMenu === index ? null : index);
                }}
              >
                <FaEllipsisV className="w-3 h-3" />
              </button>

              {showMenu === index && (
                <div
                  className="absolute top-8 right-2 bg-white shadow-xl rounded-lg py-2 z-20 min-w-[120px] border border-slate-200"
                  ref={menuRef}
                >
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left transition-colors duration-200"
                    onClick={() => renameFolder(folder)}
                  >
                    <FaEdit className="w-3 h-3" /> Rename
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                    onClick={() => deleteFolder(folder.folder_id)}
                  >
                    <FaTrash className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      {currentFolder && (
        <div className="space-y-6">
          {/* Files Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-Archivo text-xl font-semibold text-slate-900 flex items-center gap-2">
                <FiFile className="w-5 h-5 text-[#0D859A]" />
                Files in "{selectedFolderName}"
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {currentFolderFiles?.length || 0} {currentFolderFiles?.length === 1 ? 'file' : 'files'}
              </p>
            </div>
            <button
              onClick={() => fetchFiles(currentFolder)}
              className="p-2 rounded-lg text-slate-500 hover:text-[#0D859A] hover:bg-slate-100 transition-all duration-200"
              title="Refresh files"
            >
              <FaSync className="w-4 h-4" />
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging
                ? "border-[#D4DB33] bg-[#D4DB33]/10"
                : "border-slate-300 hover:border-[#D4DB33] hover:bg-slate-50"
              }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current.click()}
          >
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  className="absolute inset-0 bg-[#D4DB33]/20 backdrop-blur-sm z-10 flex flex-col justify-center items-center rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FiUpload className="w-12 h-12 text-[#D4DB33] mb-2" />
                  <div className="text-lg font-semibold text-[#D4DB33]">Drop files here</div>
                  <div className="text-sm text-slate-600 mt-1">
                    PDF, Word, Excel, PowerPoint, Images and more
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FiUpload className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-Archivo text-lg font-semibold text-slate-900 mb-2">Upload Files</h3>
            <p className="text-slate-600 text-center font-Archivo text-sm leading-relaxed">
              Drag and drop files here or click to browse<br />
              <span className="text-xs text-slate-500">Supports PDF, Word, Excel, PowerPoint, Images and more</span>
            </p>

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
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search files (supports regex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4DB33]/20 focus:border-[#D4DB33] font-Archivo text-sm transition-all duration-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortConfig({
                    key: 'name',
                    direction: sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                  })}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 font-Archivo text-sm ${sortConfig.key === 'name'
                      ? 'border-[#D4DB33] bg-[#D4DB33]/10 text-[#D4DB33]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  title="Sort by name"
                >
                  <span>Name</span>
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc'
                      ? <FaSortAlphaDown className="w-4 h-4" />
                      : <FaSortAlphaUp className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setSortConfig({
                    key: 'type',
                    direction: sortConfig.key === 'type' && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                  })}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 font-Archivo text-sm ${sortConfig.key === 'type'
                      ? 'border-[#D4DB33] bg-[#D4DB33]/10 text-[#D4DB33]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  title="Sort by type"
                >
                  <span>Type</span>
                  {sortConfig.key === 'type' && (
                    sortConfig.direction === 'asc'
                      ? <FaSortAlphaDown className="w-4 h-4" />
                      : <FaSortAlphaUp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Bulk Delete Bar */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center justify-between bg-red-50 border border-red-200 p-4 rounded-xl">
                <span className="text-red-700 font-Archivo text-sm font-medium">
                  {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-Archivo text-sm font-medium transition-colors duration-200"
                >
                  <FaTrashAlt className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {sortFiles(filterFiles(currentFolderFiles))?.map((file) => {
              const fileExtension = file.name.split(".").pop().toLowerCase();
              let FileIcon = FaFileAlt;
              let iconColor = "text-slate-500";

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
                    iconColor = "text-slate-500";
                }
              }

              return (
                <div
                  key={file.file_id}
                  className={`group relative border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedFiles.includes(file.file_id)
                      ? 'border-[#D4DB33] bg-[#D4DB33]/10 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  onClick={() => openFileContentModal(file.file, file.name)}
                >
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.file_id)}
                      onChange={(e) => toggleFileSelection(e, file.file_id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-slate-300 text-[#D4DB33] focus:ring-[#D4DB33]/20"
                    />
                  </div>

                  {/* Icon with processing state */}
                  <div className="w-12 h-12 flex items-center justify-center mb-3">
                    {isProcessing ? (
                      <FaSpinner className="w-8 h-8 text-[#D4DB33] animate-spin" />
                    ) : (
                      <FileIcon className={`w-8 h-8 ${iconColor}`} />
                    )}
                  </div>

                  <p className="text-center text-slate-700 font-Archivo text-sm font-medium truncate w-full px-2">
                    {file.name}
                  </p>

                  {isProcessing && (
                    <span className="text-xs text-[#D4DB33] font-medium mt-1">Processing...</span>
                  )}

                  {!selectedFiles.includes(file.file_id) && !isProcessing && (
                    <button
                      className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.file_id);
                      }}
                      title="Delete file"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals and Overlays */}
      {showUploadingOverlay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto shadow-2xl">
            <h3 className="font-Archivo text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FiUpload className="w-5 h-5 text-[#D4DB33]" />
              Uploading Files
            </h3>
            <div className="space-y-3">
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {file.status === "pending" && (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    {file.status === "processing" && (
                      <FaSpinner className="w-5 h-5 text-[#D4DB33] animate-spin" />
                    )}
                    {file.status === "completed" && (
                      <FiCheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {file.status === "error" && (
                      <div className="w-5 h-5 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-Archivo text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    {file.status === "error" && (
                      <p className="text-xs text-red-500 mt-1">
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