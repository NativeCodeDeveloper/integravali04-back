import test from 'node:test';
import assert from 'node:assert/strict';
import { formatearFechaCalendario, obtenerFechaHoraNegocio } from '../utils/fechaHora.js';

test('convierte un instante UTC a horario de verano de Santiago', () => {
    assert.equal(
        obtenerFechaHoraNegocio(new Date('2026-01-15T15:30:00.000Z')),
        '2026-01-15 12:30:00'
    );
});

test('convierte un instante UTC a horario de invierno de Santiago', () => {
    assert.equal(
        obtenerFechaHoraNegocio(new Date('2026-06-07T15:30:00.000Z')),
        '2026-06-07 11:30:00'
    );
});

test('mantiene una fecha calendario independiente de la zona del servidor', () => {
    assert.match(formatearFechaCalendario('2026-06-07', {weekday: 'long'}), /domingo,? 7 de junio de 2026/i);
});
