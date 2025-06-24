import { exec } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';

const watchDirs = [
  './assets/icons',
  './assets/images',
  './assets/backgrounds',
  './assets/banners',
];

// Absolute path to your generator script
const generatorScript = path.resolve('./generateAssets.ts');

function runGenerator() {
  console.log('🌀 Change detected. Regenerating asset index...');
  exec(`npx tsx ${generatorScript}`, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error running asset generator:', error);
    } else {
      console.log(stdout);
      if (stderr) console.error(stderr);
    }
  });
}

const watcher = chokidar.watch(watchDirs, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles like .DS_Store
  persistent: true,
});

watcher
  .on('add', runGenerator)
  .on('unlink', runGenerator)
  .on('change', runGenerator);

console.log('👀 Watching asset folders for changes...');
