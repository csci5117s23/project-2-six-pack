import {SignIn} from "@clerk/nextjs";

export default function SignInPage() {
    return <main className='w-full h-screen flex flex-col gap-8 items-center justify-center'>
        <SignIn redirectUrl='/dashboard' signUpUrl='/sign-up' />
    </main>
}