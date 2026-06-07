export const ZONA_HORARIA_NEGOCIO = 'America/Santiago';

function obtenerPartesEnZona(fecha, opciones) {
    return Object.fromEntries(
        new Intl.DateTimeFormat('en-CA', {
            timeZone: ZONA_HORARIA_NEGOCIO,
            ...opciones
        })
            .formatToParts(fecha)
            .filter(({type}) => type !== 'literal')
            .map(({type, value}) => [type, value])
    );
}

export function obtenerFechaHoraNegocio(fecha = new Date()) {
    const partes = obtenerPartesEnZona(fecha, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    return `${partes.year}-${partes.month}-${partes.day} ${partes.hour}:${partes.minute}:${partes.second}`;
}

export function formatearFechaCalendario(valor, opciones = {}) {
    const coincidencia = String(valor ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!coincidencia) return String(valor ?? '');

    const [, anio, mes, dia] = coincidencia;
    const fecha = new Date(Date.UTC(Number(anio), Number(mes) - 1, Number(dia)));

    return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
        ...opciones
    }).format(fecha);
}
