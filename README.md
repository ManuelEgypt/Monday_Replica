This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Features

- [x] Drag tasks from one group to desired position of another group
- [x] Drag to reorder tasks in the same group
- [x] Drag to reorder groups
- [x] Collapsible Groups
- [x] Add new task
- [x] Remove existing task
- [x] Edit Task content
- [x] Add Task owner
- [x] Edit Task owner
- [ ] Add Task status
- [ ] Edit Task status
- [ ] Add Task dueDate
- [ ] Edit Task dueDate
- [ ] Add Task priority
- [ ] Edit Task priority
- [x] Change color of group
- [x] Edit Group Title
- [x] Add new Group
- [x] Remove Existing Group

### UI/UX Features

- [x] decreased opacity when dragging tasks
- [x] border appears same color as group color when dragging tasks
- [x] Task label color changes when dragging to another group
- [x] Group background becomes grey when dragged on
- [x] Group Grey background when collapsed
- [x] Group margin decreases while collapsed
- [x] new task input opens when selected
- [x] close button appears when task input opens
- [x] add button replaces close button when starting typing to add task input
- [x] press enter to add task after typing
- [x] nothing happens when pressing enter if add new task input is empty
- [x] press escape to clear typed text in add task input
- [x] press outside add task text input to close and clear content
- [x] group color selection box and collapse button appears when hovering over header
- [x] delete button appears when hovering over group title
- [x] edit border appears when hovering over group title
- [x] pressing on group title enables editing
- [x] pressing outside group title modifies title and exits editing
- [x] pressing enter modifies title and exits editing
- [x] pressing escape discards any changes and exits editing
- [x] Task content turns blue and edit button appears when hovering over
- [x] edit button background turns grey and edit border appears when hovering over edit button
- [x] Pressing on edit button enables task editing
- [x] Pressing outside task content modifies task content and exits edit mode
- [ ] pressing enter modifies task content and exits editing
- [ ] pressing escape discards any changes and exits editing
- [x] pressing color selection box opens color selection modal
- [x] selecting color closes color selection modal
- [x] pressing outside color selection modal closes modal
- [x] pressing enter when group title imput is empty doenst create group
- [x] pressing escape discards text in group input
- [x] creating new group assigns random color to it
- [x] pressing arrange groups collapses all and only enables group dragging
- [x] pressing anywhere on screen exits arrange mode and expands groups to its original position
- [x] after dragging groups exits arrange mode and expands groups to its original position
- [x] 3D buttons
