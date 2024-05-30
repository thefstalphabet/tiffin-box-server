export function regexGenerator(query: any) {
    const newQuery = {};
    Object.keys(query).forEach((key: string) => (
        newQuery[key] = { $regex: new RegExp(query[key], 'i') }
    ));
    return newQuery
} 