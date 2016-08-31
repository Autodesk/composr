![ADAppRater-iOS](docs/assets/Composr_banner.png)

Composr is a felxible platform for creating realtime sound reactive visualizations. Composr is meant to work completely on the broswer, rendering over WebGL using [THREE.js](http://threejs.org/).


## Get started
To run the dev local server, on the command line, run:
```shell
$ npm install
$ npm run dev
```

Then point your browser to http://localhost:8080

## Project Structure

There are three main componenets to the project:

### Graphics and Visualization

Contains classes for Geometry, Materials (Shaders) and Geometry Deformers. 
These are contained in the appropriate folders. When creating a new type, it should inherit from ComposeObject (or more specific,
from one of the abstract types in js/scene). Look for their documentation to learn more about their logic an life cycle. 

Objects should be registered, so that the system can know about their constructor using ComposeObject.registerObject

VisController is the main controller for visualization. It contains the THREE.js scene, and updates all the scene componenets every frame.

ComposeLayer contains a layer logic, and data about Deformers and ComposeMesh (that contains material and geometry).

### UI Componenets
UI is rendered using [React.js](https://facebook.github.io/react/). All components used in this project are under /app/components, or imported from React Material.
ComposeObjects also contain custom UI for their components. Every implementation of ComposeObject can contain a renderUI function that can be
overridden and should return a JSX object. 

This component will be rendered using a generic react component that looks for that function under app/components/common/composeElement.js

UI componenets that display data of objects are connected to the redux store, and updates accordingly. 

### Redux store and state consistency
The state for the visualization is save consistently in an instance of [Redux store](https://github.com/reactjs/redux).
Any object that inherits from ComposeObject will automatically add itself to the scene part of the store, under the type returned by ComposeObject.type

In addition, real-time data (from the microphone) is passed through the dataSource reducer.

#### StoreAPI

Most store functions are accessed trough this storeAPI. You can retrieve and update store data through this interface.



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
