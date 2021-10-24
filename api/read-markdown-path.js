const solvePath = require("./resolve-path"); //Módulo que exporta un objeto con funciones para operar rutas 
const fileHound = require("filehound"); //librería publica que exporta funciones avanzadas, sincronas como asínconas, para explorar el sistema de archivos

/**La función readDirectory realiza una busqueda profunda o recursiva en el directorio de una ruta entregada
 * hasta dar con archivos .md, emplea métodos propios de la libreria filehound
 */
const readDirectory = ruta => {
    
        const mdFiles = fileHound.create()//se crea una nueva instacia de función recursiva con file hound, que guardaŕa los resultados de la busqueda en una arrar (mdFiles)
            .paths(ruta)//se le indica dónde realizará la busqueda
            .ext('md')//se expecifica qué tipo de archivos buscará
            .findSync();//se especifica la naturaleza de la busqueda (en este caso, es una busqueda síncrona)

    return mdFiles.length === 0 ?
    console.log(`No existen archivos .md en la ruta: ${ruta}`) : mdFiles.concat(mdFiles.length)
//si la longitud del array mdFiles es o (o sea, si no existen archivos .md en la ruta) se retorna un mensaje en consola
//de otra forma, se retorna un array con todos los hallazgos de la busqueda, junto a la ruta especifica en la que se encontraron y la cantidad de archivos presentes
}

//La función readFile, tiene como unico proposito asegurarse de que la ruta que recibe como parametro, sea realmente un archivo .md
//Para eso, usa un método del objeto solvePath, llamado fileExtension, que es una función que extrae la extensión de un archivo
//Al asegurarse de que la ruta lleva a un archivo .md, guarda esa ruta en un array mdFile y lo retorna. De no ser un archivo .md, retorna un array vacio.
const readFile = ruta => {
    const mdFile = [];
    //const notMdFile = 'La ruta no lleva a un archivo .md'; 

         if (solvePath(ruta)['fileExtension'] === '.md') 
             mdFile.push(ruta) 

    return mdFile
//Recibe string de ruta y retorna un array de strings con la ruta
}


//La función readPath, hace uso de las instancias del objeto solvePath, isFile e isDirectory, para evaluar hacia dónde dirige la ruta recibida y entonces ejecutar la función readFile o readDirectory, de acuerdo al caso. 
//Dependiendo del resultado, retorna un array de ruta singular o un array de varias rutas. En el ultimo caso, notifica en un mensaje que la ruta ingresada no es valida.
 //Esta función se exporta al final de este archivo.
const readPath = ruta => {
   
    if (solvePath(ruta)['isFile']) 
        return readFile(ruta)

    else if (solvePath(ruta)['isDirectory'])
        return readDirectory(ruta)

    else 
       return console.log(`la ruta ${ruta} no es válida`)

}


// console.log('*Qué hay en la ruta?*', readPath('/home/mairis/Documentos/BOG003-md-links/prueba'))
// Ejemplo de uso

module.exports = readPath;