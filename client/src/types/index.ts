export type LatLng = {
  lat: number;
  lng: number;
};

export interface MapCreateMetaDataType {
  title: string;
  description: string;
  thumbnailUrl: string;
  categories: string[];
}

export interface GoogleMapsPlaceType {
  name: string;
  placeId: string;
  lat: number;
  lng: number;
  icon: string;
  location: string;
  description?: string;
}
