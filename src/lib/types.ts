type WeatherForecast = {
    timestamp: number;
    weather: string;
    minTemperature: number;
    maxTemperature: number;
    minTemperatureDiff: number;
    maxTemperatureDiff: number;
    pop: number;
    name: string;
};

type HourlyWeatherForecast = {
    timestamp: number;
    weather: string;
    temperature: number;
    name: string;
};

export type Weather = "CLEAR" | "RAIN" | "CLOUDY" | "SNOW" | "HEAVY_RAIN"
export type Conjunction = "AND" | "TO";

type OptimalDailyWeatherForecast = {
    timestamp: number;
    weather: Weather;
    secondaryWeather?: Weather;
    conjunction?: Conjunction;
    minTemperature: number;
    maxTemperature: number;
    minTemperatureDiff: number;
    maxTemperatureDiff: number;
    pop: number;
    name: string;
};

type ContentWeatherForecast = {
    locationId: string;
    cityName: string;
    locationName: string;
    poiType: string;
    optimalDailyWeatherForecast: OptimalDailyWeatherForecast;
    dailyWeatherForecasts: WeatherForecast[];
    hourlyWeatherForecasts: HourlyWeatherForecast[];
};

type ContentWarning = {
    radarName: string;
    radarType: string;
    text: string;
    poiType: string;
    locationTitle: string;
    warningType: string;
};

type Message = {
    available: boolean;
    text: string;
    status: string;
};

type RRLocationForecast = {
    message: Message;
    forecasts: RRLocationForecastNode[];
};
export type RRLocationForecastNode = {
    timestamp: number,
    weather: "NONE" | "RAIN",
    strength: "NONE" | "WEAK" | "MEDIUM" | "STRONG"
}


type TileUrls = {
    [key: string]: string;
};

type ContentRainRadar = {
    currentEpochSecond: number;
    lastUpdated: number;
    supportedEpochSeconds: number[];
    maxZoomLevel: number;
    tileUrls: TileUrls;
    locationForecast: RRLocationForecast;
};

export type DataItemWeatherForecast = {
    id: string;
    tid: string;
    url: string;
    title: "Weather Forecast";
    content: ContentWeatherForecast;
};

export type DataItemWarning = {
    id: string;
    tid: string;
    url: string;
    title: "警報・注意報";
    content: ContentWarning;
};

export type DataItemRainRadar = {
    id: string;
    tid: string;
    url: string;
    title: "Rain Radar";
    content: ContentRainRadar;
};

type DataItem = DataItemWeatherForecast | DataItemWarning | DataItemRainRadar;

export type TopLinkAPIResponse = {
    data: DataItem[];
};

export type LatLng = {
    latitude: number;
    longitude: number;
}

export type LocationInfo = {
    latitude?: number;
    longitude?: number;
    locationId?: number;
}
export type PlaceData = {
    location: LocationInfo;
    response: TopLinkAPIResponse
}
