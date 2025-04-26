<script setup lang="ts">
  import * as THREE from 'three';
  import { ref, onMounted, onUnmounted } from 'vue';

  const container = ref<HTMLDivElement | null>(null);
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let animationFrameId: number | null = null;
  let stars: THREE.Mesh[] = [];
  let starOffsets: {
    x: number;
    y: number;
    phase: number;  
    colorPhase: number 
    radius: number; 
    initialAngle: number; 
  }[] = [];

  const lastScrollY = ref(0);
  const rotationSpeedFactor = 0.002;
  const rotationVelocity = ref(0);
  const dampingFactor = 0.95;
  const baseColor1 = new THREE.Color(0x6d28d9);
  const baseColor2 = new THREE.Color(0xcbb9ff);
  const wobbleIntensity = 1.5;
  let rotationAngle = 0;

  const onMouseMove = (event: MouseEvent) => {
    if (!camera) return;
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);
  };

  const handleResize = () => {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    clearStars();
    addStars();
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const newScrollSpeed = currentScrollY - lastScrollY.value;
    lastScrollY.value = currentScrollY; // CHANGED: store for next delta
    rotationVelocity.value += newScrollSpeed * rotationSpeedFactor * 0.1;
  };

  const getStarCount = () => {
    const area = window.innerWidth * window.innerHeight;
    return Math.min(200, Math.max(30, Math.floor(area / 20000)));
  };

  const clearStars = () => {
    stars.forEach(s => scene?.remove(s));
    stars = [];
    starOffsets = [];
  };

  const addStars = () => {
    if (!camera || !scene) return;

    const aspect = window.innerWidth / window.innerHeight;
    const fovRad = (camera.fov * Math.PI) / 180;
    const viewHeight = 2 * camera.position.z * Math.tan(fovRad / 2);
    const viewWidth  = viewHeight * aspect;
    const halfWidth  = viewWidth  * 0.5;
    const halfHeight = viewHeight * 0.5;

    const starGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const starColors = [0xffffff, 0xb998f9, 0x7c3aed];

    const starCount = getStarCount();
    for (let i = 0; i < starCount; i++) {
      const color = new THREE.Color(
        starColors[Math.floor(Math.random() * starColors.length)]
      );
      const starMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      const x = THREE.MathUtils.randFloat(-halfWidth, halfWidth);
      const y = THREE.MathUtils.randFloat(-halfHeight, halfHeight);
      const depthSpread = Math.max(viewWidth, viewHeight) * 0.5;  
      const z = THREE.MathUtils.randFloat(-depthSpread, depthSpread);
      star.position.set(x, y, z);

      const radius = Math.sqrt(x * x + z * z);
      const initialAngle = Math.atan2(z, x);

      stars.push(star);
      starOffsets.push({
        x,
        y,
        phase: Math.random() * Math.PI * 2,
        colorPhase: Math.random() * Math.PI * 2,
        radius,
        initialAngle
      });
      scene.add(star);
    }
  };

  onMounted(() => {
    const el = container.value;
    if (!el) return;

    scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xb998f9, 0.50);
    scene.add(ambientLight);

    addStars();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      rotationVelocity.value *= dampingFactor;
      if (Math.abs(rotationVelocity.value) < 0.001) rotationVelocity.value = 0;

      rotationAngle += rotationVelocity.value;

      const time = Date.now() * 0.001;
      stars.forEach((star, index) => {
        const offset = starOffsets[index];

        const angle = offset.initialAngle + rotationAngle;

        const wobbleX = Math.sin(time + offset.phase) * wobbleIntensity;
        const wobbleY = Math.cos(time + offset.phase) * wobbleIntensity;

        star.position.x = Math.cos(angle) * offset.radius + wobbleX;
        star.position.z = Math.sin(angle) * offset.radius + wobbleY;
        star.position.y = offset.y;

        const t = (Math.sin(Date.now() * 0.001 + offset.colorPhase) + 1) / 2;
        const color = new THREE.Color().lerpColors(baseColor1, baseColor2, t);
        (star.material as THREE.MeshBasicMaterial).color.copy(color);
      });

      if (renderer && scene && camera) renderer.render(scene, camera);
    };

    animate();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <transition name="fade" appear>
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden z-50 pointer-events-none opacity-80">
      <div ref="container" class="w-full h-full"></div>
    </div>
  </transition>
</template>
