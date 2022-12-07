import React from "react";
import position from '../styles/404.module.css';
import Image from 'next/image';
import logo from '../../public/icons/Logo.svg';
import { useRouter } from 'next/router'

export default function Custom404() {
    const router = useRouter()

    return (
        <>
            <Image
                src={logo}
                alt="Logo"
                className={position.logo}
            />
            <div className={position.position}>
            <h1 className={position.h1}>Sorry... This page does not found (404)</h1>
            <button onClick={() => router.back()} className={`${position.primaryButton} `}>
                Go previous page 
            </button>
            </div>
        </>
    );
};