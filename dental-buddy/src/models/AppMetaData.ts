import {SerializableModel} from "./SerializableModel";
import {DailyHistory} from "./DailyHistory";

export class AppMetaData implements SerializableModel {

    dailyHistoryList: Array<DailyHistory>

    constructor(dailyHistoryList: DailyHistory[] = []) {
        this.dailyHistoryList = dailyHistoryList
    }

    toJson(): any {
        return {
            dailyHistoryList: this.dailyHistoryList,
        }
    }

    static fromJson(schema: any) {
        if ((schema === undefined)) {
            return new AppMetaData()
        }

        const dailyHistoryList = schema.dailyHistoryList || []
        return new AppMetaData(dailyHistoryList)

    }
}
