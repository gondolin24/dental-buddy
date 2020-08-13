import React from 'react';
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {getCurrentDate, getCurrentDateKey} from "../../utils/Time-Utils";
import {v4 as uuidv4} from 'uuid';


function getCowImage(status: boolean) {
    if (status) {
        return (
            <IonAvatar slot="end" className={'complete'}>
                <img src={require('../../pics/complete-cow.png')} alt={'sure'}/></IonAvatar>
        )
    }
    return (
        <IonAvatar slot="end" className={'not-complete'}>
            <img src={require('../../pics/non-complete-cow.png')} alt={'sure'}/>
        </IonAvatar>
    )

}

interface HistoryProps {

}

const HistoryTab: React.FC = () => {
    const kk = getCurrentDateKey()
    const current = getCurrentDate()
    const derpData = {
        kk: {
            date: current,
            night: false,
            day: false
        }
    }

    const info = Object.values(derpData).map((val) => {
        return (
            <IonItem key={uuidv4()}>
                <IonLabel>{val.date}</IonLabel>
                {getCowImage(val.day)}
                {getCowImage(val.night)}
            </IonItem>
        )
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tracking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {info}
                    <IonItem>
                        <IonLabel>{getCurrentDate()}</IonLabel>
                        <IonAvatar slot="end" className={'complete'}>
                            <img src={require('../../pics/complete-cow.png')}/></IonAvatar>
                        <IonAvatar slot="end" className={'not-complete'}>
                            <img src={require('../../pics/non-complete-cow.png')}/>
                        </IonAvatar>
                    </IonItem>
                </IonList>
            </IonContent>

        </IonPage>
    )
};

export default HistoryTab;
