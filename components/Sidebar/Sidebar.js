import React, { useState } from 'react';
import { DatasetIcon, HomeIcon, LeftIcon, ProjectIcon, SaleIcon, TraceIcon, UserIcon } from '@/public/Assets/Icons/Allsvg';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const dynamicClassName = `trans ${isHovered ? 'hovered-class' : ''}`;
    return (
        <div>
            <div className='p-[12px] flex flex-col justify-between h-screen border-r-[#CCCCCC] border-r-[1px] w-fit cursor-pointer trans'>
                <div className={dynamicClassName}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <img src="/Assets/Images/Logo.png" alt="Logo" />
                    <div className=' trans'>
                        <div className='pl-[21px] pr-[21px] group-hover:pr-[45px] trans'>
                            <div className='flex gap-[10px] items-center mt-[27px]'>
                                <LeftIcon className='w-[24px] rotate-[180deg] group-hover:hidden trans' />
                                <LeftIcon className='w-[24px]  group-hover:block hidden' />
                                <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Close</p>
                            </div>
                            <div>
                                <div className='flex gap-[10px] items-center mt-[47px]'>
                                    <HomeIcon className='w-[24px]' />
                                    <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Home</p>
                                </div>
                                <div className='flex gap-[10px] items-center mt-[30px]'>
                                    <ProjectIcon className='w-[24px]' />
                                    <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Projects</p>
                                </div>
                                <div className='flex gap-[10px] items-center mt-[30px]'>
                                    <DatasetIcon className='w-[24px]' />
                                    <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Datasets</p>
                                </div>
                                <div className='flex gap-[10px] items-center mt-[30px]'>
                                    <TraceIcon className='w-[24px]' />
                                    <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Traces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={dynamicClassName}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <div className='mb-[50px] pl-[21px] pr-[21px] group-hover:pr-[45px] trans'>
                        <div className='flex gap-[10px] items-center'>
                            <UserIcon className='w-[24px]' />
                            <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Account</p>
                        </div>
                        <div className='flex gap-[10px] items-center mt-[30px]'>
                            <SaleIcon className='w-[24px]' />
                            <p className='text-[12px] font-Archivo font-normal leading-[normal] hidden'>Settings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar