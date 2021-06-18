# Mean App

A Mean App ie MongoDB Express Angular NodeJS : a full js stack for a backend and frontend app using mongodb

### Stack

- [ ] **MongoDB**
- [ ] **ExpressJS**
- [ ] **Angular**
- [ ] **Node**
- [ ] **Angulat Material**
- [ ] **Angular Layout**
- [ ] **Bootstrap**

# Developement Environment

The App contains already the dependencies config. We just need to install them.

1. Clone this repository
2. Install Angular node_modules dependencies :

```sh
$ cd mean-app/client
$ npm install
```

3. Install ExpressJs node_modules dependencies :

```sh
$ cd mean-app/server
$ npm install
```

4. Run the client with **`ng build --watch`** to build the Angular client continuously and creates the public static files in the folder public that will be used par the server to distributes the app.
5. Run the server with **`npm start`**

## Use of a proxy

We use a proxy to redirect the Angular server entries **http://localhost:4200** to the real Server with ExpressJs into the port **http://localhost:3000**. For that, just create a proxy conf file and configure the **`package.json`** named **`proxy.conf.json`** :

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

And then modify the line **`"start": "ng serve",`** in the **`package.json`** as this **`"start": "ng serve --proxy-config proxy.conf.json",`**. After that we should use **`npm start`** to start the Angular Server instead of using **`ng serve`**. This will allow the proxy to work.

### Config Sexier import

Modify the **`tsconfig.json`** as follow :

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@mean-app/*": ["src/app/*"],
      "@mean-app-env/*": ["src/environments/*"]
    }
  }
}
```

## Installing Material and Flex-layout

```
$ npm i -s @angular/flex-layout
$ npm i -s @angular/animations @angular/material @angular/cdk
$ npm i -s @angular/hammerjs
```

Or

```
$ ng add @angular/material
```

The **`ng add`** command will install Angular Material, the Component Dev Kit (CDK), Angular Animations and ask you the following questions to determine which features to include:

1. Choose a prebuilt theme name, or "custom" for a custom theme.
2. Set up global Angular Material typography styles.
3. Set up browser animations for Angular Material.

The ng add command will additionally perform the following configurations:

- Add project dependencies to package.json
- Add the Roboto font to your index.html
- Add the Material Design icon font to your index.html
- Add a few global CSS styles to:
- Remove margins from body
- Set height: 100% on html and body
- Set Roboto as the default application font

## App structure

The app handles the process of **login/signup** and **signin** for the main purpose of **Implemeting Authentication System with JWT: Oauth**. Basically it possesses a **homepage** and a **toolbar** with a routing system.

## JWT : authentication

1. We crypt the password with **bcript** before storing it into the database. So we need to install this packahe for ExpressJS : go to to the folder `/server` and run this command

**`$ npm install bcrypt`**

2. The JSON Web Token (JWT) is the service that will provide the **token** when try to sign in a user. So first, we should provide this package also to ExpressJS :

```sh
$ npm install jsonwebtoken
```

And the we'll provide the **Payload**, the **Secret** and then the **Header**. To provide the **Secret**, we're using the Algorithm **RS256** and we generate a private RSA key to provide this JWT Secret. So, to achieve that we run these command with no **Passphrase** :

```sh
$ ssh-keygen -t rsa -b 4096 -m PEM -f key
$ ssh-keygen -e -m PEM -f key > key.pub
```

We go an output of two file, one is the private key contained into the file **`key`**. We read its content and use it as the Jwt.Secret for encryption.

## NgRx

We use NgRx in the application to improve our app and refactor all the app : to get a better structure and architecture.

## Module Photos

We add a feature that uses **Unsplash** library.

- The internet’s source of freely-usable images.
- Powered by creators everywhere.
- Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.
- To use it, install it with :

```sh
$ npm i unsplash-js
```
