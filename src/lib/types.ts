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

type OptimalDailyWeatherForecast = {
    timestamp: number;
    weather: string;
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

type LocationForecast = {
    message: Message;
    forecasts: any[];
};

type TileUrls = {
    [key: string]: string;
};

type ContentRainRadar = {
    currentEpochSecond: number;
    lastUpdated: number;
    supportedEpochSeconds: number[];
    maxZoomLevel: number;
    tileUrls: TileUrls;
    locationForecast: LocationForecast;
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
