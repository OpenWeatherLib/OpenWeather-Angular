import { Coordinates2 } from "@lib/models/coordinates2";
import { Viewport } from "@lib/models/viewport";

export interface Geometry {
    location_type: string;
    viewport: Viewport;
    location: Coordinates2;
}