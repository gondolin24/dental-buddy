import React, {useEffect, useState} from 'react';
import './Progress.css'

import {IonAvatar, IonItem, IonLabel} from '@ionic/react';

interface ProgressProps {
    stageFlow: number
    reset: boolean
    stageComplete: boolean
}

const MouthWashProgress: React.FC<ProgressProps> = (props) => {

    const [avatar, setAvatar] = useState(<img src={require('../../pics/non-complete.gif')}/>)

    useEffect(() => {
        //hard reset
        if (props.reset) {
            setAvatar(<img src={require('../../pics/non-complete.gif')}/>)
        }

            const actual = props.stageFlow - 1
            if (actual === 3 && props.stageComplete) {
                setAvatar(<img src={require('../../pics/complete.png')}/>)
            }
        }, [props.stageFlow, props.stageComplete, props.reset]
    )
    return (
        <IonItem>
            <IonAvatar slot="start" className={'not-complete'}>
                {avatar}
            </IonAvatar>
            <IonLabel>Mouth Wash</IonLabel>
        </IonItem>

    );
};

export default MouthWashProgress;
