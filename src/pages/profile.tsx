import Layout from "@/components/Layout";
import {UserProfile} from "@clerk/nextjs";

export default function Profile() {
    return <Layout>
        <main className='w-full min-h-full flex gap-8 p-2 items-center justify-center'>
            <UserProfile />
        </main>
    </Layout>
}
