import {SerializableModel} from "./SerializableModel";

export class DailyHistory implements SerializableModel {

    date: string
    night: boolean
    day: boolean

    constructor(date: string, night: boolean = false, day: boolean = false) {
        this.date = date
        this.night = night
        this.day = day
    }

    toJson(): any {
    }
}
