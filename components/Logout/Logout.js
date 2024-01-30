import { LockIcon } from '@/public/Assets/Icons/Allsvg'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react'

const Logout = () => {
  const router  = useRouter()
    function logoutUser(){
        const userToken = Cookies.get('user_id');
        if(userToken){
          Cookies.remove('user_id');
        }
        router.push('/api/auth/logout')
    }
  return (
    <>
        <button onClick={logoutUser} >
        <LockIcon  />
        </button>
    </>
  )
}

export default Logout