import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Screen Stash</title>
                <meta name="description" content="A simple movie list manager" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar />
            <main>
                {/* Grid of movies/cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 justify-center">
                    {/* Movie list */}
                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                        <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flostposters.com%2Fwp-content%2Fuploads%2F2023%2F03%2FThe-Hunger-Games-The-Ballad-Of-Songbirds-And-Snakes-600x925.jpg&f=1&nofb=1&ipt=fdeb905f98a0b5544924fb7a58663b421580fd5340c86210d8ee5a745366894d&ipo=images" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            {/* <h1 className="text-3xl font-bold text-white">Hunger Games</h1> */}
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <Link href="/movieDetails" className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">See More</Link>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">

                        <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Fw440_and_h660_face%2Fuh4xY5eWCy20DjhCpfesjhdilhK.jpg&f=1&nofb=1&ipt=2d2489b36ad22ac5de54ca27e0b9d2e5d4bd45096e2610a71b26de4147b8960a&ipo=images" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            {/* <h1 className="text-3xl font-bold text-white">Hunger Games</h1> */}
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <Link href="/movieDetails" className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">See More</Link>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                        <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmarvel-cinematic-universe-fanon%2Fimages%2Ff%2Fff%2FIMG_4293.jpg%2Frevision%2Flatest%3Fcb%3D20200620101852&f=1&nofb=1&ipt=e3a3ec656c82059bc65f2d3c75e230f8193071542bdeb2c58fe66b584c7c2d24&ipo=images" alt="" />

                        <div className="absolute inset-0 bg-gradient-to-b group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            {/* <h1 className="text-3xl font-bold text-white">Hunger Games</h1> */}
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <Link href="/movieDetails" className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">See More</Link>
                        </div>
                    </div>

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                        <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.comingsoon.net%2Fwp-content%2Fuploads%2Fsites%2F3%2F2023%2F03%2FAsteroidCity_Poster.jpg%3Fw%3D691&f=1&nofb=1&ipt=a1886fb0e266b0c60aaa58e31086a0b42d3bd35a3b6668274df80b89891e29e9&ipo=images" alt="" />

                        <div className="absolute inset-0 bg-gradient-to-b group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            {/* <h1 className="text-3xl font-bold text-white">Hunger Games</h1> */}
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <Link href="/movieDetails" className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">See More</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
