import admins from "./Contacts/index.js"
import fs from 'fs/promises'


const FileWork = async () => {
    const filepath = './files/text1.txt'



const result = await fs.unlink(filepath)
console.log(result)

    const data = await fs.readFile(filepath, 'utf-8')
    console.log(data)
}

FileWork()
