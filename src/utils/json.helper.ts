import * as fs from 'fs';
import * as path from 'path';

export function readJSON<T>(filePath: string): T {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent) as T;
}