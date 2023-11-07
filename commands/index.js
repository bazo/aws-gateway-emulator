import path from 'path';
import {globby} from 'globby';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log({dir: __dirname})

const paths = await globby(['*.js', '!index.js'], {
	cwd: __dirname
});

const modules = []
for(const path of paths) {
	const module = (await import(`${__dirname}/${path}`)).default
	modules.push(module)
}

export default modules
