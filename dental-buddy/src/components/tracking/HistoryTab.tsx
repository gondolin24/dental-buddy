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
import {getCurrentDate} from "../../utils/Time-Utils";

const HistoryTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tracking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
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
