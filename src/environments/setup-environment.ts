const setupEnvironment = (): void => {
  const fs = require('fs');
  const writeFile = fs.writeFile;

  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';

  // Load node modules
  const colors = require('colors');

  require('dotenv').config({ path: '.env' });

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  mapboxApiKey: '${process?.env?.['MAPBOX_API_KEY']}',
  production: true,
  };
  `;

  writeFile(targetPath, envConfigFile, (err: Error): void => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
};

setupEnvironment();
