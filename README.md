# AI 기반, 날씨, 이벤트, MBTI를 판단해 옷을 추천합니다

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

## Recommend Clothes (using OpenAI)

### Request

`POST /openai`

```
    curl http://localhost:8080/api/v1/openai \
    -H "Content-Type: application/json \
    -d "{"desc" : "rain", "no": "7"}"
```

### Response

```js
{
    "res": true,
    "data": [
        "Waterproof coat",
        "Rubber boots",
        "Rain hat",
        "Rain pants",
        "Wool socks",
        "Poncho",
        "Umbrella"
    ]
}
```

## Search Images (using Google Search API)

### Request

`POST /google/img`

```
    curl http://localhost:8080/api/v1/google/img \
    -H "Content-Type: application/json \
    -d "{"category" : "Raincoat", "pageNo": "1", "gender": "men"}"
```

### Response

```js
{
    "res": true,
    "data": [
        {
            "img": "https://m.media-amazon.com/images/I/81m2Q+F3z-L._AC_UY780_.jpg",
            "siteLink": "https://www.amazon.com/Ponchos-Children%EF%BC%8CEmergency-Disposable-Raincoat-Drawstring/dp/B0BNX2NNG4"
        },
        {
            "img": "https://ae01.alicdn.com/kf/He2012f63a6c74ebda7396512b998f2766/Asinse-3-in-1-Outdoor-Waterproof-Reusable-Hooded-Rain-Poncho-Raincoat-for-Men-Women-Hiking-Cycling.jpg_Q90.jpg_.webp",
            "siteLink": "https://www.aliexpress.com/item/1005003490489904.html"
        },
        {
            "img": "https://assets.ajio.com/medias/sys_master/root/h70/h0e/13384890253342/-1117Wx1400H-460378903-white-MODEL.jpg",
            "siteLink": "https://www.colegiogamarra.com/2016/11/colegiogamarra.com/politica-de-cookies?ss=4_171_6_21_79&pp=branded+raincoat+for+men&ii=11540760"
        },
        {
            "img": "https://m.media-amazon.com/images/I/61c2vt0u9tL.jpg",
            "siteLink": "https://www.amazon.com/Raincoat-Waterproof-Oxford-Jackets-Lightweight/dp/B0B31DD3MZ"
        },
        {
            "img": "https://cdn.shopify.com/s/files/1/2676/2676/products/1_ZIPPERTRENCHCOAT_black.jpg?v=1611675613",
            "siteLink": "https://theraincoat.com/products/zipper-trench-coat-black-raincoat-for-men"
        },
        {
            "img": "https://m.media-amazon.com/images/I/71JYd9Vp8-S._AC_UF1000,1000_QL80_.jpg",
            "siteLink": "https://www.amazon.com/CeroPro-Rain-Ponchos-Adults-Disposable/dp/B08M7VY92Z"
        },
        {
            "img": "https://cdn.shopify.com/s/files/1/2676/2676/products/GREY_077409.jpg?v=1540752352",
            "siteLink": "https://theraincoat.com/products/biker-jacket-grey-raincoat-for-men"
        },
        {
            "img": "https://ae01.alicdn.com/kf/Hc1e7f06a4b6146679e1b6d71bc52f5509/Lightweight-Waterproof-Hooded-Rain-Poncho-Raincoat-for-Men-Women-Outdoor-Hiking-Cycling-Camping-Mat-Canopy-Shelter.jpg_Q90.jpg_.webp",
            "siteLink": "https://www.aliexpress.com/item/4001160273942.html"
        },
        {
            "img": "https://cdn.shopify.com/s/files/1/2676/2676/products/longzipperblack.jpg?v=1611662127",
            "siteLink": "https://theraincoat.com/products/long-zipper-coat-black-raincoat-for-men"
        },
        {
            "img": "https://ae01.alicdn.com/kf/S6398f8a337a9422b9a6cfa52bb7d04f0a/Golf-Bag-Rain-Cover-Waterproof-Hood-Protection-Durable-Lightweight-Club-Bags-Raincoat-For-Men-Women-Golf.jpg_Q90.jpg_.webp",
            "siteLink": "https://www.aliexpress.com/item/1005004569251032.html"
        }
    ]
}
```
