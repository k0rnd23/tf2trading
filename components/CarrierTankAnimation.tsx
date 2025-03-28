"use client"

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { useTF2Sounds } from './tf2-sounds-component'

interface CarrierTankAnimationProps {
  scrollContainerId?: string;
}

const CarrierTankSceneSingleton = (() => {
  let isInitialized = false
  let scene: THREE.Scene | null = null
  let renderer: THREE.WebGLRenderer | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let tank: THREE.Object3D | null = null
  let tankParts: THREE.Object3D | null = null
  let container: HTMLDivElement | null = null
  let animationFrame: number | null = null
  let tankSpotlight: THREE.SpotLight | null = null

  let path: THREE.CurvePath<THREE.Vector3> | null = null
  let pathPoints: THREE.Vector3[] = []
  let totalPathLength = 0

  return {
    isInitialized: () => isInitialized,
    setInitialized: (value: boolean) => { isInitialized = value },
    getScene: () => scene,
    setScene: (newScene: THREE.Scene | null) => { scene = newScene },
    getRenderer: () => renderer,
    setRenderer: (newRenderer: THREE.WebGLRenderer | null) => { renderer = newRenderer },
    getCamera: () => camera,
    setCamera: (newCamera: THREE.PerspectiveCamera | null) => { camera = newCamera },
    getTank: () => tank,
    setTank: (newTank: THREE.Object3D | null) => { tank = newTank },
    getTankParts: () => tankParts,
    setTankParts: (newTankParts: THREE.Object3D | null) => { tankParts = newTankParts },
    getContainer: () => container,
    setContainer: (newContainer: HTMLDivElement | null) => { container = newContainer },
    getAnimationFrame: () => animationFrame,
    setAnimationFrame: (frame: number | null) => { animationFrame = frame },
    getPath: () => path,
    setPath: (newPath: THREE.CurvePath<THREE.Vector3> | null) => { path = newPath },
    getPathPoints: () => pathPoints,
    setPathPoints: (newPathPoints: THREE.Vector3[]) => { pathPoints = newPathPoints },
    getTotalPathLength: () => totalPathLength,
    setTotalPathLength: (length: number) => { totalPathLength = length },
    getTankSpotlight: () => tankSpotlight,
    setTankSpotlight: (spotlight: THREE.SpotLight | null) => { tankSpotlight = spotlight },
    cleanup: () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }

      if (renderer && container) {
        try {
          if (renderer.domElement.parentElement === container) {
            container.removeChild(renderer.domElement)
          }
        } catch (e) {
          console.warn("Error removing renderer from container:", e)
        }
      }

      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          }
        })

        while(scene.children.length > 0) {
          scene.remove(scene.children[0])
        }
      }

      if (renderer) {
        renderer.dispose()
      }

      scene = null
      renderer = null
      camera = null
      tank = null
      tankParts = null
      container = null
      tankSpotlight = null
      path = null
      pathPoints = []
      totalPathLength = 0
      isInitialized = false

      console.log("CarrierTankSceneSingleton: Complete cleanup performed")
    }
  }
})()

