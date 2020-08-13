import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {ellipse, time} from 'ionicons/icons';
import Tab3 from './pages/Tab3';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import MainScreen from "./pages/main/MainScreen";
import HistoryTab from "./components/tracking/HistoryTab";
import {Plugins} from "@capacitor/core";
import {AppMetaData} from "./models/AppMetaData";

import _ from "lodash"
import {getCurrentDate, getCurrentDateKey} from "./utils/Time-Utils";
import {DailyHistory} from "./models/DailyHistory";

const {Storage} = Plugins


const App: React.FC = () => {

    const [appMetaData, setAppMetaData] = useState(new AppMetaData())
    const [inital, setInitial] = useState(true);

    useEffect(() => {
        Storage.get({key: 'metaData'}).then((result) => {
            const val: string = _.get(result, 'value') || '{}'
            const parsed = JSON.parse(val)

            if ((_.get(parsed, 'metaData')) && (inital)) {
                const json = _.get(parsed, 'metaData')
                const metaData = AppMetaData.fromJson(json)

                const lastLoginDate = getCurrentDate()
                const currentDateKey = getCurrentDateKey()
                // @ts-ignore
                const currentDate: any = metaData.dailyHistoryMap[currentDateKey]

                if (currentDate === undefined || currentDate === null) {
                    // @ts-ignore
                    metaData.dailyHistoryMap[currentDateKey] = new DailyHistory(lastLoginDate, false, false)
                }
                metaData.lastLogin = lastLoginDate

                setAppMetaData(metaData)
                setInitial(false)
            }
        }).catch((e) => {
            console.log(e)
        })
    }, [inital])

    const saveData = async (data: any) => {
        await Storage.set({
            key: 'metaData',
            value: JSON.stringify(data)
        })
    }
    const setChildMetaData = (val: AppMetaData) => {
       val.changeData = !val.changeData
        setAppMetaData(val)
        const json = appMetaData.toJson()
        saveData(json).then().catch()
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab1"
                               component={() => (<MainScreen metaData={appMetaData} setMetaData={setChildMetaData}/>)}
                               exact={true}/>
                        <Route path="/tab2" component={() => (<HistoryTab metaData={appMetaData}/>)} exact={true}/>
                        <Route path="/tab3" component={Tab3}/>
                        <Route path="/" render={() => <Redirect to="/tab1"/>} exact={true}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={time}/>
                            <IonLabel>Teeth Brushing</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={ellipse}/>
                            <IonLabel>Tracking</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
