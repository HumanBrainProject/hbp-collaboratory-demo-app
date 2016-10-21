# HBP Collaboratory demo app
The following example is a very simple web application that iteracts with some of the Collaboratory APIs. The goal is to show how to integrate it into the Collaboratory as an app.
Consider it as the Hello World of a Collaboratory app.

## Requirements
* python (to run a HTTPS server locally)

## Project Structure
| File | Description |
| ---- | ----------- |
| index.html | The main HTML page |
| app.js | The application code |
| lib/hello.js | JavaScript SDK for authenticating with OAuth2 |
| lib/hbp.hello.js | hello.js module to authenticate with your HBP account [Read more](https://github.com/HumanBrainProject/hbp.hello.js)|
| lib/jquery.js | The popular javascript framework |
| lib/hbp-collaboratory-theme.css | The Collaboratory CSS theme. This theme is based on Twitter Bootstrap. Using it ensures a consistent look and feel with the Collaboratory. [Read more](https://github.com/HumanBrainProject/hbp-collaboratory-theme) |
| fonts/ | Contains fonts required by the theme stylesheet | 
| runserver | A Python script to run a local https server |

## Description
This app doesn't do much: it authenticates the user and uses the HBP REST apis to fetch the user profile info and info about the collab where it is running.

## How to run it
To make this example work as a Collaboratory application, you need to:

### Create an Oauth2 client
Go to the [OpenID Connect Client Manager](
https://collab.humanbrainproject.eu/#/collab/54/nav/1051) and register a new client as follows:
* Application type: `Implicit flow`
* Redirect URL: `https://localhost:4443`
* Scopes: check `hbp.collab`

### modify the code to use your client ID
in app.js, look for the string YOUR_CLIENT_ID and replace it by the the one generated in the previous step.

### make the application accessible through HTTPS
For testing purpose ONLY, you can run a local https server as follows:

`$ . ./runserver`

During the first launch, it will generate a local https certificate. Before going to the next step, ensure your computer trust your self-signed certificate; otherwise the webpage will not be display.

Your page will be available at the URL: [https://localhost:4443/](https://localhost:4443/)

### Register the application in the Collaboratory
To make your application accessible in the Collaboratory, you need to be able to add it to a Collab navigation. To do so, it is necessary to register your application using the Apps Manager page in the How to develop apps Collab.

* Click the _Register App_ button
* Enter your application _title_ and _description_
* Enter the _main URL_ for your application, which is the URL obtained in the previous step
* Use `Prototype` as _category_
* Ensure the _visibility_ of the app is private because you don’t want everybody to use your example application.
* Hit the _save_ button.

### Create a new Navigation Item using this application¶
You can now navigate to one of your collab and create a new instance of your application. When you access your application instance for the first time, you should see the authorization page. Once approved, a page with a single button will be displayed. Once the user hits the button, the collab title, description and the raw result of the query should be displayed as well.

## What’s Next
You did the quick tour, now is the time to start developing your own application using your preferred web stack.
Here you can find more documentation here:
https://collab.humanbrainproject.eu/#/collab/54
