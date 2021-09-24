const index = require('./index.js');
const fsp = require('fs').promises;
const fs = require('fs');
const modulePath = require('path');

/* Variable route que contiene el argumento pasado en la consola */
const route = process.argv[2];

/* mdLinks contiene todas las funciones del flujo*/
const mdLinks = (path) => {
  routeExists(path).then(() => {
    isAbsolute(path)
  })
    .catch(error => { console.log('error encontrado => ', error) });
}

/* Comprobar si se recibe la ruta y existe*/
const routeExists = (path) => {
  return fsp.stat(path)
}

/* Comprobar si lo que recibe ruta absoluta o relativa */
const isAbsolute = (path) => {
  if (modulePath.isAbsolute(path)) {
    readFile(path); // por ahora está aqui readFile pero en realidad es que si se cumple la condición,
                    // entonces ejecuta la función que comprueba si es directorio o archivo (eso va en mdlinks)
  }
 else {
  console.log(modulePath.isAbsolute(path))}
}

/* Leer el contenido del archivo */
const readFile = (path) => {
  fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
    if (error) {
      console.log('ocurrió un error', error)
    }
    console.log('correcto', data)
  })
}

/*  CREACION DE UNA PROMESA
const promise = new Promise((resolve, reject) => {
   if (path) {
     resolve(path)
   } else {
     reject(new Error('no hay ruta'))
   }
 })
 
return promise
LLAMAR LA PROMESA
.then(path => console.log(path))
.catch(error => console.error(error)); 

// EXTRAER LA RUTA DEL ARCHIVO
  console.log(path.extname(route))*/


mdLinks(route);


// stats.isDirectory()