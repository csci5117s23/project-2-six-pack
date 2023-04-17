import Layout from "@/components/Layout";

export default function Home() {
    return (
        <>
            <Layout>
                <div className="p-6 bg-gray-500 flex flex-col items-center min-h-screen justify-center bg-hero-pattern bg-repeat animate-ltr-linear-infinite">
                    <main className='w-full flex gap-8 items-center justify-center'>
                        Hello Index Page!
                    </main>
                </div>
            </Layout>
        </>
    )
}
