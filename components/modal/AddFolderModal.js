import { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const AddFolderModal = ({ isModalOpen, setIsModalOpen, onFolderCreated }) => {
  const [folderName, setFolderName] = useState(""); // State for folder name
  const modalRef = useRef(null); // Create a ref for the modal content

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside of the modal content
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false); // Close the modal
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsModalOpen]);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: folderName }), // Send the folder name as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create folder");
      }

      const result = await response.json();
      if (response.status === 200) {
        console.log("Folder created successfully:", result);
      }

      setIsModalOpen(false); // Close the modal
      if (onFolderCreated) {
        onFolderCreated(result.data.folder); // Trigger folder fetch
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error(error.message);
    }
  };

  if (!isModalOpen) return null; // Render nothing if the modal is closed

  return (
    <div className="fixed inset-0 z-10 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative transform overflow-hidden rounded-lg bg-white sm:p-[37px_38px_48px_36px] p-[20px] text-left shadow-[0px_4px_4px_0px_#00000040] transition-all sm:max-w-[645px] w-full"
      >
        <div>
          <label className="text-[14px] font-medium block mb-[6px]">
            Folder Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Folder name"
            value={folderName} // Bind input value to folderName state
            onChange={(e) => setFolderName(e.target.value)} // Update state on input change
            className="border-[#EAEBF0] border-[1px] h-[40px] rounded-md text-[15px] font-normal placeholder:text-[#68727D] w-full"
          />
        </div>

        <div className="flex justify-center mt-[28px]">
          <button
            onClick={handleCreateFolder} // Call handleCreateFolder on click
            className="bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex justify-center items-center gap-[10px] max-w-[161px] w-full"
          >
            <FiPlus />
            Create folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;
