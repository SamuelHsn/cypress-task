# UseCypress

Azure Devops Task to dowload cypress binary and set CYPRESS CACHE FOLDER variable

# Run in local

Run the commands:

`npm install`

`npm run build`

`node dist/index.js`

To set variable you have to set them as environment variable :

- powershell :

  ```PowerShell
  $env:INPUT_VERSION="13.6.4"
  $env:INPUT_PLATFORM="win32"
  $env:AGENT_TEMPDIRECTORY="temp"
  node dist/index.js


  ```

- bash :

```bash
  export INPUT_VERSION="13.6.4"
  export INPUT_PLATFORM="win32"
  export AGENT_TEMPDIRECTORY="temp"
  node dist/idnex.js
```

# Run tests

```Shell
npm run test
```
