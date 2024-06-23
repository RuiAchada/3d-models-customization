## Goal:

The purpose of this project was to replicate the functionality found in several online shops, allowing users to customize their own shoes in a 3D model.

## How

This interactive 3D product customization feature is implemented using a combination of 3D rendering technologies and web-based interfaces.

- 3D Modeling: The product, in this case, a shoe, is first created as a detailed 3D model using software like Autodesk Maya, Blender, or 3ds Max.
- Texture Mapping: The 3D model is divided into separate parts or "zones" that can be customized. Each zone is assigned a unique texture map.
- Web-based 3D Rendering: The 3D model is integrated into a web application using technologies like WebGL (Web Graphics Library) or libraries built on top of it, such as Three.js or Babylon.js, enabling real-time 3D rendering in web browsers without plugins.
- User Interface: A user-friendly interface is created to allow customers to select different colors or materials for each customizable part of the shoe.
- Real-time Updates: When a user selects a color or material for a specific part, the application updates the corresponding texture map in real-time, instantly showing the changes on the 3D model.
- 360-degree Rotation: The ability to rotate the object is implemented using the 3D engine's camera controls, allowing users to view their customized product from all angles.
- Backend Integration: The customization choices are linked to a backend system that handles inventory, pricing, and order processing.

Necessary components are imported from React and Three.js libraries. The Canvas component from @react-three/fiber is used to create a 3D rendering context, while the OrbitControls component allows users to rotate the view using mouse or touch input. Color picker inputs enable users to change the color of the components in real-time.

A glTF (GL Transmission Format) model, a common format for 3D models on the web, is used. The useGLTF hook from @react-three/drei loads the model. The nodes object contains the geometries of the different parts of the shoe, and materials contains the original materials. Each part of the shoe is rendered as a separate <mesh> component. A simple animation using useFrame rotates the shoe slightly.

### Allowing the user to upload a custom model:

A file input allows users to select a GLTF or GLB file. When a file is selected, a URL is created for it using `URL.createObjectURL()` and stored in the modelUrl state.
- Dynamic Model Loading:
The Model component takes a url prop to load the model dynamically. The `useGLTF(url)` hook loads the model from the provided URL.
- Dynamic Mesh Creation:
Instead of hardcoding mesh components, `Object.entries(nodes)` is iterated over to create a mesh for each node in the model. Each node is checked to ensure it is a mesh before creating a component for it.
- Dynamic Color Management:
The colors state is initially an empty object and populates as parts are colored.
- Dynamic Color Pickers:
Color pickers are generated dynamically based on the colors object, with each color picker corresponding to a part of the model that has been colored.
- Suspense:
The Model component is wrapped in a Suspense component to handle the asynchronous loading of the 3D model.

### Improvements
Conflicts can arise when nodes and materials have the same names or when the model's structure is more complex than currently assumed.

- Model Loading and Traversal:
Instead of relying on nodes and materials, the scene object returned by useGLTF is used. The entire scene hierarchy is traversed using `scene.traverse()`, capturing all meshes regardless of their position.
- Unique Identifiers:
Each mesh uses either its name or UUID as a unique identifier to avoid conflicts when multiple meshes have the same name.
- Color Initialization:
A new `useEffect` hook in the Model component initializes the colors state with the initial colors of the model's meshes.
- Rendering:
The entire scene is rendered using `<primitive object={scene} />`, ensuring all parts of the model are rendered, maintaining their original hierarchy and relationships.
- Color Application:
The color changing logic is handled in a `useEffect` hook. When colors change, the scene is traversed again to apply the new colors to the corresponding meshes.
- Color State:
The colors state is passed directly to the Model component, ensuring any color changes trigger a re-render of the model.
- setColors Prop:
The setColors function is passed to the Model component, allowing it to update the colors state in the parent component.
- Color Format:
The full hex color string (including the '#') is used in the colors state and color picker.
- Material Handling:
Before setting the mesh's material color property, it is checked if the property exists. If not, a new MeshStandardMaterial with the desired color is created. Setting object.material.needsUpdate = true ensures Three.js updates the material.
- Scene Invalidation:
The invalidate function from useThree is used to tell Three.js to re-render the scene after changes are made to the materials.
- UI Improvements:
The color picker container has a maximum height and scrolling capability, which helps when there are many parts to customize.