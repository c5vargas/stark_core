import moment from 'moment'
import 'moment/dist/locale/es'; //TODO Apply Locale
moment.locale('es')

export const dateFormatted = (value) => {
    return moment(value).format('DD/MM/Y');
}

export const getToday = () => {
    return moment().format('Y-MM-DD');
}

export const dateTimeFormatted = (value) => {
    return moment(value).format('DD/MM/Y H:mm');
}

export const getLastConexion = (value) => {
    let now = moment(new Date())
    let conexion = moment(new Date(value))
    let duration = moment.duration(now.diff(conexion)).asMinutes()

    return duration > 10 ? conexion.fromNow() : 'Online'
}

export const formatIsoDate = (value) => {
    return moment.unix(value).format('DD/MM/Y H:mm');
}
