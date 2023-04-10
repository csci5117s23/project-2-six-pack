import {PropsWithChildren} from "react";
import {UserButton} from "@clerk/nextjs";

export default function Layout(props: PropsWithChildren) {
    return <>
        <header className='flex justify-between p-2'>
            <h1>Screen Stash</h1>
            <UserButton signInUrl='/sign-in' showName={true} afterSignOutUrl='/'
                        afterMultiSessionSingleSignOutUrl='/' afterSwitchSessionUrl='/dashboard'
                        userProfileUrl='/profile'/>
        </header>
        {props.children}
    </>
}