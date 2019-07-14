// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: "0.8.0",
  keys: {
    openWeatherApi: "",
    unsplashAccess: ""
  },
  urls: {
    crossOrigin: {
      // https://medium.freecodecamp.org/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86
      allOrigins: "http://allorigins.me/get?url=",
      anyOrigin: "http://anyorigin.com/go?url=",
      crossOrigin: "https://crossorigin.me/",
      whateverOrigin: "http://www.whateverorigin.org/get?url="
    },

    apis: {
      // e.g. https://samples.openweathermap.org/pollution/v1/co/0.0,10.0/2016-12-25T01:04:08Z.json?appid=b1b15e88fa797225412429c1c50c122a1
      airPollution: "http://api.openweathermap.org/pollution/v1/%s/%s/%s.json?appid=%s",
      currentWeather: "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}",
      geoCodeForCity: "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}",
      image: "https://api.unsplash.com/search/photos?client_id={0}&orientation={1}&query={2}",
      uvIndex: "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}",
      weatherForecast: "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}"
    }
  }
};
