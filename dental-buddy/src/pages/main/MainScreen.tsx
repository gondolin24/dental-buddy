import React, {useEffect, useState} from 'react';
import './MainScreen.css';


import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem, IonLabel,
    IonList,
    IonPage,
    IonPopover,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import Countdown, {zeroPad} from "react-countdown";
import {getNumberOfSeconds} from "../../utils/Time-Utils";
import {Stages} from "../../enum/Stages";
import LottiePlayer from "../../components/lottie/LottiePlayer";
import {getBrushingTeeth, getCleanTeeth} from "../../services/LottieService";
import FlossingProgress from "../../components/progress/FlossingProgress";
import MouthWashProgress from "../../components/progress/MouthWashProgress";
import BrushingProgress from "../../components/progress/BrushingProgress";

function getTimer(stage: number) {

    switch (stage) {
        case 1:
            return 2
        case 2:
            return 3
        default:
            return 2
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

const MainScreen: React.FC = () => {

    const [startTimer, setStartTimer] = useState(false)
    const [brushTimer, setBrushTimer] = useState(Date.now())
    const [buttonLabel, setButtonLabel] = useState('Start Brushing Teeth')
    const [flowStage, setFlowStage] = useState(1)
    const [stageComplete, setStageComplete] = useState(false)
    const [showPopover, setShowPopover] = useState(false);
    const [reset, setReset] = useState(true);


    useEffect(() => {
        if (startTimer) {
            setButtonLabel('Restart')
            setBrushTimer(Date.now() + getNumberOfSeconds(getTimer(flowStage)))
        }
        if (reset) {
            setFlowStage(1)

        }
    }, [flowStage, reset])

    // @ts-ignore
    const renderer = ({minutes, seconds}) => {
        return (
            <span>
    <IonTitle>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </IonTitle>
   </span>
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {
                        startTimer &&
                        <Countdown
                            date={brushTimer}
                            precision={3}
                            autoStart={startTimer}
                            onComplete={() => {
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
                </IonToolbar>
            </IonHeader>
            <IonContent scrollX={false} scrollY={false}>
                <IonButton expand="full" shape="round" fill="outline" onClick={() => {
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
