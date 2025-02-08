/**
 * @file webContainer
 *
 * @see {@link https://webcontainers.io/guides/introduction}
 */

import { WebContainer } from '@webcontainer/api'
import type { FileSystemTree } from '@webcontainer/api'

let webContainerInstance: WebContainer | undefined

const logger = createLogger('webContainer')

export const FILES: FileSystemTree = {
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "example-app",
          "type": "module",
          "dependencies": {
            "express": "latest",
            "nodemon": "latest"
          },
          "scripts": {
            "start": "nodemon index.js"
          }
        }`,
    },
  },
}

interface UseWebContainerOptions {
  files?: FileSystemTree
}

export function useWebContainer(
  iframeRef: Ref<HTMLIFrameElement | null>,
  options: UseWebContainerOptions = {},
) {
  async function installDependencies() {
    // Install dependencies
    const installProcess = await webContainerInstance?.spawn('npm', ['install'])
    installProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data)
        },
      }),
    )
    // Wait for install command to exit
    return installProcess?.exit
  }

  async function startDevServer() {
    // Run `npm run start` to start the Express app
    await webContainerInstance?.spawn('npm', ['run', 'start'])

    // Wait for `server-ready` event
    webContainerInstance?.on('server-ready', (port, url) => {
      if (!iframeRef || !iframeRef.value) return
      iframeRef.value.src = url
    })
  }

  async function ensureInstance() {
    if (webContainerInstance) return
    // Call only once
    webContainerInstance = await WebContainer.boot()
  }

  async function writeFile(filePath: string, fileContent: string) {
    if (!webContainerInstance) return
    logger.info('writeFile: ', filePath, fileContent)
    await webContainerInstance.fs.writeFile(filePath, fileContent)
  }

  async function dispose() {
    logger.info('dispose')
  }

  async function load() {
    await ensureInstance()

    await webContainerInstance?.mount(options.files || FILES)

    const exitCode = await installDependencies()

    if (exitCode !== 0) {
      throw new Error('Installation failed')
    }

    await startDevServer()
  }

  return {
    load,
    dispose,
    writeFile,
    ensureInstance,
    startDevServer,
    installDependencies,
  }
}
