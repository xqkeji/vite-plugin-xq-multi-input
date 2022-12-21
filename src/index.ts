import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';


function xqMultiInput():Plugin{
	let autoInputs:Record<string, unknown>={};
	
	return {
		name: 'xq-multi-input',
		config(config, { command }) {
			// @ts-ignore
			let root:string=path.join(process.cwd(),config.root);
			if (command === 'build') {
			  // @ts-ignore
			  const inputs:any=config.build.rollupOptions.input;
			  for (var key in inputs) {
				const inputFile:string=inputs[key];
				if(inputFile.startsWith(root))
				{
					if(fs.existsSync(inputFile))
					{
						const inputFilename:string=path.basename(inputFile)
						autoInputs[key]=inputFile;
						const inputPath=path.dirname(inputFile);
						const files = fs.readdirSync(inputPath);
						// 循环
						for (let i = 0; i < files.length; i++) {
							const filename = files[i];
							const filePath=path.join(inputPath,filename);
							if(fs.existsSync(inputFile))
							{
								const ext = path.extname(filename);
								if (ext == ".html"&&inputFilename!=filename) {
									const autoKey:string=key+'_'+path.basename(filename,ext);
									autoInputs[autoKey]=filePath;
								}
							}
							
						}
					}
				}
				
			  }
			  // @ts-ignore
			  config.build.rollupOptions.input=autoInputs
			}
		}
	};	
}


export default xqMultiInput;
