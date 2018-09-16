# README

This is a simple file generator for React/React-Native.

Inspired by [Angular](https://angular.io/).

# Installation

```
git clone https://github.com/yikkok-yong/fiesta.git
cd fiesta
npm install && npm start
```

# Usage

## Generate Component

```
generate component my-feature
generate component feature/my-feature

generate test login
```

## Overwrite default path

| Parts      | Path            |
| ---------- | --------------- |
| Components | `src/component` |
| Tests      | `e2e`           |

overwrite by providing opt to package.json

```
"fiesta": {
    "components": "path/to/components/directory",
    "tests": {
        rootDir: "path/to/test/directory",
        testFilePattern: default is "*.spec.js", you may overwrite the value here
    }
}
```

Generated file can be found in `src/component`

[License](LICENSE)
