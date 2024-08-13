import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import { toast } from "react-toastify";

const AddVectorStoreModal = ({ isModalOpen, setIsModalOpen, onVectorStoreCreated }) => {
  const [vectorStoreName, setVectorStoreName] = useState(""); // State for vector store name
  const [folders, setFolders] = useState([]); // State for available folders
  const [selectedFolder, setSelectedFolder] = useState(""); // State for selected folder
  const modalRef = useRef(null); // Create a ref for the modal content

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/knowledge', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }

        const data = await response.json();
        setFolders(data.data.folders);
      } catch (error) {
        console.error("Error fetching folders:", error);
        toast.error("Error fetching folders");
      }
    };

    if (isModalOpen) {
      fetchFolders();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsModalOpen]);

  const handleCreateVectorStore = async () => {
    if (!vectorStoreName.trim()) {
      toast.error("Database name cannot be empty");
      return;
    }

    if (!selectedFolder) {
      toast.error("Please select a folder");
      return;
    }

    try {
      const response = await fetch('/api/knowledge/files/vectorstore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ store_name: vectorStoreName, folder_id: selectedFolder }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create vector store");
      }

      const result = await response.json();

      setIsModalOpen(false);
      if (onVectorStoreCreated) {
        onVectorStoreCreated(result.data.vectorStore); // Trigger vector store fetch
      }
    } catch (error) {
      console.error("Error creating vector store:", error);
      toast.error(error.message);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-10 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative transform overflow-hidden rounded-lg bg-white sm:p-[37px_38px_48px_36px] p-[20px] text-left shadow-[0px_4px_4px_0px_#00000040] transition-all sm:max-w-[645px] w-full"
      >
        <div>
          <label className="text-[14px] font-medium block mb-[6px]">
            Database Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Database name"
            value={vectorStoreName}
            onChange={(e) => setVectorStoreName(e.target.value)}
            className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
          />
        </div>

        <div className="mt-[20px]">
          <label className="text-[14px] font-medium block mb-[6px]">
            Select Folder
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
          >
            <option value="" disabled>Select a folder</option>
            {folders.map((folder) => (
              <option key={folder.folder_id} value={folder.folder_id}>
                <div className="flex items-center">
                  <FaFolder className="mr-2 text-coai-blue" />
                  {folder.name}
                </div>
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-[28px]">
          <button
            onClick={handleCreateVectorStore}
            className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex justify-center items-center gap-[10px] max-w-[161px] w-full"
          >
            <FiPlus />
            Create Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVectorStoreModal;
