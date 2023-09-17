import * as bcrypt from 'bcrypt'

const saltRounds = 10;

export async function hash(password) {
    return await bcrypt.hash(password, saltRounds)
}

export async function compare(password, hash) {
    return await bcrypt.compare(password, hash)
}
