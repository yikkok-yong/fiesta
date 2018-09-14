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
```

## Overwrite default path

Components will go to `src/component` as default, overwrite by providing opt to package.json

```
"fiesta": {
    "components": "your/desired/path"
}
```

Generated file can be found in `src/component`

[License](LICENSE)
