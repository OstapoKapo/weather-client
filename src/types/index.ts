
 export  interface weatherResponse{
    currentDay: currentDay,
    hourlyForecast: hourlyForecast[],
    forecast5Days: forecast5Days[]
 } 
 export  interface currentDay  {
        "coord" : {
             "lon": number,
             "lat": number
        },
        "weather": [
            {
                "id": number,
                "main": string,
                "description":string,
                "icon": string
            }
        ],
        "base": string,
        "main": {
            "temp": number,
            "feels_like": number,
            "temp_min": number,
            "temp_max": number,
            "pressure": number,
            "humidity": number,
            "sea_level": number,
            "grnd_level": number,
            temp_kf?: number
        },
        "visibility": number,
        "wind": {
            "speed": number,
            "deg": number,
            "gust": number
        },
        "clouds": {
            "all": number
        },
        "dt": number,
        "sys": {
            "type"?: number,
            "id"?: number,
            "country"?:string,
            "sunrise"?: number,
            "sunset"?: number,
            "pod"?: string
        },
        "timezone": number,
        "id": number,
        "name": string,
        "cod": number,
        "todayHighLow": {
            "max": number,
            "min": number
        }
    }
export  interface hourlyForecast {
            "dt": number,
            "main": {
                "temp": number,
                "feels_like": number,
                "temp_min": number,
                "temp_max": number,
                "pressure": number,
                "sea_level": number,
                "grnd_level": number,
                "humidity": number,
                temp_kf?: number
            },
            "weather": [
                {
                    "id": number,
                    "main": string,
                    "description": string,
                    "icon": string
                }
            ],
            "clouds": {
                "all": number
            },
            "wind": {
                "speed": number,
                "deg": number,
                "gust": number
            },
            "visibility": number,
            "pop": number,
            "rain"?: {
                "3h":number
            },
            "sys": {
                "type"?: number,
                "id"?: number,
                "country"?:string,
                "sunrise"?: number,
                "sunset"?: number,
                "pod"?: string
            },
            "dt_txt": string
        }

export interface forecast5Days{
            "maxTemp": number,
            "minTemp": number,
            main: string,
            icon: string,
            day: string
}