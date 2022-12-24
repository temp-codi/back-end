# REST API example application

- [Setup](#install)
- [REST API](#rest-api)
- [Reverse Geo-location](#reverse-geo-location)
- [Get Weather Data](#get-weather-data)
- [Weather Code](#weather-code)

## Install

    npm install

## Run the app

    npm run start

# REST API

The REST API to the example app is described below.

## Reverse Geo-location

### Request

`GET /city/location?lon,lat`

```
    curl http://localhost:8080/api/v1/city?lon=127.390209&lat=36.336614 \
    -H "Content-Type: application/json \
```

### Response

```js
    {
    "res": true,
    "data": {
        "latitude": 36.336614,
        "longitude": 127.390209,
        "continent": "Asia",
        "lookupSource": "coordinates",
        "continentCode": "AS",
        "localityLanguageRequested": "en",
        "city": "Daejeon",
        "countryName": "Korea (the Republic of)",
        "countryCode": "KR",
        "postcode": "",
        "principalSubdivision": "Daejeon",
        "principalSubdivisionCode": "KR-30",
        "plusCode": "8Q8989PR+J3",
        "locality": "Seo District",
        "localityInfo": {
            "administrative": [
                {
                    "name": "Korea (the Republic of)",
                    "description": "republic in East Asia",
                    "order": 2,
                    "adminLevel": 2,
                    "isoCode": "KR",
                    "wikidataId": "Q884",
                    "geonameId": 1835841
                },
                {
                    "name": "Daejeon",
                    "description": "metropolitan city in South Korea",
                    "order": 5,
                    "adminLevel": 4,
                    "isoCode": "KR-30",
                    "wikidataId": "Q20921",
                    "geonameId": 1835224
                },
                {
                    "name": "Seo District",
                    "description": "administrative division of Daejeon, South Korea",
                    "order": 6,
                    "adminLevel": 6,
                    "wikidataId": "Q50405",
                    "geonameId": 8419685
                },
                {
                    "order": 7,
                    "adminLevel": 8,
                    "wikidataId": "Q12608679",
                    "geonameId": 8691784
                }
            ],
            "informative": [
                {
                    "name": "Asia",
                    "description": "continent on Earth, mainly on the Earth's northeastern quadrant",
                    "order": 1,
                    "isoCode": "AS",
                    "wikidataId": "Q48",
                    "geonameId": 6255147
                },
                {
                    "name": "Korean Peninsula",
                    "description": "peninsula in East Asia",
                    "order": 3,
                    "wikidataId": "Q483134",
                    "geonameId": 11494804
                },
                {
                    "name": "Chungcheong region",
                    "order": 4
                }
            ]
        }
    }
}
```

## Get Weather Data

### Request

`POST /temp`

```
    curl http://localhost:8080/api/v1/temp \
    -H "Content-Type: application/json \
    -d "{"city" : "Daejeon", "lon" : "127.390209", "lat": "36.336614"}"
```

### Response

```js
{
    "res": true,
    "data": {
        "_id": "63a78c57f67379d2ad15d75e",
        "city_name": "Daejeon",
        "api_called_date": "Sun Dec 25 2022 08:33:43 GMT+0900 (대한민국 표준시)",
        "list": [
            {
                "dt": 1671926400,
                "temp": -14.03,
                "feels_like": -14.03,
                "humidity": 79,
                "cloud_in_percentage": 10,
                "wind_speed": 0.54,
                "weather_id": 800,
                "_id": "63a78c57f67379d2ad15d75f"
            },
        ],
        "pollution_en": "Fair",
        "pollution_kr": "좋음",
        "__v": 0
    }
}
```

## Weather Code

### Request

`POST /temp/getCode`

```
    curl http://localhost:8080/api/v1/temp/getCode \
    -H "Content-Type: application/json \
    -d "{"code" : 200}"
```

### Response

```js
{
    "res": true,
    "data": {
        "id": "200",
        "main": "Thunderstorm",
        "desc": "thunderstorm with light rain"
    }
}
```

### API Endpoints

Sample:
https://github.com/libeyondea/backend-node-express/edit/main/README.md
