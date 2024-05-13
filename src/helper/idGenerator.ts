import { v4 as uuidv4 } from 'uuid';

export function idGenerator(type: "USE" | "KIT" | "DIS"){
    const uuid = uuidv4()
    return `${type}-${uuid}`
}