import React, {useEffect, useRef,  useState } from "react";
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

const FileManagement = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Handle folder creation
  const createFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolders([...folders, { name: newFolderName, files: [] }]);
      setNewFolderName("");
      setCurrentFolder(newFolderName);
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf" && currentFolder !== null) {
      const updatedFolders = folders.map((folder) => {
        if (folder.name === currentFolder) {
          return { ...folder, files: [...folder.files, file] };
        }
        return folder;
      });
      setFolders(updatedFolders);
    } else {
        setIsDragging(false);
      alert("Please upload a valid PDF file.");
    }
  };

  // Handle drag-and-drop file upload
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf" && currentFolder !== null) {
      const updatedFolders = folders.map((folder) => {
        if (folder.name === currentFolder) {
          return { ...folder, files: [...folder.files, file] };
        }
        return folder;
      });
      setFolders(updatedFolders);
      setIsDragging(false);
    } else {
      alert("Please upload a valid PDF file.");
      setIsDragging(false);
    }
  };

  // Prevent default behavior for dragover
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);

  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false); 
  };

  // Handle file deletion
  const deleteFile = (fileName) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.name === currentFolder) {
        return {
          ...folder,
          files: folder.files.filter((file) => file.name !== fileName),
        };
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  // Handle folder deletion
  const deleteFolder = (folderName) => {
    setFolders(folders.filter((folder) => folder.name !== folderName));
    setShowMenu(null);
    if (currentFolder === folderName) {
      setCurrentFolder(null);
    }
  };

  // Handle folder renaming
  const renameFolder = (oldName) => {
    const newName = prompt("Enter new folder name:", oldName);
    if (newName && newName.trim() !== "") {
      const updatedFolders = folders.map((folder) =>
        folder.name === oldName ? { ...folder, name: newName } : folder
      );
      setFolders(updatedFolders);
      setShowMenu(null);
      if (currentFolder === oldName) {
        setCurrentFolder(newName);
      }
    }
  };

  return (
    <div className="file-management p-4">
      <div className="folders grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* New Folder Card */}
        <div
          className="folder-card border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
          onClick={() => {
            const folderName = prompt("Enter folder name:");
            if (folderName) {
              setNewFolderName(folderName);
              createFolder();
            }
          }}
        >
          <FaPlus className="text-gray-500 text-4xl mb-2" />
          <p className="text-gray-500">New Folder</p>
        </div>

        {/* Existing Folders */}
        {folders.map((folder, index) => (
          <div
            key={folder.name}
            className="relative folder-card border border-gray-200 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-300"
            onClick={() => setCurrentFolder(folder.name)}
          >
            <FaFolder
              className="text-coai-blue text-4xl mb-2"
              
            />
            <p className="text-center text-gray-700">{folder.name}</p>
            <FaEllipsisV
              className="absolute top-2 right-2 text-gray-500 cursor-pointer  rounded hover:bg-gray-200"
              onClick={() => setShowMenu(showMenu === index ? null : index)}
            />

            {/* Dropdown Menu */}
            {showMenu === index && (
              <div className="absolute top-8 right-2 bg-white shadow-lg rounded-lg py-2 z-10 "
              ref={menuRef}
>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                  onClick={() => renameFolder(folder.name)}
                >
                  <FaEdit className="inline mr-2" /> Rename
                </button>
                <button
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left hover:bg-gray-200"
                  onClick={() => deleteFolder(folder.name)}
                >
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Display Files in Current Folder */}
      {currentFolder && (
        <div className="files mt-8">
          <h2 className="text-xl font-bold mb-4">
            Files in {currentFolder} Folder
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
                                 {"Only PDF files are allowed"}
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
            {folders
              .find((folder) => folder.name === currentFolder)
              ?.files.map((file, index) => (
                <div
                  key={index}
                  className="relative file-card border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:bg-gray-100"
                >
                  <FaFilePdf className="text-red-500 text-4xl mb-2" />
                 <p className="text-center text-gray-700 text-sm truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                   {file.name}
                 </p>
                 
                  <FaTrash
                    className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-900"
                    onClick={() => deleteFile(file.name)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManagement;
