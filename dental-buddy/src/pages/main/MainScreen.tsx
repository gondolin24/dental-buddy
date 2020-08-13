import React, {useEffect, useState} from 'react';
import './MainScreen.css';


import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonPopover,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import Countdown, {zeroPad} from "react-countdown";
import {getCurrentDateKey, getNumberOfSeconds} from "../../utils/Time-Utils";
import LottiePlayer from "../../components/lottie/LottiePlayer";
import {getBrushingTeeth, getCleanTeeth} from "../../services/LottieService";
import FlossingProgress from "../../components/progress/FlossingProgress";
import MouthWashProgress from "../../components/progress/MouthWashProgress";
import BrushingProgress from "../../components/progress/BrushingProgress";
import {Vibration} from "@ionic-native/vibration";
import {AppMetaData} from "../../models/AppMetaData";
import {DailyHistory} from "../../models/DailyHistory";

function getTimer(stage: number) {

    switch (stage) {
        case 1:
            return 121
        case 2:
            return 61
        case 3:
            return 31
        default:
            return 121
    }

}

function getProgressLabel(stage: number) {

    switch (stage) {
        case 1:
            return 'Start Brushing Teeth'
        case 2:
            return 'Start Flossing Teeth'
        case 3:
            return 'Start Mouth Wash'
        default:
            return 'Start Brushing Teeth'
    }
}

function getProgressLabelButton(stage: number) {

    switch (stage) {
        case 1:
            return 'Brushing'
        case 2:
            return 'Flossing'
        case 3:
            return 'Start'
        default:
            return 'Brushing'
    }
}


interface MainProps {
    metaData: AppMetaData
    setMetaData: (val: any) => void
}

const MainScreen: React.FC<MainProps> = (props) => {

    const [startTimer, setStartTimer] = useState(false)
    const [brushTimer, setBrushTimer] = useState(Date.now())
    const [buttonLabel, setButtonLabel] = useState('Start Brushing Teeth')
    const [flowStage, setFlowStage] = useState(1)
    const [stageComplete, setStageComplete] = useState(false)
    const [showPopover, setShowPopover] = useState(false);
    const [reset, setReset] = useState(true);
    const [timeOfDay, setTimeOfDay] = useState<string>('morning');

    useEffect(() => {
        if (startTimer) {
            setButtonLabel(`${getProgressLabelButton(flowStage - 1)} In Progress`)
            setBrushTimer(Date.now() + getNumberOfSeconds(getTimer(flowStage - 1)))
        }
        if (reset) {
            setFlowStage(1)
        }
    }, [flowStage, reset])

    // @ts-ignore
    const renderer = ({minutes, seconds}) => {
        return (
            <IonLabel> {zeroPad(minutes)}:{zeroPad(seconds)}</IonLabel>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <IonItem>
                            {
                                startTimer &&

                                <Countdown
                                    date={brushTimer}
                                    precision={3}
                                    autoStart={startTimer}
                                    onComplete={() => {
                                        Vibration.vibrate([2000, 1000, 2000]);
                                        setStartTimer(false)
                                        setStageComplete(true)
                                        setButtonLabel(getProgressLabel(flowStage))
                                        if (flowStage > 3) {
                                            setShowPopover(true)
                                        }
                                    }}
                                    renderer={renderer}
                                />

                            }
                            <IonSelect value={timeOfDay} okText="Okay" slot={'start'} cancelText="Dismiss"
                                       onIonChange={e => setTimeOfDay(e.detail.value)}>
                                <IonSelectOption value="morning">Morning</IonSelectOption>
                                <IonSelectOption value="night">Night</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent scrollX={false} scrollY={false}>
                <IonButton expand="full" shape="round" fill="outline" disabled={startTimer} onClick={() => {
                    setStartTimer(true)
                    setFlowStage(flowStage + 1)
                    setStageComplete(false)
                    setReset(false)
                }}>{buttonLabel}</IonButton>


                <IonList>
                    <BrushingProgress stageComplete={stageComplete} stageFlow={flowStage} reset={reset}/>
                    <FlossingProgress stageComplete={stageComplete} stageFlow={flowStage} reset={reset}/>
                    <MouthWashProgress stageComplete={stageComplete} stageFlow={flowStage} reset={reset}/>
                </IonList>
                <div className={'home-animation'}>
                    <LottiePlayer source={getBrushingTeeth()} animationDefault={true}/>
                </div>

                <IonPopover
                    isOpen={showPopover}
                    onDidDismiss={e => {
                        const time = timeOfDay
                        const dataKey = getCurrentDateKey()
                        const dd = props.metaData
                      console.log(dd)
                        // @ts-ignore
                        const data: DailyHistory = dd.dailyHistoryMap[dataKey]
                        if (time === 'night') {
                            data.night = true
                        } else {
                            data.day = true
                        }
                        // @ts-ignore
                        dd.dailyHistoryMap[dataKey] = data
                        props.setMetaData(dd)
                        setShowPopover(false)
                        setReset(true)
                    }}
                >
                    <div className={'pop-animation'}>
                        <LottiePlayer source={getCleanTeeth()} animationDefault={true}/>
                    </div>

                </IonPopover>

            </IonContent>
        </IonPage>
    );
};

export default MainScreen;
