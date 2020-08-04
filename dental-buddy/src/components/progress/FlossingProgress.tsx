import React, {useEffect, useState} from 'react';
import './Progress.css'

import {IonAvatar, IonItem, IonLabel} from '@ionic/react';

interface ProgressProps {
    stageFlow: number
    reset: boolean
    stageComplete: boolean
}

const FlossingProgress: React.FC<ProgressProps> = (props) => {

    const [avatar, setAvatar] = useState(<img src={require('../../pics/non-complete.gif')}/>)
    const [status, setStatus] = useState('TODO')

    useEffect(() => {
            //hard reset
            if (props.reset) {
                setAvatar(<img src={require('../../pics/non-complete.gif')}/>)
                setStatus('TODO')

            }

            const actual = props.stageFlow - 1
            if (actual === 2 && props.stageComplete) {
                setAvatar(<img src={require('../../pics/complete.png')}/>)
                setStatus('COMPLETE')

            }
        }, [props.stageFlow, props.stageComplete, props.reset]
    )

    return (
        <IonItem>
            <IonAvatar slot="start" className={'not-complete'}>
                {avatar}
            </IonAvatar>
            <IonLabel>Flossed: {status}</IonLabel>
        </IonItem>

    );
};

export default FlossingProgress;
