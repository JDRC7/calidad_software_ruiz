const { sumarTresArreglos } = require('./identidad'); 

describe('toBe Igualdad estricta', ()=>{
    test('Happy path: primitivos con toBe',()=>{
        expect(suma(5,2)).toBe(5);
        expect(identidad('jest')).toBe('jest');
    })
    test('Happy path: misma referencia de objeto',()=>{
        const obj = { x: 1 };
        const mismaReferencia = obj;
        expect(identidad(mismaReferencia)).toBe(obj);

    })
    test('Sad path 2 => objeto clonado Noes la misma referencia',()=>{
        const obj = { x: 1 };
        const clon = identidad(obj, { clone: true });
        expect(clon).toEqual(obj); 
        expect(clon).not.toBe(obj); 
    })
    test('Sad path : suma con valores no numericos',()=>{
        expect(() => suma('5', 2)).toThrow('a y b deben ser numericos');
    })
})