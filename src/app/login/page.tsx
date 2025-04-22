"use client";

import React, { useState } from 'react'
// import LoginForm from './_components/LoginForm'
// import Wrapper from '@/components/includes/Wrapper'
// import RightSection from './_components/RightSection'

import dynamic from 'next/dynamic';
import Wrapper from '@/components/includes/Wrapper';

// Dynamically import sub-components to disable SSR
const LoginForm = dynamic(() => import('./_components/LoginForm'), { ssr: false });
const RightSection = dynamic(() => import('./_components/RightSection'), { ssr: false });
function LoginPage() {

  return (
    <Wrapper
      className={`min-h-[calc(100vh-85px)] bg-white"
        `}
    >
      <div className={`flex w-full  justify-between `}>
        <LoginForm />
        <RightSection />

      </div>
    </Wrapper>
  )
}

export default LoginPage
