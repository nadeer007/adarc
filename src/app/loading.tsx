"use client"
import { useState, useEffect } from "react";
import Wrapper from "@/components/includes/Wrapper";
import PageLoader from "@/components/includes/PageLoader";



export default function Loading() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Set initial online status
        setIsOnline(navigator.onLine);

        // Define event listeners
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // Attach event listeners
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <Wrapper className="h-[100vh] w-full flex items-center justify-center">
            {isOnline ?
                <PageLoader />
                : <p>No Internet</p>}

        </Wrapper>
    );
}
