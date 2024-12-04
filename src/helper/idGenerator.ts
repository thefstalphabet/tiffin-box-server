import { v4 as uuidv4 } from 'uuid';

export function idGenerator(type: "USE" | "KIT" | "DIS" | "ADD"){
    const uuid = uuidv4()
    return `${type}-${uuid}`
}