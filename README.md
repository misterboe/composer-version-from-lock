# composer-version-from-lock

A Node.js package to get the current version of packages from the composer.lock file and write it into the composer.json file.

## Installation

This package can be installed globally using npm:

```
npm install -g composer-version-from-lock
```

## Usage

Once the package is installed, you can run the following command from the command line in the root directory of your project:

```
composer-version-from-lock
```

This will update the versions of the packages listed in the composer.json file with the latest versions specified in the composer.lock file.

### Note

This package will only update the versions of packages that are already listed in the composer.json file. New packages will not be added.
