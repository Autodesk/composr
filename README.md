![ADAppRater-iOS](docs/assets/Composr_banner.png)

Composr is a flexible platform for creating realtime sound reactive visualizations. Composr is meant to work completely in the browser, rendering over WebGL using [THREE.js](http://threejs.org/).

See it live at [https://www.composr.xyz/](https://www.composr.xyz/)

## Get started
To run the dev local server, on the command line, run:
```shell
$ npm install
$ npm run dev
```

Then point your browser to http://localhost:8080

## Project Structure

There are three main components to the project:

### Graphics and Visualization

Contains classes for Geometry, Materials (Shaders) and Geometry Deformers. 
These are contained in the appropriate folders. When creating a new type, it should inherit from ComposeObject (or more specifically, from one of the abstract types in js/scene). Look for their documentation to learn more about their logic and life cycle. 

Objects should be registered, so that the system can know about their constructor using ComposeObject.registerObject

VisController is the main controller for visualization. It contains the THREE.js scene, and updates all the scene components every frame.

ComposeLayer contains a layer logic, and data about Deformers and ComposeMesh (that contains material and geometry).

### UI Components
UI is rendered using [React.js](https://facebook.github.io/react/). All components used in this project are under /app/components, or imported from React Material.
ComposeObjects also contain custom UI for their components. Every implementation of ComposeObject can contain a renderUI function that can be overridden and should return a JSX object. 

This component will be rendered using a generic react component that looks for that function under app/components/common/composeElement.js

UI components that display data of objects are connected to the redux store, and update accordingly. 

### Redux store and state consistency
The state for the visualization is saved consistently in a [Redux store](https://github.com/reactjs/redux) instance.
Any object that inherits from ComposeObject will automatically add itself to the scene part of the store, under the type returned by ComposeObject.type

In addition, real-time data (from the microphone) is passed through the dataSource reducer.

#### StoreAPI

Most store functions are accessed trough this storeAPI. You can retrieve and update store data through this interface.



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
