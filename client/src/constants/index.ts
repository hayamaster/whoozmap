export const CATEGORY_LIST = [
  "eats-drinks",
  "dates",
  "adventures",
  "shops",
  "hangouts",
  "relaxations",
  "attractions",
  "celebrations",
  "others",
];

export const INITIAL_MAP_CENTER = {
  lat: 43.6640848,
  lng: -79.3887719,
};

export const INITIAL_MAP_OPTION = {
  mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
  disableDefaultUI: true,
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoom: 16,
  maxZoom: 18,
  gestureHandling: "greedy",
  restriction: {
    latLngBounds: {
      north: 64,
      south: 25,
      east: -53,
      west: -144,
    },
    strictBounds: true,
  },
};
