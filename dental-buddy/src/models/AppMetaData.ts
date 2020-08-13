import {SerializableModel} from "./SerializableModel";
import {getCurrentDate, getCurrentDateKey} from "../utils/Time-Utils";
import {DailyHistory} from "./DailyHistory";

export class AppMetaData implements SerializableModel {

    dailyHistoryMap: {};
    lastLogin: string;
    changeData: boolean

    constructor(dailyHistoryMap: {} = {}, lastLogin: string = getCurrentDate(), changeData: boolean = false) {
        if (Object.values(dailyHistoryMap).length === 0) {
            const key = getCurrentDateKey();
            const temp = {}
            // @ts-ignore
            temp[key] = new DailyHistory(getCurrentDate())
            // @ts-ignore
            this.dailyHistoryMap = temp
        } else {
            this.dailyHistoryMap = dailyHistoryMap
        }
        this.changeData = changeData
        this.lastLogin = lastLogin
    }

    toJson()
        :
        any {
        return {
            metaData: {
                dailyHistoryMap: this.dailyHistoryMap,
                lastLogin: this.lastLogin
            }

        }
    }

    static

    fromJson(schema
                 :
                 any
    ):
        AppMetaData {
        if ((schema === undefined)) {
            return new AppMetaData()
        }

        const dailyHistoryMap = schema.dailyHistoryMap || {};
        const lastLogin = schema.lastLogin || getCurrentDate();
        return new AppMetaData(dailyHistoryMap, lastLogin)

    }
}
