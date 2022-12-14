import React, { Component, useEffect, useState } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlOverlay from "ol/Overlay";
import OlLayerTile from "ol/layer/Tile";
import { fromLonLat, toLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import classes from './MapFeature.module.css'
import Card from "../UI/Card";


function MapFeature(props) {
    const [locationObject, setLocationObject] = useState({ center: [8.7345075, 47.5004427], zoom: 16 });
    const [olmap, setOlmap] = useState(new OlMap({
        target: null,
        loadTilesWhileAnimating: true,
        layers: [
            new OlLayerTile({
                source: new XYZ({
                    url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg'
                })
            }),
        ],
        controls: [],
        view: new OlView({
            center: fromLonLat([8.7345075, 47.5004427]),
            zoom: 16
        })
    }));

    useEffect(() => {
        setLocationObject({ center: [props.posLng, props.posLat], zoom: 16 });
    }, [props.posLng, props.posLat])

    useEffect(() => {
        if (olmap) {
            updateMap();
        }
    }, [locationObject])

    function updateMap() {
        olmap.getView().setCenter(fromLonLat(locationObject.center));
        olmap.getView().setZoom(locationObject.zoom);
        olmap.setTarget("map");

        const marker = new OlOverlay({
            position: fromLonLat(locationObject.center),
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false,
          });
          olmap.addOverlay(marker);
    }

    function shouldComponentUpdate(nextProps, nextState) {
        let center = olmap.getView().getCenter();
        let zoom = olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    function userAction() {
        setLocationObject({ center: [props.posLng, props.posLat], zoom: 16 });
    }

    function addOneRemoveOther(layerName) {
        olmap.getAllLayers().every(e => olmap.removeLayer(e));
        olmap.addLayer(new OlLayerTile({
            source: new XYZ({
                url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.${(layerName.toString())}/default/current/3857/{z}/{x}/{y}.jpeg`
            })
        }));
    }

    return (
         <Card>
            {(props.posLng && props.posLat) && (<div>
                <div className={classes.buttonsDiv}>
                    <button className={classes.button} onClick={e => addOneRemoveOther("pixelkarte-farbe")}>Strassenkarte
                    </button>
                    <button className={classes.button} onClick={e => addOneRemoveOther("swissimage")}>Satellit</button>
                    <button className={classes.button}
                        onClick={e => addOneRemoveOther("pixelkarte-farbe-winter")}>Strassenkarte hell
                    </button>
                    <button className={classes.button} onClick={e => addOneRemoveOther("pixelkarte-grau")}>Strassenkarte
                        grau
                    </button>
                </div>
                <button className={classes.button} onClick={e => userAction()}>Neu zentrieren</button>
            </div>)}
            <div id="map" className={classes.displayMap}/>
            {(props.posLng && props.posLat) && (<div id="marker" className={classes.marker} title="Marker"></div>)}
        </Card>
    );
}

export default MapFeature;
