import React, {Component} from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import {fromLonLat} from "ol/proj";
import {XYZ} from "ol/source";

import classes from './PublicMap.module.css'

class PublicMap extends Component {
  constructor(props) {
    super(props);

    //const map_types = [{"pixelkarte-farbe"}, {"pixelkarte-farbe-winter"}, {"swissimage"}, {"SWISSTLM3D_EISENBAHNNETZ"}, {"SEGELFLUGKARTE"}, {"SPERR_GEFAHRENZONENKARTE"}, {"HIKS_DUFOR"}, {"HIKS_SIEGFRIED"}]

    this.getMap("swissimage")
  }

  getMap(map_type) {
    this.state = {center: [8.733389, 47.5006875], zoom: 16};

    this.olmap = new OlMap({
      target: "map",
      loadTilesWhileAnimating: true,
      layers: [
        new OlLayerTile({
          source: new XYZ({
            url: 'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.' + map_type + '/default/current/3857/{z}/{x}/{y}.jpeg'
            
          })
        })
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
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [8.733389, 47.500], zoom: 16 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" className={classes.displayMap}>
       
      </div>
    );
  }
}

export default PublicMap;
