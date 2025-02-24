import fs from 'fs';

/** LECTURA */
export async function readDataFromJsonFileAsyncPromise(
    path
){
    try {
        console.log(path)
        const data = await fs.promises.readFile(path,'utf8')
        const dataParsed = JSON.parse(data)
        return dataParsed
    } catch (error) {
        if (error instanceof Error){
            throw new Error(
                `Error al cargar los productos desde el archivo: ${error.message}`
            )
        } else {
            throw error
        }
    }
}

/** ESCRIBIR */
export async function writeDataIntoJsonFileAsyncPromises(
    path,
    data
){
    try {
        const dataJson = JSON.stringify(data,null,2);
        await fs.promises.writeFile(path,dataJson,"utf8")
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(
                `Error al guardar productos en el archivo: ${error.message}`
            );
        } else {
            throw error
        }
    }
}