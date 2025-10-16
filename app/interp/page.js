'use client'
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RightIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import { getUserRole } from "@/helper/getRole";
import Loader from "@/components/Loader/Loader";

// New Dashboard Components
import InterpretabilityDashboard from "@/components/Interp/InterpretabilityDashboard";

const InterpretabilityPage = () => {
    const [role, setRole] = useState("");
    const [loader, setLoader] = useState(true);

    const getRole = async () => {
        const roles = await getUserRole();
        if (roles) {
            setRole(roles);
            setLoader(false);
        }
    };

    useEffect(() => {
        getRole();
    }, []);

    return (
        <>
            {loader ? (
                <Loader />
            ) : role.includes("Full_Access") ? (
                <div className="flex">
                    <Sidebar />
                    <div className="w-full h-screen overflow-hidden sm:ml-[96px] ml-[72px]">
                        {/* Header */}
                        <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC] flex-shrink-0">
                            <div className="flex items-center gap-[5px]">
                                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                                    COAI
                                </h1>
                                <RightIcon />
                                <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
                                    Interpretability
                                </h1>
                            </div>
                            <Logout />
                        </div>

                        {/* Dashboard Content - Full Height */}
                        <div className="h-full overflow-hidden">
                            <InterpretabilityDashboard />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center">
                    <p className="text-[20px]">
                        You don't have permission to access this page.
                    </p>
                </div>
            )}
        </>
    );
};

export default InterpretabilityPage;