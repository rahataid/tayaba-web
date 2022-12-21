import { useRef, memo } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
//
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

// ----------------------------------------------------------------------

function MapClusters({ mapData = [], ...other }) {
  const mapRef = useRef(null);

  mapData = mapData.map((item) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [+item?.extras?.geo_longitude, +item?.extras?.geo_latitude],
    },
    properties: {
      cluster: true,
      id: item.id,
    },
  }));

  let data = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    features: mapData,
  };

  const onClick = (event) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature?.geometry?.coordinates,
        zoom: Number.isNaN(zoom) ? 3 : zoom,
        duration: 500,
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          longitude: 85.7935933,
          latitude: 26.629917,
          zoom: 11,
        }}
        interactiveLayerIds={[clusterLayer.id || '']}
        onClick={onClick}
        ref={mapRef}
        {...other}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data={data}
          // data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}

export default memo(MapClusters);
