/**
 * @file useZip
 */

import { saveAs } from 'file-saver'
import Zip from 'jszip'
import type { JSZipFileOptions } from 'jszip'

export function useZip() {
  const zip = new Zip()

  const count = ref(0)

  function createFolder(name: string) {
    zip.folder(name)
  }

  function createFile(path: string, data: any, options: JSZipFileOptions = {}) {
    zip.file(path, data, options)
    count.value++
  }

  async function download(filename = 'zip.zip') {
    try {
      const blob = await zip.generateAsync({ type: 'blob' })
      saveAs(blob, filename)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    count,
    download,
    createFile,
    createFolder,
  }
}
