import React, {useEffect, useState} from 'react';
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
import {v4 as uuidv4} from 'uuid';
import {AppMetaData} from "../../models/AppMetaData";


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
    metaData: AppMetaData
}

const HistoryTab: React.FC<HistoryProps> = (props) => {

    const [mappedArray, setMappedArray] = useState([])

    useEffect(() => {
        const info: any = Object.values(props.metaData.dailyHistoryMap).map((val: any) => {
            return (
                <IonItem key={uuidv4()}>
                    <IonLabel>{val.date}</IonLabel>
                    {getCowImage(val.day)}
                    {getCowImage(val.night)}
                </IonItem>
            )
        })
        setMappedArray(info)

    }, [props.metaData.changeData])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tracking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {mappedArray}
                </IonList>
            </IonContent>

        </IonPage>
    )
};

export default HistoryTab;
