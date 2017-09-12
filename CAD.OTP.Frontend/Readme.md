# CADPerformanceDashboard

### Prerequisites

Node.js >6.0.0

### Running in dev mode

Run CAD.OTP.Frontend project in Debug configuration from VisualStudio.
It should automatically start webpack-dev-server for you.

You can also do it manually:

```sh
$ cd ../CAD.OTP.Frontend/app
$ npm start
```

### Production configuration

Switch to Release build configuration.

Note: You will also need to set **"UseWebpackDevServer"** appSeting to **"false"** if you don't use project publishing.