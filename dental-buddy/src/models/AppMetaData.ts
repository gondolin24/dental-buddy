import {SerializableModel} from "./SerializableModel";
import {getCurrentDate} from "../utils/Time-Utils";

export class AppMetaData implements SerializableModel {

    dailyHistoryMap: {}
    lastLogin: string

    constructor(dailyHistoryMap: {} = {}, lastLogin: string = getCurrentDate()) {
        this.dailyHistoryMap = dailyHistoryMap
        this.lastLogin = lastLogin
    }

    toJson(): any {
        return {
            dailyHistoryMap: this.dailyHistoryMap,
            lastLogin: this.lastLogin
        }
    }

    static fromJson(schema: any) {
        if ((schema === undefined)) {
            return new AppMetaData()
        }

        const dailyHistoryMap = schema.dailyHistoryMap || {}
        const lastLogin = schema.lastLogin || getCurrentDate()
        return new AppMetaData(dailyHistoryMap, lastLogin)

    }
}
