import {AsyncStorage} from "react-native";
import {Notifications, Permissions} from 'expo'

export const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Do a quiz!',
        body: "Don't forget to do a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            // noinspection JSIgnoredPromiseFromCall
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            // tomorrow.setDate(tomorrow.getDate() + 1);
                            // tomorrow.setHours(20);
                            // tomorrow.setMinutes(0);
                            tomorrow.setHours(18);
                            tomorrow.setMinutes(48);
                            // noinspection JSIgnoredPromiseFromCall
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            // noinspection JSIgnoredPromiseFromCall
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}