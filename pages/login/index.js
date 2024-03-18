// import { GoogleIcon, PasswordIcon } from "@/public/Assets/Icons/Allsvg";
// import React from "react";

// const Login = () => {
//   return (
//     <>
//       <div className="flex md:flex-row flex-col w-full h-screen">
//         <div className="w-auto m-auto md:p-0 p-[70px_0]">
//           <img src="/Assets/Images/LoginLogo.png" alt="" />
//         </div>
//         <div className="lg:w-[535px] md:w-[420px] w-full md:border-l md:border-l-[#ccc]">
//           <div className="md:py-[103px] lg:px-[86px] sm:px-[30px] px-[16px]">
//             <h1 className="text-center text-[20px] font-medium font-[Roboto] text-[#282828]">
//               AI Safety & Monitoring Solution
//             </h1>
//             <form action="" className="pt-[48px]">
//               <h1 className="text-[20px] font-semibold font-[Poppins] text-[#0D859A]">
//                 Nice to see you again
//               </h1>

//               <div className="pt-[24px]">
//                 <label
//                   for="email"
//                   className="block mb-2 text-[11px] text-[#333333] font-normal  pl-[16px]"
//                 >
//                   Login
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] w-full border-none bg-[#F2F2F2] font-[Roboto] text-[15px] font-normal rounded-lg py-[14px] px-[16px] outline-none placeholder:text-[#808080]"
//                   placeholder="Email or phone number"
//                   required=""
//                 />
//               </div>
//               <div className="pt-[24px] ">
//                 <label
//                   for="email"
//                   className="block mb-2 text-[11px] text-[#333333] font-normal  pl-[16px]"
//                 >
//                   Password
//                 </label>
//                 <div className="flex relative">
//                   <input
//                     id="password"
//                     type="password"
//                     className="focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] w-full border-none bg-[#F2F2F2] font-[Roboto] text-[15px] font-normal rounded-lg py-[14px] px-[16px] outline-none placeholder:text-[#808080]"
//                     placeholder="Enter password"
//                     required=""
//                   />
//                   <PasswordIcon className="absolute right-[16px] top-[20px]" />
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-between text-sm">
//                 <label class="relative inline-flex items-center cursor-pointer">
//                   <input type="checkbox" value="" class="sr-only peer" />
//                   <div
//                     class="w-11 h-6 bg-[#F2F2F2] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white
//                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
//                   ></div>
//                   <span class="ms-3 text-[#1A1A1A] font-[Roboto] text-[12px] font-normal tracking-wider sf_display_400">
//                     Remember Me
//                   </span>
//                 </label>
//                 <a
//                   className="text-[#0D859A] font-[Roboto] text-[12px] font-normal tracking-wider"
//                   href="#"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="text-center mt-[32px] mb-[65px] w-full block bg-[#0D859A] font-[Roboto] py-[10px] text-[#fff]  rounded-[6px] text-[15px] font-bold tracking-wider">
//                 <a href="/api/auth/login" className="w-full" type="submit">
//                   Sign in
//                 </a>
//               </div>
//               <div className="text-center">
//                 <button
//                   className="w-full bg-[#333333] flex justify-center items-center gap-[8px] font-[Roboto] py-[10px] text-[#fff]  rounded-[6px] text-[12px] font-normal "
//                   type="submit"
//                 >
//                   <GoogleIcon />
//                   Or sign in with Google
//                 </button>
//               </div>
//               <div className="text-[#1A1A1A] font-[Roboto] text-[12px] font-normal text-center mt-[24px] md:pb-0 pb-[40px]">
//                 Dont have an account?
//                 <a
//                   className="text-[#0D859A] font-[Roboto] text-[12px] font-normal "
//                   href="#"
//                 >
//                   &nbsp; Sign up now
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
    if (user) {
      router.push("/callback");
    }
  }, [isLoading, user, router]);

  return <div></div>;
};

export default Login;
