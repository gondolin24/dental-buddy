import React, {useState} from 'react';
import './MainScreen.css';


import {IonButton, IonContent, IonItem, IonLabel, IonList, IonPage, IonToggle} from '@ionic/react';
import Countdown, {zeroPad} from "react-countdown";
import {getNumberOfSeconds} from "../../utils/Time-Utils";
import {Stages} from "../../enum/Stages";
import LottiePlayer from "../../components/lottie/LottiePlayer";
import {getBrushingTeeth} from "../../services/LottieService";

function getComplete(complete: boolean) {
    return (complete) ? 'Complete' : 'Todo'

}

function getText() {

}

function getNextStage(stage: Stages) {
    if (stage === Stages.WASH) {
        return Stages.BRUSH
    }
    if (stage === Stages.FLOSS) {
        return Stages.WASH
    }
    if (stage === Stages.BRUSH) {
        return Stages.FLOSS
    }
    return Stages.BRUSH
}

function getEmptyProgressData() {
    const data: any = {}
    data[Stages.BRUSH] = false
    data[Stages.WASH] = false
    data[Stages.FLOSS] = false

    return data
}

const MainScreen: React.FC = () => {

    const [startTimer, setStartTimer] = useState(false)
    const [brushTimer, setBrushTimer] = useState(Date.now())
    const [stage, setStage] = useState(Stages.BRUSH)
    const [nextStage, setNextStage] = useState(Stages.FLOSS)
    const [progressData, setProgressData] = useState(getEmptyProgressData)


    // @ts-ignore
    const renderer = ({minutes, seconds}) => {
        return (
            <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
        );
    };


    return (
        <IonPage>
            {/*<IonHeader>*/}
            {/*    <IonToolbar>*/}
            {/*        <IonTitle>Derp</IonTitle>*/}
            {/*    </IonToolbar>*/}
            {/*</IonHeader>*/}
            <IonContent>

                {
                    startTimer &&

                    <Countdown
                        date={brushTimer}
                        precision={3}
                        autoStart={startTimer}
                        onComplete={() => {
                            setStartTimer(false)
                            const newNextStage = getNextStage(nextStage)
                            setStage(nextStage)
                            setNextStage(newNextStage)
                            const pd = progressData
                            pd[stage] = true
                            setProgressData(pd)
                            if (stage === Stages.WASH) {
                                setProgressData(getEmptyProgressData())
                            }
                        }}
                        renderer={renderer}
                    />
                }

                {
                    stage === Stages.BRUSH &&
                    <IonButton expand="full" shape="round" fill="outline"
                               onClick={() => {
                                   setBrushTimer(Date.now() + getNumberOfSeconds(121))
                                   setStartTimer(true)
                               }}
                    >Start brushing teeth</IonButton>
                }

                {
                    stage === Stages.FLOSS &&

                    <IonButton expand="full" shape="round" fill="outline"
                               onClick={() => {
                                   console.log('derp')
                                   setBrushTimer(Date.now() + getNumberOfSeconds(60))
                                   setStartTimer(true)
                               }}
                    >Start flossing teeth</IonButton>
                }

                {
                    stage === Stages.WASH &&

                    <IonButton expand="full" shape="round" fill="outline"
                               onClick={() => {
                                   setBrushTimer(Date.now() + getNumberOfSeconds(31))
                                   setStartTimer(true)
                               }}
                    >Start mouth wash</IonButton>
                }

                <IonList>

                    <IonItem>
                        <IonLabel>Brushed teeth : {getComplete(progressData[Stages.BRUSH])} </IonLabel>
                        <IonToggle slot={"start"} checked={progressData[Stages.BRUSH]}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Flossed : {getComplete(progressData[Stages.FLOSS])} </IonLabel>
                        <IonToggle slot={"start"} checked={progressData[Stages.FLOSS]}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Mouth Wash : {getComplete(progressData[Stages.WASH])} </IonLabel>
                        <IonToggle slot={"start"} checked={progressData[Stages.WASH]}/>
                    </IonItem>

                </IonList>
                <LottiePlayer source={getBrushingTeeth()} animationDefault={true}/>
            </IonContent>
        </IonPage>
    );
};

export default MainScreen;
