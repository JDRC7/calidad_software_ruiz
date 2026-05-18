const { puedeConducir } = require("./puedeConducir");

describe("puedeConducir", () => {

    test('Happy path: 18 años puede conducir', () => {
        expect(puedeConducir(18)).toBe('SI');
    });

    test('Happy path: 17 años no puede conducir', () => {
        expect(puedeConducir(17)).toBe('NO');
    });

    test('Sad path: edad debe ser un número entero positivo', () => {
        expect(() => puedeConducir(3.5)).toThrow('edad debe ser un número entero positivo');
        expect(() => puedeConducir('20')).toThrow('edad debe ser un número entero positivo');
        expect(() => puedeConducir(-5)).toThrow('edad debe ser un número entero positivo');
    });
});