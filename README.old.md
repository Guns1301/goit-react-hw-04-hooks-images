# goit-react-hw-04-hooks-phonebook

1. npx create-react-app .
2. npm install --save-dev prettier eslint
3. npx mrm@2 lint-staged
4. edit packege.json

<!-- "lint-staged": {
   "*.{js,jsx}": "eslint --cache --fix",
   "*.{js,jsx,css,scss,md}": "prettier --write"
   } -->

5. npm install --save prop-types

6. @import-normalize; - в файл index.css

7. deploy on GH-Pages
   7.1 npm run build
   7.2 "homepage": "https://Guns1301.github.io/goit-react-hw-03-phonebook",
   7.3 npm run build
   7.4 npm install --save gh-pages
   7.5 add scripts :
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build",
   7.6 npm run deploy

   Published

8. npm i axios
9. npm i react-loader-spinner
