// Initialize 3D Background when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas-3d');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera Setup
    const isMobile = window.innerWidth <= 768;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = isMobile ? 25 : 15;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Lighting ---
    // Ambient light so it's not totally pitch black
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Purple Light (matches --primary)
    const purpleLight = new THREE.PointLight(0x7b2cbf, 2, 50);
    purpleLight.position.set(-10, 10, 5);
    scene.add(purpleLight);

    // Cyan Light (matches --secondary)
    const cyanLight = new THREE.PointLight(0x00f5ff, 2, 50);
    cyanLight.position.set(10, -10, 5);
    scene.add(cyanLight);

    // --- Materials ---
    // Premium frosted glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2, // slight frosting
        transmission: 1.0, // highly transparent/glass-like
        thickness: 0.5,
        ior: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    // --- Geometries ---
    const objects = [];

    // 1. Torus Knot (Complex shape)
    const knotGeo = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
    const knot = new THREE.Mesh(knotGeo, glassMaterial);
    if (isMobile) knot.scale.set(0.7, 0.7, 0.7);
    knot.position.set(-8, 4, -5);
    scene.add(knot);
    objects.push({ mesh: knot, rx: 0.002, ry: 0.003, vx: 0.015, vy: -0.01 });

    // 2. Icosahedron (Crystal shape)
    const icGeo = new THREE.IcosahedronGeometry(2.5, 0); // 0 detail = flat shaded look
    const icosahedron = new THREE.Mesh(icGeo, glassMaterial);
    if (isMobile) icosahedron.scale.set(0.7, 0.7, 0.7);
    icosahedron.position.set(8, -2, -10);
    scene.add(icosahedron);
    objects.push({ mesh: icosahedron, rx: -0.001, ry: 0.002, vx: -0.02, vy: 0.015 });

    // 3. Torus (Ring)
    const torusGeo = new THREE.TorusGeometry(3, 0.8, 16, 100);
    const torus = new THREE.Mesh(torusGeo, glassMaterial);
    if (isMobile) torus.scale.set(0.7, 0.7, 0.7);
    torus.position.set(0, -8, -2);
    scene.add(torus);
    objects.push({ mesh: torus, rx: 0.003, ry: 0.001, vx: 0.01, vy: 0.02 });


    // --- Mouse Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.005;
        mouseY = (event.clientY - windowHalfY) * 0.005;
    });

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smoothly interpolate mouse movement for fluid camera pan
        targetX = mouseX * 2;
        targetY = mouseY * 2;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Rotate and bounce objects
        objects.forEach((obj) => {
            // Constant rotation
            obj.mesh.rotation.x += obj.rx;
            obj.mesh.rotation.y += obj.ry;
            
            // Move by velocity
            obj.mesh.position.x += obj.vx;
            obj.mesh.position.y += obj.vy;

            // Bouncing logic
            // The visual boundaries roughly depend on the Z-depth and FOV.
            // Z ranges from -2 to -10, camera is at 15. Total depth 17-25.
            const limitX = 16;
            const limitY = 10;

            if (obj.mesh.position.x > limitX || obj.mesh.position.x < -limitX) {
                obj.vx = -obj.vx;
            }
            if (obj.mesh.position.y > limitY || obj.mesh.position.y < -limitY) {
                obj.vy = -obj.vy;
            }
        });

        renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
