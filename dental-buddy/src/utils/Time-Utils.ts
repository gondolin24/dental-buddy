import moment from 'moment';

export function getNumberOfSeconds(seconds: number = 0) {
    return seconds * 1000
}

export function getCurrentDate() {
    const currentMoment = moment()
    return currentMoment.format('LL')
}

export function getCurrentDateKey() {
    const currentMoment = moment()
    return currentMoment.format('LL').split(' ').join('')
}
