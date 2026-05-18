const{evaluarNota} = require('./evaluarNotas');

describe('evaluarNota', () =>  {

    test('Happy path: 8 => Aprobado', () => {
        expect(evaluarNota(8)).toBe('APROBADO');
    });

    test('Happy path: 5 => Supletorio', () => {
        expect(evaluarNota(5)).toBe('SUPLETORIO');
    });

    test('Happy path: 2 => Reprobado', () => {
        expect(evaluarNota(2)).toBe('REPROBADO');
    });

    test('Sad path: nota fuera de rango o tipo inválido', () => {
        expect(() => evaluarNota(-1)).toThrow('La nota debe ser un número válido entre 0 y 10');
        expect(() => evaluarNota(11)).toThrow('La nota debe ser un número válido entre 0 y 10');
        expect(() => evaluarNota('nota')).toThrow('La nota debe ser un número válido entre 0 y 10');
    });
});