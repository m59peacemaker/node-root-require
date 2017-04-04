const Module = require('module')
const {
  relative: getRelativePath,
  join: joinPath,
  dirname
} = require('path')
const findRoot = require('find-root')
const hasPrefix = require('root-import-utils/lib/has-prefix')
const stripPrefix = require('root-import-utils/lib/strip-prefix')
const getRelativePathToModule = require('root-import-utils/lib/get-relative-path-to-module')
const originalLoad = Module._load

let prefix = '~'

const rr = {
  setRoot: (root = findRoot()) => {
    Module._load = function (modulePath, parent, ...rest) {
      if (!hasPrefix(prefix, modulePath)) {
        return originalLoad(modulePath, parent, ...rest)
      }
      const sourcePathFromRoot = getRelativePath(root, parent.filename)
      const modulePathFromRoot = stripPrefix(prefix, modulePath)
      const newPath = getRelativePathToModule(sourcePathFromRoot, modulePathFromRoot)
      return originalLoad(newPath, parent, ...rest)
    }
    return rr
  },
  setPrefix: newPrefix => {
    prefix = newPrefix
    return rr
  },
  reset: () => {
    Module._load = originalLoad
    return rr
  }
}

module.exports = rr
