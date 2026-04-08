import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Circle, Fill, Stroke } from "ol/style";
import WebGLVectorLayer from "ol/layer/WebGLVector";
import { XYZ } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";

import countries from "../public/countries.json"

export function createMap(container) {
	const vectorSource = new VectorSource();

	const vectorLayer = new VectorLayer({
		source: vectorSource,
		style: defaultStyle(),
	});

	const webGlLayer = new WebGLVectorLayer({
		source: vectorSource,
		style: {
			"circle-radius": 6,
			"circle-fill-color": "#e63946",
			"circle-stroke-color": "#fff",
			"circle-stroke-width": 2,
		},
	})

	const map = new Map({
		target: container,
		controls: [],

		layers: [
			new TileLayer({ source: new OSM() }),

			// new VectorLayer({
			// 	source: new VectorSource({
			// 		url: "countries.json",
			// 		format: new GeoJSON(),
			// 	}),
			// 	style: new Style({
			// 		// fill: new Fill({ color: "#f5f0e8", opacity: .1 }),
			// 		stroke: new Stroke({ color: "#ccc", width: 0.5 }),
			// 	}),
			// }),


			vectorLayer,
		],
		view: new View({
			center: fromLonLat([0, 20]),
			zoom: 3,
		}),
	});

	return { map, vectorSource, vectorLayer };
}

export function defaultStyle() {
	return new Style({
		image: new Circle({
			radius: 6,
			fill: new Fill({ color: "#e63946" }),
			stroke: new Stroke({ color: "#fff", width: 2 }),
		}),
	});
}

export function activeStyle() {
	return new Style({
		image: new Circle({
			radius: 9,
			fill: new Fill({ color: "#f4a261" }),
			stroke: new Stroke({ color: "#fff", width: 2 }),
		}),
	});
}

export function makeFeature(item) {
	const feature = new Feature({
		geometry: new Point(fromLonLat([item.Location.Longitude, item.Location.Latitude])),
		item,
	});
	feature.setId(item.FId);
	return feature;
}
