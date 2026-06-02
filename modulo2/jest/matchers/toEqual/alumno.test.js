const {createAlumno, crearAlumno} = require('./alumno');
describe('toEqual Igualdad profunda', ()=>{
    test('Happy path: objetos con toEqual',()=>{
        expect(crearAlumno('Juan', 20, ['Matemáticas', 'Historia'])).toEqual({
            nombre: 'Juan',
            edad: 20,
            cursos: ['Matemáticas', 'Historia']
        });
    })
    test('Sad path: objetos con diferente estructura',()=>{
        expect(crearAlumno('Juan', 20, ['Matemáticas', 'Historia'])).not.toEqual({
            nombre: 'Juan'
