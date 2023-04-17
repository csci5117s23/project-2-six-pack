import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/nextjs";
import {useRouter} from "next/router";
import React from "react";

const public_pathnames: string[] = [
    '/',
    '/sign-up',
    '/sign-in'
];

export default function App({Component, pageProps}: AppProps) {
    const {pathname} = useRouter();

    return <ClerkProvider {...pageProps} signInUrl='/sign-in'>
        {public_pathnames.includes(pathname) ? (
            <Component {...pageProps} />
        ) : (
            <>
                <SignedIn>
                    <Component {...pageProps} />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn redirectUrl='/dashboard'/>
                </SignedOut>
            </>
        )}
    </ClerkProvider>
}
