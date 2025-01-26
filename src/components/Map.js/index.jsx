import React, { useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import { setAssetPath as setCalciteComponentsAssetPath } from "@esri/calcite-components/dist/components";
import { ArcgisMap, ArcgisZoom, ArcgisHome, ArcgisSearch } from "@arcgis/map-components-react";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-home";
import "@arcgis/map-components/dist/components/arcgis-search";

setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");

export default function Map() {
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);

  useEffect(() => {
    const loadGeoJsonLayer = async () => {
      const [GeoJSONLayer] = await loadModules(["esri/layers/GeoJSONLayer"]);
      const layer = new GeoJSONLayer({
        url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/LATEST_CORE_SITE_READINGS/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      });
      setGeoJsonLayer(layer);
    };
    loadGeoJsonLayer();
  }, []);

  const handleViewReady = (event) => {
    const view = event?.detail?.view;
    if (view && geoJsonLayer) {
      view.map.add(geoJsonLayer);
    }
  };

  return (
    <div>
      <ArcgisMap
        itemId="d5dda743788a4b0688fe48f43ae7beb9"
        onArcgisViewReadyChange={handleViewReady}
      >
        <ArcgisSearch position="top-right"></ArcgisSearch>
        <ArcgisZoom position="top-left"></ArcgisZoom>
        <ArcgisHome position="top-left" style={{ marginTop: "50px" }}></ArcgisHome>
      </ArcgisMap>
    </div>
  );
}
