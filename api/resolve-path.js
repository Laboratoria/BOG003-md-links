const path = require("path");
const fs = require("fs");
/**Los modulos nativos "path" y "fs", mejor descrito como "File System" proporcionan, el primer caso, una API para interactuar con el 
 * sistema de rutas y, en el segundo caso, una API para interactuar con el sistema de archivos de la maquina
 */

//función que evalua si la ruta entregada existe, retorna un valor booleano
const pathExist = ruta => fs.existsSync(ruta)

//función que recibe una ruta relativa para convertirla a absoluta, 
const pathToAbsolute = ruta => path.resolve(ruta);


/* la función "isPathAbsolute" recibe una ruta, pregunta por su naturaleza (relativa o absoluta),
si la ruta es relativa, invoca a la función "pathToAbsolute" y retorna el resultado
si la ruta es absoluta, la retorna sin cambios */
 const isPathAbsolute = ruta => {
    if (!path.isAbsolute(ruta)) {
        return pathToAbsolute(ruta);
    } 
     return ruta;
    
}; 

/*la función isPathDirectory usa dos metodos sincronos de fs: statSync que retorna estadisticas simples sobre la ruta entregada y
isDirectory, que evalua si la ruta entregada hace referencia a un directorio o no. Usar el método statSync es una forma de encadenar el metodo 
isDirectory, pues es la forma en la que este funciona. La función isPathDirectory retorna un valor boolenano*/
const isPathDirectory = ruta => fs.statSync(ruta).isDirectory();


/*la función isPathFile usa dos metodos sincronos de fs: statSync que retorna estadisticas simples sobre la ruta entregada y
isFile, que evalua si la ruta entregada dirige a un archivo o no. Usar el método statSync es una forma de encadenar el metodo 
isFile tal como en la función anterior, pues es la forma en la que este funciona. La función isPathFile retorna un valor boolenano*/
const isPathFile = ruta => fs.statSync(ruta).isFile();

/*la función fileExtension emplea el método extname del modulo path para analizar una ruta entregada, encontrar el archivo en la ruta
y retornar su extensión. Si no existe un archivo en la ruta, retorna un string vacio.*/
const fileExtension = ruta => path.extname(ruta)

/*la función solvePath exportada al final de este archivo, recibe como parametro una ruta y retorna en un objeto el proceso de esa ruta
por medio de las funciones descritas en su interior. El resultado esperado es:
-Un valor boolenano para ruta existente
-una ruta absolute
-un valor booleano para evaluar si se trata de un archivo 
-un valor booleano para evaluar si se trata de un directorio
-la extensión del o los archivos encontrados
*/
const solvePath = ruta => {
    const pathReturn = new Object()

    pathReturn.existPath = pathExist(ruta)
    pathReturn.absolutePath = isPathAbsolute(ruta)
    pathReturn.isFile = isPathFile(ruta)
    pathReturn.isDirectory = isPathDirectory(ruta)
    pathReturn.fileExtension = fileExtension(ruta)

 return pathReturn
} 


module.exports = solvePath;
/* const isPathValid = ruta => {
    return new Promise((resolve, reject) => {
        if (isPathExist(ruta)) {
            resolve (`la ruta ${ruta} existe`)
        } else if (!isPathExist(ruta)) {
            reject(`la ruta ${ruta} no existe`)
        }
    })
} */

/* isPathValid('/markdown/text.md')
.then(message => console.log(message))
.catch(err => console.log(err))
 */

