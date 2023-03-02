### Messenger
Messenger is the first project of the PracticumYandex.
Published on netlify.com [here](https://poetic-choux-99c746.netlify.app/).
Published on render.com [here](https://ya-p-messenger.onrender.com/).

### For development
`git clone -b deploy https://github.com/pellexa/middle.messenger.praktikum.yandex.git`

`cd middle.messenger.praktikum.yandex/`

`npm install`

`npm run serve`

http://localhost:8080/

### Linting commands(run in project root):
`npx eslint src/` - ESLint

`npx tsc --noEmit` - Typescript checks all files without transpiling

`npx stylelint "**/*.scss"` - Stylelin

##### Commit changes
Husky (pre-commit) is configured in the .husky/pre-commit file.
To commit the changes, first run:
`npm prepare`, and then `git commit -m ...`

To commit without pre-commit checks, run with `-n`:
`git commit -nm ...`

##### to start express server run (first abort the `npm run dev` command):
`npm run build`

`npm run start`

http://localhost:3000/


##### Run in Docker(run in project root):
`docker build -t messenger_nodejs197 .`

`docker run --rm -d --name running_messenger -p 8081:3000 messenger_nodejs197`

http://localhost:8081/

###### to stop the container, run:
`docker stop running_messenger`


### To run tests(run in project root):
`npm test`

##### Design [here](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&t=hIQYbJRUQXfQOe13-0)

### Pull Request [link](https://github.com/pellexa/middle.messenger.praktikum.yandex/pull/2) for sprint_1
### Pull Request [link](https://github.com/pellexa/middle.messenger.praktikum.yandex/pull/3) for sprint_2
### Pull Request [link](https://github.com/pellexa/middle.messenger.praktikum.yandex/pull/4) for sprint_3