const CarrierTankAnimation: React.FC<CarrierTankAnimationProps> = ({
  scrollContainerId = 'how-it-works-section'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { playSound } = useTF2Sounds()
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [showDebug, setShowDebug] = useState(false)

  const loadModels = async () => {
    const scene = CarrierTankSceneSingleton.getScene()
    if (!scene) {
      console.error("Can't load models: scene not initialized")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const textureLoader = new THREE.TextureLoader()
      const bodyTexture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          '/models/carrier-tank/carrier_body.png',
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.flipY = false
            resolve(texture)
          },
          undefined,
          (error) => reject(error)
        )
      })

      const interiorTexture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          '/models/carrier-tank/carrier_interior.png',
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.flipY = false
            resolve(texture)
          },
          undefined,
          (error) => reject(error)
        )
      })

      const loader = new ColladaLoader()
      const tankData = await new Promise<any>((resolve, reject) => {
        loader.load(
          '/models/carrier-tank/CarrierTankFixed.dae',
          (collada) => resolve(collada),
          (xhr) => {
            const percent = Math.round((xhr.loaded / xhr.total) * 50)
            setProgressPercentage(percent)
          },
          (error) => reject(error)
        )
      })

      console.log("Carrier tank model loaded:", tankData)

      const tank = tankData.scene
      tank.name = "carrier-tank"

      console.log("Model structure:");
      tank.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log("Mesh found:", child.name);
        }
      });

      tank.scale.set(0.0008, 0.0008, 0.0008)

      
      

      const axesHelper = new THREE.AxesHelper(0.5);
      tank.add(axesHelper);

      const tankContainer = new THREE.Object3D();
      tankContainer.name = "tank-container";

      tankContainer.add(tank);

      tank.position.set(0, -0.05, 0);

      scene.add(tankContainer);

      CarrierTankSceneSingleton.setTank(tankContainer);

      console.log("Tank loaded with dimensions:",
        new THREE.Box3().setFromObject(tank).getSize(new THREE.Vector3()))

      const bodyMaterial = new THREE.MeshStandardMaterial({
        map: bodyTexture,
        metalness: 0.4,
        roughness: 0.6
      });

      const interiorMaterial = new THREE.MeshStandardMaterial({
        map: interiorTexture,
        metalness: 0.2,
        roughness: 0.8
      });

      const defaultMaterial = new THREE.MeshStandardMaterial({
        color: 0x8c8c8c,
        metalness: 0.5,
        roughness: 0.5
      });

      tank.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = bodyMaterial;

          const lowerName = child.name.toLowerCase();
          if (lowerName.includes('interior') || lowerName.includes('inside') || lowerName.includes('cabin')) {
            child.material = interiorMaterial;
          } else if (lowerName.includes('body') || lowerName.includes('hull') || lowerName.includes('exterior')) {
            child.material = bodyMaterial;
          }

          child.castShadow = true;
          child.receiveShadow = true;

          console.log(`Applied material to ${child.name}`);
        }
      })

      scene.add(tank)
      CarrierTankSceneSingleton.setTank(tank)

      setIsLoading(false)
      playSound('notification')

      return tank
    } catch (err) {
      console.error("Error loading carrier tank model:", err)
      setError("Failed to load carrier tank model")
      setIsLoading(false)
      return null
    }
  }

  const createPath = () => {
    const waypoints = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-2, 0, 0.3),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, 0, 0.2),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1.5, 0, -0.2),
      new THREE.Vector3(2, 0, 0),
      new THREE.Vector3(3, 0, 0.3),
      new THREE.Vector3(4, 0, 0)
    ]

    const waypointGroup = new THREE.Group();
    waypointGroup.name = "waypoints-debug";

    waypoints.forEach((pos, index) => {
      const geometry = new THREE.SphereGeometry(0.05, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? 0xff0000 : 0xffff00,
        transparent: true,
        opacity: 0.5
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(pos);
      sphere.visible = false;
      waypointGroup.add(sphere);
    });

    
    const curve = new THREE.CatmullRomCurve3(waypoints);
    curve.tension = 0.3; 

    
    const pathPoints = curve.getPoints(300);
    CarrierTankSceneSingleton.setPathPoints(pathPoints);

    
    let totalLength = 0;
    for (let i = 0; i < pathPoints.length - 1; i++) {
      totalLength += pathPoints[i].distanceTo(pathPoints[i + 1]);
    }
    CarrierTankSceneSingleton.setTotalPathLength(totalLength);

    
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);

    
    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0xCF7336, 
      linewidth: 3 
    });
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    pathLine.position.y = 0.01; 

    
    const railGroup = new THREE.Group();
    railGroup.name = "rails";

    
    const points = pathPoints;

    
    for (let i = 0; i < points.length - 1; i += 5) {
      const current = points[i];
      const next = points[i + 1];

      
      const direction = new THREE.Vector3().subVectors(next, current);
      const length = direction.length();
      direction.normalize();

      
      const railWidth = 0.02;
      const railHeight = 0.01;
      const railSpacing = 0.1;

      const railGeometry = new THREE.BoxGeometry(length, railHeight, railWidth);
      const railMaterial = new THREE.MeshStandardMaterial({
        color: 0xa0a0a0, 
        metalness: 0.8,
        roughness: 0.2
      });

      
      const leftRail = new THREE.Mesh(railGeometry, railMaterial);
      
      const rightRail = new THREE.Mesh(railGeometry, railMaterial);

      
      const midpoint = new THREE.Vector3().lerpVectors(current, next, 0.5);

      
      const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x);
      perpendicular.normalize();

      
      leftRail.position.copy(midpoint).add(perpendicular.clone().multiplyScalar(railSpacing/2));
      rightRail.position.copy(midpoint).add(perpendicular.clone().multiplyScalar(-railSpacing/2));

      
      leftRail.position.y = 0.005; 
      rightRail.position.y = 0.005;

      
      const angle = Math.atan2(direction.x, direction.z);
      leftRail.rotation.y = angle;
      rightRail.rotation.y = angle;

      
      railGroup.add(leftRail);
      railGroup.add(rightRail);
    }

    
    const tiesGroup = new THREE.Group();
    tiesGroup.name = "railroad-ties";

    
    for (let i = 0; i < pathPoints.length; i += 10) {
      const point = pathPoints[i];

      
      const nextPoint = pathPoints[Math.min(i + 1, pathPoints.length - 1)];
      const direction = new THREE.Vector3().subVectors(nextPoint, point).normalize();

      
      if (direction.length() < 0.001) continue;

      
      const tieGeometry = new THREE.BoxGeometry(0.1, 0.005, 0.3);
      const tieMaterial = new THREE.MeshStandardMaterial({
        color: 0x5A3921, 
        roughness: 0.8,
        metalness: 0.2
      });
      const tie = new THREE.Mesh(tieGeometry, tieMaterial);

      
      tie.position.copy(point);
      tie.position.y = 0; 

      
      const angle = Math.atan2(direction.x, direction.z);
      tie.rotation.y = angle;

      tiesGroup.add(tie);
    }

    
    const stationPositions = [
      waypoints[3], 
      waypoints[5], 
      waypoints[7]  
    ];

    const stationGroup = new THREE.Group();
    stationGroup.name = "stations";

    stationPositions.forEach((stationPoint, index) => {
      
      const platformGeometry = new THREE.BoxGeometry(0.5, 0.02, 0.5);
      const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x3282B8, 
        roughness: 0.7,
        metalness: 0.3,
        emissive: 0x1a5580,
        emissiveIntensity: 0.2
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);

      platform.position.copy(stationPoint);
      platform.position.y = -0.01; 

      
      stationGroup.add(platform);

      
      const glowGeometry = new THREE.CircleGeometry(0.35, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x8CCDEA,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const glowCircle = new THREE.Mesh(glowGeometry, glowMaterial);
      glowCircle.rotation.x = -Math.PI / 2; 
      glowCircle.position.copy(stationPoint);
      glowCircle.position.y = -0.005; 

      stationGroup.add(glowCircle);

      
      const textGeometry = new THREE.PlaneGeometry(0.2, 0.1);
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#1a3c5a';
        ctx.fillRect(0, 0, 128, 64);
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), 64, 32);

        const textTexture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
          map: textTexture,
          transparent: true,
          opacity: 0.9
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.copy(stationPoint);
        textMesh.position.y = 0.03; 
        textMesh.rotation.x = -Math.PI / 2; 

        stationGroup.add(textMesh);
      }
    });

    
    const scene = CarrierTankSceneSingleton.getScene();
    if (scene) {
      scene.add(pathLine);
      scene.add(railGroup);
      scene.add(tiesGroup);
      scene.add(stationGroup);
      scene.add(waypointGroup);
    }

    
    const path = new THREE.CurvePath<THREE.Vector3>();
    path.add(curve);

    
    CarrierTankSceneSingleton.setPath(path);

    return path;
  }

  
  const updateTankPosition = (scrollProgress: number) => {
    const tankContainer = CarrierTankSceneSingleton.getTank();
    const pathPoints = CarrierTankSceneSingleton.getPathPoints();
    const scene = CarrierTankSceneSingleton.getScene();

    if (!tankContainer || pathPoints.length === 0 || !scene) return;

    
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    
    const pointIndex = Math.floor(scrollProgress * (pathPoints.length - 1));
    const remainder = scrollProgress * (pathPoints.length - 1) - pointIndex;

    
    const currentPoint = pathPoints[pointIndex];
    const nextPoint = pathPoints[Math.min(pointIndex + 1, pathPoints.length - 1)];

    
    tankContainer.position.lerpVectors(currentPoint, nextPoint, remainder);
    tankContainer.position.y = 0.01; 

    
    if (pointIndex < pathPoints.length - 1) {
      const direction = new THREE.Vector3()
        .subVectors(nextPoint, currentPoint)
        .normalize();

      
      if (direction.length() > 0.001) {
        const angle = Math.atan2(direction.x, direction.z);

        
        
        tankContainer.rotation.y = angle;

        
        const tank = tankContainer.children.find(child => child.name === "carrier-tank");

        if (tank && tank.userData.initialRotation) {
          
          tank.rotation.copy(tank.userData.initialRotation);

          
          
          
        }
      }
    }

    
    const spotlight = CarrierTankSceneSingleton.getTankSpotlight();
    if (spotlight) {
      spotlight.position.x = tankContainer.position.x;
      spotlight.position.z = tankContainer.position.z;
      spotlight.position.y = 1; 
      spotlight.target.position.copy(tankContainer.position);

      
      const time = Date.now() * 0.001;
      spotlight.intensity = 0.7 + Math.sin(time * 4) * 0.1; 
    }

    
    
    const stationPositions = [
      new THREE.Vector3(0, 0, 0),  
      new THREE.Vector3(1, 0, 0),  
      new THREE.Vector3(2, 0, 0)   
    ];

    const stationGroup = scene.getObjectByName("stations") as THREE.Group;

    if (stationGroup && stationGroup.children.length > 0) {
      stationPositions.forEach((stationPos, idx) => {
        
        const platform = stationGroup.children[idx * 3];
        
        const glow = stationGroup.children[idx * 3 + 1];

        
        const distanceToStation = tankContainer.position.distanceTo(stationPos);

        
        if (distanceToStation < 0.5) {
          
          if (glow instanceof THREE.Mesh && glow.material instanceof THREE.MeshBasicMaterial) {
            glow.material.opacity = 0.3 + (1 - distanceToStation / 0.5) * 0.4;
          }

          
          if (platform instanceof THREE.Mesh && platform.material instanceof THREE.MeshStandardMaterial) {
            platform.material.emissiveIntensity = 0.2 + (1 - distanceToStation / 0.5) * 0.6;
          }
        } else {
          
          if (glow instanceof THREE.Mesh && glow.material instanceof THREE.MeshBasicMaterial) {
            glow.material.opacity = 0.3;
          }

          if (platform instanceof THREE.Mesh && platform.material instanceof THREE.MeshStandardMaterial) {
            platform.material.emissiveIntensity = 0.2;
          }
        }
      });
    }
  }

  useEffect(() => {
    if (CarrierTankSceneSingleton.isInitialized()) {
      console.log("Previous instance detected, cleaning up thoroughly");
      CarrierTankSceneSingleton.cleanup();
    }

    if (!containerRef.current) return;

    console.log("Initializing carrier tank scene");

    
    CarrierTankSceneSingleton.setContainer(containerRef.current);

    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a3c5a); 
    CarrierTankSceneSingleton.setScene(scene);

    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 0); 
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    
    const fillLight = new THREE.DirectionalLight(0xffffcc, 0.4);
    fillLight.position.set(5, 5, 5);
    scene.add(fillLight);

    
    const tankSpotlight = new THREE.SpotLight(0xffffff, 0.7, 5, Math.PI / 4, 0.5, 1);
    tankSpotlight.position.set(0, 2, 0);
    tankSpotlight.target.position.set(0, 0, 0);
    scene.add(tankSpotlight);
    scene.add(tankSpotlight.target);

    
    CarrierTankSceneSingleton.setTankSpotlight(tankSpotlight);

    
    const grid = new THREE.GridHelper(20, 40, 0x3282b8, 0x3282b8);
    grid.position.y = 0;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.01,
      1000
    );

    
    camera.position.set(0.5, 2.5, 0); 
    camera.lookAt(0.5, 0, 0); 
    CarrierTankSceneSingleton.setCamera(camera);

    
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    CarrierTankSceneSingleton.setRenderer(renderer);

    
    createPath();

    
    loadModels();

    
    const handleResize = () => {
      const container = CarrierTankSceneSingleton.getContainer();
      const renderer = CarrierTankSceneSingleton.getRenderer();
      const camera = CarrierTankSceneSingleton.getCamera();

      if (!container || !renderer || !camera) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    
    const handleScroll = () => {
      
      const scrollContainer = document.getElementById(scrollContainerId);
      if (!scrollContainer) return;

      
      const containerRect = scrollContainer.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      
      let scrollProgress = 0;

      if (containerTop < windowHeight && containerTop > -containerHeight) {
        
        
        scrollProgress = (windowHeight - containerTop) / (containerHeight + windowHeight);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      } else if (containerTop <= -containerHeight) {
        
        scrollProgress = 1;
      }

      
      updateTankPosition(scrollProgress);
      setProgressPercentage(Math.round(scrollProgress * 100));
    };

    window.addEventListener('scroll', handleScroll);

    
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      CarrierTankSceneSingleton.setAnimationFrame(animationId);

      const renderer = CarrierTankSceneSingleton.getRenderer();
      const scene = CarrierTankSceneSingleton.getScene();
      const camera = CarrierTankSceneSingleton.getCamera();

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const animationId = requestAnimationFrame(animate);
    CarrierTankSceneSingleton.setAnimationFrame(animationId);
    CarrierTankSceneSingleton.setInitialized(true);

    
    handleScroll();

    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      CarrierTankSceneSingleton.cleanup();
    };
  }, [scrollContainerId]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={containerRef}
        className="absolute inset-0 z-10"
        style={{ height: '350px' }} 
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a3c5a] bg-opacity-70 z-20">
            <div className="text-white text-center">
              <div className="mb-2">Loading Carrier Tank... {progressPercentage}%</div>
              <div className="w-40 h-2 bg-[#2A2A2A] rounded-full">
                <div
                  className="h-full bg-[#CF7336] rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a3c5a] bg-opacity-70 z-20">
            <div className="text-[#B8383B] text-lg">
              {error}
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 z-30 bg-[#2A2A2A] p-1 rounded text-xs text-white">
          Progress: {progressPercentage}%
          <button
            className="ml-2 bg-[#CF7336] px-1 rounded"
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? "Hide" : "Debug"}
          </button>
        </div>

        {showDebug && (
          <div className="absolute top-2 right-2 z-30 bg-[#2A2A2A] p-2 rounded-md border border-[#444444]">
            <div className="text-white text-xs mb-2">Debug Controls</div>
            <div className="grid grid-cols-2 gap-1">
              <button
                className="bg-[#5885A2] text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  const tank = CarrierTankSceneSingleton.getTank();
                  const scene = CarrierTankSceneSingleton.getScene();
                  if (tank && scene) {
                    const points = scene.getObjectByName("waypoints-debug");
                    if (points) {
                      points.visible = !points.visible;
                      points.children.forEach(child => {
                        child.visible = !child.visible;
                      });
                    }
                  }
                }}
              >
                Toggle Points
              </button>
              <button
                className="bg-[#5885A2] text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  const tank = CarrierTankSceneSingleton.getTank();
                  if (tank) {
                    const currentScale = tank.scale.x;
                    tank.scale.set(currentScale * 1.2, currentScale * 1.2, currentScale * 1.2);
                  }
                }}
              >
                Size +20%
              </button>
              <button
                className="bg-[#5885A2] text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  const tank = CarrierTankSceneSingleton.getTank();
                  if (tank) {
                    const currentScale = tank.scale.x;
                    tank.scale.set(currentScale * 0.8, currentScale * 0.8, currentScale * 0.8);
                  }
                }}
              >
                Size -20%
              </button>
              <button
                className="bg-[#5885A2] text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  const camera = CarrierTankSceneSingleton.getCamera();
                  if (camera) {
                    camera.position.y += 0.5;
                    camera.lookAt(0.5, 0, 0);
                  }
                }}
              >
                Camera +
              </button>
              <button
                className="bg-[#5885A2] text-white text-xs px-2 py-1 rounded"
                onClick={() => {
                  const camera = CarrierTankSceneSingleton.getCamera();
                  if (camera) {
                    camera.position.y = Math.max(0.5, camera.position.y - 0.5);
                    camera.lookAt(0.5, 0, 0);
                  }
                }}
              >
                Camera -
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarrierTankAnimation;
