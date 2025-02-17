import React, { useState, Fragment } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";


const DeleteProjectModal = ({
  open,
  setOpen,
  selectedProjectForDelete,
  handleProjectDelete,
  projects,
}) => {
  const [isMoving, setIsMoving] = useState(false);
  const [targetProject, setTargetProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects
    .filter(p => p.project_id !== selectedProjectForDelete.project_id)
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleConfirm = async (action) => {
    try {
      if (action === 'move') {
        // First move the traces
        const response = await fetch('/api/manageTraces', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceProjectId: selectedProjectForDelete.project_id,
            targetProjectId: targetProject?.project_id,
            action: action,
          })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to move traces');
        }

        // After successful move, delete the source project
        await handleProjectDelete('delete');
      } else if (action === 'delete') {
        // Just delete the project without moving traces
        await handleProjectDelete('delete');
      }

      setOpen(false);
    } catch (error) {
      console.error('Error managing traces:', error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100]"
        onClose={() => setOpen(false)}
      >

        <div className="fixed inset-0 z-[101] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              <Dialog.Panel className="relative transform overflow-visible rounded-lg bg-white border border-gray-200 shadow-xl transition-all sm:w-[500px]">
                <div className="px-6 py-5">
                  <div className="text-center mb-5">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      Delete Project
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-gray-500">
                      Choose what to do with the traces in this project
                    </p>
                  </div>

                  {!isMoving ? (
                    <div className="bg-gray-50 p-4 rounded-lg mb-5">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedProjectForDelete.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">
                          {selectedProjectForDelete.name}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Listbox value={targetProject} onChange={setTargetProject}>
                          <div className="relative">
                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 py-2.5 pl-4 pr-10 text-left hover:bg-gray-100 transition-colors">
                              <span className="block truncate text-sm font-normal">
                                {targetProject?.name || 'Select target project'}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <IoChevronDownOutline className="h-4 w-4 text-gray-400" />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-[102] w-full overflow-visible bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="sticky top-0 bg-white p-2 border-b">
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <div className="max-h-[200px] overflow-auto">
                                  {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                      <Listbox.Option
                                        key={project.project_id}
                                        value={project}
                                        className={({ active }) =>
                                          `relative cursor-pointer select-none py-2.5 pl-4 pr-4 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                          }`
                                        }
                                      >
                                        {({ selected }) => (
                                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {project.name}
                                          </span>
                                        )}
                                      </Listbox.Option>
                                    ))
                                  ) : (
                                    <div className="py-2.5 px-4 text-sm text-gray-500 text-center">
                                      No projects found
                                    </div>
                                  )}
                                </div>
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>

                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 mt-8">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    {!isMoving ? (
                      <>
                        <button
                          onClick={() => setIsMoving(true)}
                          className="px-5 py-2 text-sm font-medium text-gray-700 bg-white rounded-full shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-all"
                        >
                          Move Traces
                        </button>
                        <button
                          onClick={() => handleConfirm('delete')}
                          className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-full shadow-sm hover:bg-red-600 transition-colors"
                        >
                          Delete Project
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConfirm('move')}
                        disabled={!targetProject}
                        className={`px-5 py-2 text-sm font-medium text-white rounded-full shadow-sm transition-all ${targetProject
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-gray-200 cursor-not-allowed'
                          }`}
                      >
                        Confirm Move
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteProjectModal;
