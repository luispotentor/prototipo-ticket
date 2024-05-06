"use client"

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation"

interface PropsRedirect {
    children: React.ReactNode
}

export const Redirect: React.FC<PropsRedirect>= ( props ) => {
    
    const { children } = props;
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if ( session?.user ) {
            
            const {start_url } = session?.user as any;
            if ( start_url ) {
                router.push(start_url);
            }
        } else{
            router.push('/auth/login');
        }
    }, [session]);
    return (
        <>{children}</>
    )
}