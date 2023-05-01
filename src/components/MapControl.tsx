import { useGoogleMap } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

interface MapControlProps {
    position: keyof typeof google.maps.ControlPosition;
}

const MapControl = (props: React.PropsWithChildren<MapControlProps>) => {
   
    const map = useGoogleMap();
    const ref: any = useRef();

    useEffect(() => {
        if (map && ref) {
            map.controls[window.google.maps.ControlPosition[props.position]].push(
                ref.current
            );
        }
    }, [map, ref]);
    return <div ref={ref}>{props.children}</div>;
};

export default MapControl;
