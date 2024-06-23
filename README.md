This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Project Summary

The purpose of this project was to replicate the functionality found in several online shops, allowing users to customize their own shoes in a 3D model.

### Libraries Used:

- React: The core library used for building the user interface.
- Three.js: The foundational 3D graphics library for JavaScript.
- @react-three/fiber: A React renderer for Three.js, facilitating the creation of 3D graphics with a React-like API.
- @react-three/drei: A collection of useful helpers and abstractions for react-three-fiber.
- Tailwind CSS: Utilized for styling the UI components (Note: Tailwind classes must be explicitly set up to take effect).

### Project notes:

- Dynamic Model Loading: The application can load any GLTF or GLB file uploaded by the user.
- Color Customization: Each mesh in the loaded 3D model has its own color picker, allowing for granular customization.
- Real-time Updates: Color changes are applied to the 3D model in real-time.
- Unique Identifiers: Each mesh is identified by its name or UUID, avoiding conflicts in models with similarly named parts.
- Initial Color Preservation: The original colors of the model are captured and used as initial values for the color pickers.
- Responsive Design: The UI is designed to be responsive, with a scrollable color picker area for models with many parts.
- Model Animation: A simple animation is applied to the model to rotate it slightly, enhancing the visual experience.

### Potential Future Improvements:

- Texture Customization: Add the ability to change textures in addition to colors.
- Export Functionality: Enable users to export their customized models.
- Undo/Redo Functionality: Implement a history system for color changes.
- More Advanced Animations: Add options for different model animations or poses.
- Multiple Model Support: Allow loading and customization of multiple models simultaneously.
- Performance Optimizations: Implement level-of-detail (LOD) for complex models to improve performance.
