import React, {Component, useEffect, useState} from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import {fromLonLat} from "ol/proj";
import {XYZ} from "ol/source";
import classes from './PublicMap.module.css'
import Card from "../UI/Card";


function MapFeature(props) {
    const [locationObject, setLocationObject] = useState({});
    let olmap;

    useEffect(() => {
        setLocationObject({center: [props.posLng, props.posLat], zoom: 16});
        if (olmap) {
            updateMap();
        }

    }, [props.posLng, props.posLat])

    useEffect(() => {
        olmap = new OlMap({
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
                center: fromLonLat([props.posLng, props.posLat]),
                zoom: 16
            })
        });
    }, []);


    function updateMap() {
        olmap.getView().setCenter(fromLonLat(locationObject.center));
        olmap.getView().setZoom(locationObject.zoom);
    }

    function componentDidMount() {
        olmap.setTarget("map");

        // Listen to map changes
        olmap.on("moveend", () => {
            let center = olmap.getView().getCenter();
            let zoom = olmap.getView().getZoom();
            setLocationObject({center, zoom});

        });
    }

    function shouldComponentUpdate(nextProps, nextState) {
        let center = olmap.getView().getCenter();
        let zoom = olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    function userAction() {
        setLocationObject({center: [this.props.posLng, this.props.posLat], zoom: 16});
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
            <div id="map" className={classes.displayMap}/>

        </Card>
    );
}

export default MapFeature;
