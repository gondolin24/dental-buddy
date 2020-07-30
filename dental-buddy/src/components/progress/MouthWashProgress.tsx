import React from 'react';
import './Progress.css'

import {IonAvatar, IonItem, IonLabel} from '@ionic/react';


const MouthWashProgress: React.FC = () => {

    return (
        <IonItem>
            <IonAvatar slot="start" className={'not-complete'}>
                <img src={require('../../pics/non-complete.gif')}/>
            </IonAvatar>
            <IonLabel>Item Avatar</IonLabel>
        </IonItem>

    );
};

export default MouthWashProgress;
