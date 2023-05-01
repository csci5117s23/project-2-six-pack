import Head from 'next/head'
import Navbar from '@/components/Navbar'
import MovieList from "@/components/MovieList";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>ScreenStash</title>
                <meta name="description" content="A simple movie list manager" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar />
            <main className='flex-grow bg-gradient-to-b from-black to-blue-900'>
                {/* Movie list */}
                <MovieList />
            </main>
        </>
    )
}
