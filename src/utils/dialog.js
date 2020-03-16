import Vue from 'vue'
import { ToastPlugin, ConfirmPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

export const showErrorMsg = (text, handelHide = () => { }) => {
    Vue.$vux.toast.show({
        text: text,
        width: '12em',
        type: 'cancel',
        onHide() {
            handelHide()
        }
    })
}

export const showSuccessMsg = (text, handelHide = () => { }) => {
    Vue.$vux.toast.show({
        text: text,
        type: 'success',
        time: 2000,
        onHide() {
            handelHide()
        }
    })
}

export const showMsg = (text, handelHide = () => { }) => {
    let time = 1000
    if (handelHide !== null && handelHide !== undefined) time = 2000
    Vue.$vux.toast.show({
        text: text,
        type: 'text',
        time: time,
        width: '12em',
        onHide() {
            handelHide()
        }
    })
}

export const showConfirmMsgWithTitle = (title, text, handelConfirm, handelCancel, confirmText = '确定', cancelText = '取消') => {
    Vue.$vux.confirm.show({
        title: title,
        content: text,
        onCancel() {
            handelCancel()
        },
        onConfirm() {
            handelConfirm()
        },
        confirmText: confirmText,
        cancelText: cancelText
    })
}

export const showConfirmMsg = (text, handelConfirm, handelCancel, confirmText = '确定', cancelText = '取消') => {
    Vue.$vux.confirm.show({
        content: text,
        onCancel() {
            handelCancel()
        },
        onConfirm() {
            handelConfirm()
        },
        confirmText: confirmText,
        cancelText: cancelText
    })
}

export const showConfirmInput = (text, handelConfirm, handelConsole) => {
    Vue.$vux.confirm.show({
        content: text,
        onCancel() {
            handelConsole()
        },
        onConfirm() {
            handelConfirm()
        }
    })
}
