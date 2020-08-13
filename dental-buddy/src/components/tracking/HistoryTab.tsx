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
                        <IonLabel>Monday</IonLabel>
                        <IonAvatar slot="end" className={'not-complete'}>

                        </IonAvatar>
                        <IonAvatar slot="end" className={'not-complete'}>

                        </IonAvatar>
                    </IonItem>
                </IonList>
            </IonContent>

        </IonPage>
    )
};

export default HistoryTab;
