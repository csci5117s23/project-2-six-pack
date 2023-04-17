import Navbar from "@/components/Navbar";

export default function movieDetails() {
    return(<>
    <Navbar />
    <div className="p-5 grid grid-rows-6 grid-cols-3 gap-4 justify-items-center">
        <div className="row-span-2 justify-center">
            <img className="rounded h-auto w-auto image_height" src="https://image.tmdb.org/t/p/original/p9fmuz2Oj3HtEJEqbIwkFGUhVXD.jpg" alt="" />
        </div>
        <div className="row-span-2 col-span-2 text-left ">
            <div className="inter md:text-2xl font-bold">Hereditary</div>
            <div className="inter mb-4">2018 - R</div>
            <div className="inter md:text-lg">When her mentally ill mother passes away, Annie (Toni Collette), her husband (Gabriel Byrne), son (Alex Wolff), and daughter (Milly Shapiro) all mourn her loss. The family turn to different means to handle their grief, including Annie and her daughter both flirting with the supernatural. They each begin to have disturbing, otherworldly experiences linked to the sinister secrets and emotional trauma that have been passed through the generations of their family.</div>
        </div>
         
        <div className="row-span-1 col-span-3 justify-center mt-5">
            <div className="inter md:text-2xl font-bold text-center">Where To Watch</div>
            <a className="justify-center" href="https://play.hbomax.com/page/urn:hbo:page:GYKjr7A3svLHDwwEAAAB9:type:feature">
                <img className="h-20 md:h-min justify-center" src="https://img.icons8.com/ios-glyphs/256/hbo-max.png"></img>
            </a>
        </div>
        <div className="row-span-1 col-span-3 justify-center space-x-4 mt-5">
            <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Horror</button>
            <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Drama</button>
            <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Mystery</button>
        </div>
        <div className="row-span-1 col-span-3 justify-center">
            <div className="flex">
                <img className="h-10 w-10" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartqueen.com%2Fimage-files%2Fyellow-star-3.png&f=1&nofb=1&ipt=2edcf1502dc0af26f9466d7bf4d384b4d761dc780ce9e8a63c414a4e0b18f68b&ipo=images"></img>
                <span className="px-2 mt-2 inter text-2xl">7.3</span>
                <img className="h-12 w-12" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-imdb-an-online-database-of-information-related-to-films-and-television-programs-logo-color-tal-revivo.png"></img>
            </div>
        </div>
        <div className="row-span-1 col-span-3 justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inter">
            Add to List
        </button>
        </div>
    </div>
    </>)
}