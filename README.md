# Sociit Payments (sociit)

Manage student societies, clubs  memberships, events and tickets

## Create your local environment to develop for this project
### Create Project Skeleton
* ```quasar create sociit```
* ```cd sociit```
* ```npm install```

### Running the Project
* ```quasar dev```

### Build and Deploy to Firebase
* ```quasar build```
* Go to: https://console.firebase.google.com/
* Create new project
* ```firebase login```
* ```firebase init```
* ```firebase deploy --only hosting```
* You should now see your deployed code at the address in ```Firebase Console/Hosting```

### Link to Database
* ```npm install firebase vuefire```
* Login to Firebase Console > Database > Create Database -> Server in Aus or Asia
* Configure Quasar bootfiles to access the DB before the app runs. 
	* Create a bootfile in sociit/src/boot/firebase.js
	* Add comments from this gist to it: https://gist.github.com/Baralabite/6599d853eb3164f5dfae818532faae2b
	* Look at the JS comments for notes on what they do.
	* Open ```quasar.config.js``` in sociit and add ```firebase.js``` to the boot array.
``` boot: [
'firebase.js',
],
```


## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
