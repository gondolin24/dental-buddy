import {SerializableModel} from "./SerializableModel";
import {DailyHistory} from "./DailyHistory";

export class AppMetaData implements SerializableModel {

    dailyHistoryMap: {}

    constructor(dailyHistoryMap: {} = {}) {
        this.dailyHistoryMap = dailyHistoryMap
    }

    toJson(): any {
        return {
            dailyHistoryMap: this.dailyHistoryMap,
        }
    }

    static fromJson(schema: any) {
        if ((schema === undefined)) {
            return new AppMetaData()
        }

        const dailyHistoryMap = schema.dailyHistoryMap || {}
        return new AppMetaData(dailyHistoryMap)

    }
}
