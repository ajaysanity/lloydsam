"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  center: [number, number]; // [lng, lat]
  zoom?: number;
  markerLabel?: string;
  className?: string;
}

export function Map({ center, zoom = 16, markerLabel, className }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center,
      zoom,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    const el = document.createElement("div");
    el.style.cssText = `
      width: 36px; height: 44px;
      background: #3b6ea5;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 16px rgba(26,48,96,0.35);
      cursor: pointer;
    `;
    const dot = document.createElement("div");
    dot.style.cssText = `
      width: 10px; height: 10px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -55%) rotate(45deg);
    `;
    el.appendChild(dot);

    new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(center)
      .setPopup(
        markerLabel
          ? new maplibregl.Popup({ offset: 8, closeButton: false })
              .setText(markerLabel)
          : undefined
      )
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, markerLabel]);

  return <div ref={containerRef} className={className ?? "w-full h-full"} />;
}
