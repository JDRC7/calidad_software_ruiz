const { estadoTemperatura } = require('./estadoTemperatura');

describe('estadoTemperatura', () => {
    test('Happy path: 35 => CALOR', () => {
        expect(estadoTemperatura(35)).toBe('CALOR');
    });

    test('Happy path: 20 => TEMPLADO', () => {
        expect(estadoTemperatura(20)).toBe('TEMPLADO');
    });

    test('Happy path: 10 => FRIO', () => {
        expect(estadoTemperatura(10)).toBe('FRIO');
    });

    test('Sad path: temperatura fuera de rango o tipo inválido', () => {
        expect(() => estadoTemperatura(-51)).toThrow('La temperatura debe ser un número válido entre -50 y 60');
        expect(() => estadoTemperatura(61)).toThrow('La temperatura debe ser un número válido entre -50 y 60');
        expect(() => estadoTemperatura('temperatura')).toThrow('La temperatura debe ser un número válido entre -50 y 60');
    });
});