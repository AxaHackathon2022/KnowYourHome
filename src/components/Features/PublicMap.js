import React, {Component} from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import {fromLonLat} from "ol/proj";
import {XYZ} from "ol/source";


class PublicMap extends Component {
    constructor(props) {
        super(props);

        this.state = {center: [8.733389, 47.500], zoom: 16};

        this.olmap = new OlMap({
            target: null,
            loadTilesWhileAnimating: true,
            layers: [
                new OlLayerTile({
                    source: new XYZ({
                        url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg'
                    })
                }),
            ],
            view: new OlView({
                center: fromLonLat(this.state.center),
                zoom: this.state.zoom
            })
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(fromLonLat(this.state.center));
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({center, zoom});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    userAction() {
        this.setState({center: [8.733389, 47.500], zoom: 16});
    }
    addOneRemoveOther(layerName) {
        this.olmap.getAllLayers().every(e => this.olmap.removeLayer(e));
        this.olmap.addLayer(new OlLayerTile({
            source: new XYZ({
                url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.${(layerName.toString())}/default/current/3857/{z}/{x}/{y}.jpeg`
            })
        }));

    }

    render() {
        this.updateMap(); // Update map on render?
        return (
            <div>
                <button onClick={e => this.addOneRemoveOther("pixelkarte-farbe")}>Karte</button>
                <button onClick={e => this.addOneRemoveOther("swissimage")}>Satellit</button>
                <button onClick={e => this.addOneRemoveOther("pixelkarte-farbe-winter")}>pixelkarte-farbe-winter</button>
                <button onClick={e => this.addOneRemoveOther("pixelkarte-grau")}>pixelkarte-grau</button>
            <div id="map" style={{width: "100%", height: "360px"}}>
                <button onClick={e => this.userAction()}>Jump back</button>
            </div>
            </div>
        );
    }
}

export default PublicMap;