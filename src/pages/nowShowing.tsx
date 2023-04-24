import { useEffect,useState } from "react";
import Navbar from "../components/Navbar"
import { useJsApiLoader,GoogleMap,Marker } from "@react-google-maps/api";


/*https://www.youtube.com/watch?v=iP3DnhCUIsE&ab_channel=MafiaCodes*/
export default function NowShowing() {
    
    let [lat, setLat] : any = useState(0);
    let [long, setLong] : any = useState(0);


    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey : "AIzaSyAdLpY65aSE0Gse_S8F2w_1KM-tzdTpICg" ,
      })
    
    function suc(pos : GeolocationPosition ){
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
    }
    
    function err(err: GeolocationPositionError){
        console.log(err);
    }
    

    window.navigator.geolocation.getCurrentPosition(suc, err);

    let defaultProps = {
        center: {
          lat: lat,
          lng: long
        },
        zoom: 11
    };
    
    useEffect(() => {        
        defaultProps = {
        center: {
          lat: lat,
          lng: long
        },
        zoom: 2
      };

      
      console.log(defaultProps);
    }, [lat])
    if (!isLoaded) {
        return <></>
    }
    
    if(lat !=0 && long !=0){
        {console.log("hello")}
        return (
            <>
                <Navbar />
                <main>
                    <div className="w-[100%] px-[5%] h-screen">
                        
                        <GoogleMap
                            center={defaultProps.center}
                            zoom={defaultProps.zoom}
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            onLoad={map => {setMap(map)}}

                            
                        >

                            <Marker position={defaultProps.center} />
                        </GoogleMap>
                    </div>
                    <div className="flex">

                    </div>
                </main>
                    
            </>
        )
    }
}
