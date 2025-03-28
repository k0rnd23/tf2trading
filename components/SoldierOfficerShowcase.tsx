"use client"

import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useTF2Sounds } from './tf2-sounds-component'


const TF2SceneSingleton = (() => {
  let isInitialized = false
  let activeScene: THREE.Scene | null = null
  let activeRenderer: THREE.WebGLRenderer | null = null
  let activeCamera: THREE.PerspectiveCamera | null = null
  let activeControls: OrbitControls | null = null
  let activeModel: THREE.Object3D | null = null
  let activeContainer: HTMLDivElement | null = null
  let activeAnimationFrame: number | null = null
  let isRotating = true
  
  return {
    isInitialized: () => isInitialized,
    setInitialized: (value: boolean) => { isInitialized = value },
    getScene: () => activeScene,
    setScene: (scene: THREE.Scene | null) => { activeScene = scene },
    getRenderer: () => activeRenderer,
    setRenderer: (renderer: THREE.WebGLRenderer | null) => { activeRenderer = renderer },
    getCamera: () => activeCamera,
    setCamera: (camera: THREE.PerspectiveCamera | null) => { activeCamera = camera },
    getControls: () => activeControls,
    setControls: (controls: OrbitControls | null) => { activeControls = controls },
    getModel: () => activeModel,
    setModel: (model: THREE.Object3D | null) => { activeModel = model },
    getContainer: () => activeContainer,
    setContainer: (container: HTMLDivElement | null) => { activeContainer = container },
    getAnimationFrame: () => activeAnimationFrame,
    setAnimationFrame: (frame: number | null) => { activeAnimationFrame = frame },
    isRotating: () => isRotating,
    setRotating: (value: boolean) => { isRotating = value },
    cleanup: () => {
      if (activeAnimationFrame !== null) {
        cancelAnimationFrame(activeAnimationFrame)
        activeAnimationFrame = null
      }
      
      if (activeRenderer && activeContainer) {
        try {
          if (activeRenderer.domElement.parentElement === activeContainer) {
            activeContainer.removeChild(activeRenderer.domElement)
          }
        } catch (e) {
          console.warn("Error removing renderer from container:", e)
        }
      }
      
      if (activeScene) {
        activeScene.traverse((object) => {
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
        
        while(activeScene.children.length > 0) {
          activeScene.remove(activeScene.children[0])
        }
      }
      
      if (activeRenderer) {
        activeRenderer.dispose()
      }
      
      activeScene = null
      activeRenderer = null
      activeCamera = null
      activeControls = null
      activeModel = null
      activeContainer = null
      isInitialized = false
      
      console.log("TF2SceneSingleton: Complete cleanup performed")
    }
  }
})()

interface SoldierOfficerShowcaseProps {
  modelPath?: string;
  className?: string;
}

const SoldierOfficerShowcase: React.FC<SoldierOfficerShowcaseProps> = ({
  modelPath = '/models/team-captain/',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [isRotating, setIsRotating] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const { playSound } = useTF2Sounds()
  
  useEffect(() => {
    setIsRotating(TF2SceneSingleton.isRotating());
  }, []);
  
  const getModelStructure = (obj: THREE.Object3D): any => {
    const result: any = {
      name: obj.name,
      type: obj.type,
      children: []
    }
    
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(child => {
        result.children.push(getModelStructure(child))
      })
    }
    
    return result
  }
  
  const loadTexture = (path: string) => {
    return new Promise<THREE.Texture>((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(
        path,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
          resolve(texture)
        },
        undefined,
        (error) => reject(error)
      )
    })
  }
  
  const loadModel = async () => {
    const scene = TF2SceneSingleton.getScene()
    if (!scene) {
      console.error("Can't load model: scene not initialized")
      return
    }
    
    console.log("STARTING MODEL LOAD - should happen once")
    setLoading(true)
    setError(null)
    
    const existingModel = TF2SceneSingleton.getModel()
    if (existingModel && existingModel.parent) {
      existingModel.parent.remove(existingModel)
      console.log("Removed existing model")
    }
    
    const flames = scene.getObjectByName("unusual-flames")
    if (flames) {
      scene.remove(flames)
      console.log("Removed existing flames")
    }
    
    try {
      let diffuseTexture
      
      try {
        diffuseTexture = await loadTexture(`${modelPath}soldier_officer.png`)
        console.log("Loaded texture successfully:", diffuseTexture)
        setLoadingProgress(30)
      } catch (err) {
        console.warn("Failed to load diffuse texture:", err)
      }
      
      const loader = new ColladaLoader()
      const collada = await new Promise<any>((resolve, reject) => {
        loader.load(
          `${modelPath}soldier_officer.dae`,
          (collada) => resolve(collada),
          (xhr) => {
            setLoadingProgress(60 + (xhr.loaded / xhr.total) * 40)
          },
          (error) => reject(error)
        )
      })
      
      console.log("COLLADA Model loaded:", collada)
      
      const model = collada.scene
      
      if (!model) {
        throw new Error("Failed to create model from COLLADA data")
      }
      
      model.userData.isMainModel = true
      model.name = "main-officer-model"
      
      scene.add(model)
      TF2SceneSingleton.setModel(model)
      
      model.scale.set(0.05, 0.05, 0.05)
      
      model.position.set(0, -0.15, 0)
      
      model.rotation.set(0.3, 0, 0)
      
      console.log("Model structure:", getModelStructure(model))
      
      setModelLoaded(true)
      setLoading(false)
      playSound('notification')
      
      return model
      
    } catch (err) {
      console.error("Error loading model:", err)
      setError("Failed to load model")
      setLoading(false)
      return null
    }
  }
  
  const animateFlames = (time: number) => {
    const scene = TF2SceneSingleton.getScene()
    if (!scene) return
    
    const flames = scene.getObjectByName("unusual-flames") as THREE.Group
    if (!flames) return
    
    flames.children.forEach((flame: THREE.Object3D) => {
      const flicker = 0.8 + 0.2 * Math.sin(time * 10 + flame.userData.phase)
      flame.scale.set(flame.userData.size * flicker, flame.userData.size * flicker, 1)
      
      flame.position.y = flame.userData.originalY + Math.sin(time * flame.userData.speed) * flame.userData.amplitude
      flame.position.x += Math.sin(time * 2 + flame.userData.phase) * 0.0001
      flame.position.z += Math.cos(time * 2 + flame.userData.phase) * 0.0001
    })
  }
  
  useEffect(() => {
    const scene = TF2SceneSingleton.getScene()
    const model = TF2SceneSingleton.getModel()
    
    if (!scene || !modelLoaded || !model) {
      console.log("Not adding flames - conditions not met", {
        sceneExists: !!scene,
        modelLoaded,
        modelExists: !!model
      })
      return
    }
    
    console.log("Adding flame effect - should happen once per model load")
    
    const existingFlames = scene.getObjectByName("unusual-flames")
    if (existingFlames) {
      scene.remove(existingFlames)
      console.log("Removed existing flames")
    }
    
    // useless flame effect 
    // (not working properly, and i have no idea how to do it properly)
    const flameCount = 25
    const flames = new THREE.Group()
    flames.name = "unusual-flames"
    
    const flameCanvas = document.createElement('canvas')
    flameCanvas.width = 64
    flameCanvas.height = 64
    const ctx = flameCanvas.getContext('2d')
    
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 0, 1)')
      gradient.addColorStop(0.2, 'rgba(255, 150, 0, 0.9)')
      gradient.addColorStop(0.5, 'rgba(255, 60, 0, 0.6)')
      gradient.addColorStop(1, 'rgba(180, 0, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    }
    
    const flameTexture = new THREE.CanvasTexture(flameCanvas)
    const flameMaterial = new THREE.SpriteMaterial({
      map: flameTexture,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
    
    for (let i = 0; i < flameCount; i++) {
      const flame = new THREE.Sprite(flameMaterial)
      
      const theta = Math.random() * Math.PI * 2
      const radius = 0.008 + Math.random() * 0.005
      
      flame.position.x = Math.cos(theta) * radius
      flame.position.y = 0.0 + Math.random() * 0.008
      flame.position.z = Math.sin(theta) * radius
      
      const size = 0.015 + Math.random() * 0.01
      flame.scale.set(size, size, 1)
      
      flame.userData = {
        originalY: flame.position.y,
        speed: 0.02 + Math.random() * 0.04,
        amplitude: 0.005 + Math.random() * 0.005,
        size: size,
        phase: Math.random() * Math.PI * 2
      }
      
      flames.add(flame)
    }
    
    scene.add(flames)
    console.log("Flames added to scene")
    
  }, [modelLoaded])
  
  const toggleRotation = () => {
    if (TF2SceneSingleton.getModel()) {
      const newRotationState = !TF2SceneSingleton.isRotating();
      TF2SceneSingleton.setRotating(newRotationState);
      setIsRotating(newRotationState);
      playSound('buttonClick');
    }
  }
  
  const resetView = () => {
    const controls = TF2SceneSingleton.getControls()
    const camera = TF2SceneSingleton.getCamera()
    const model = TF2SceneSingleton.getModel()
    
    if (controls && camera) {
      camera.position.set(0, -0.05, 0.5)
      
      controls.target.set(0, 0, 0)
      controls.update()
      
      if (model) {
        model.rotation.set(0.3, 0, 0)
      }
      
      playSound('buttonClick')
    }
  }
  
  useEffect(() => {
    // if this component is mounting when a previous instance already exists,
    // we need to clean up thoroughly
    if (TF2SceneSingleton.isInitialized()) {
      console.log("Previous instance detected, cleaning up thoroughly")
      TF2SceneSingleton.cleanup()
    }
    
    console.log("Initial scene setup - should run only once")
    
    if (!containerRef.current) return
    
    TF2SceneSingleton.setContainer(containerRef.current)
    
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a3c5a)
    TF2SceneSingleton.setScene(scene)
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(1, 1, 0.5)
    scene.add(directionalLight)
    
    const pointLight = new THREE.PointLight(0xff9900, 0.8, 10)
    pointLight.position.set(-0.1, 0.1, 0.2)
    scene.add(pointLight)
    
    const rimLight = new THREE.PointLight(0xaaccff, 0.5, 10)
    rimLight.position.set(-0.2, 0, -0.2)
    scene.add(rimLight)
    
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.01,
      1000
    )
    camera.position.set(0, -0.05, 0.5)
    TF2SceneSingleton.setCamera(camera)
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.useLegacyLights = false
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)
    TF2SceneSingleton.setRenderer(renderer)
    
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = false
    controls.minDistance = 0.2
    controls.maxDistance = 2
    controls.target.set(0, 0, 0)
    TF2SceneSingleton.setControls(controls)
    
    const gridHelper = new THREE.GridHelper(1, 20, 0x3282b8, 0x3282b8)
    gridHelper.position.y = -0.1
    scene.add(gridHelper)
    
    const handleResize = () => {
      const container = TF2SceneSingleton.getContainer()
      const renderer = TF2SceneSingleton.getRenderer()
      const camera = TF2SceneSingleton.getCamera()
      
      if (!container || !renderer || !camera) return
      
      const width = container.clientWidth
      const height = container.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    
    loadModel()
    
    TF2SceneSingleton.setInitialized(true)
    
    let lastTime = 0
    
    const animate = (time: number) => {
      const delta = time - lastTime
      lastTime = time
      
      const animationId = requestAnimationFrame(animate)
      TF2SceneSingleton.setAnimationFrame(animationId)
      
      const controls = TF2SceneSingleton.getControls()
      const model = TF2SceneSingleton.getModel()
      const renderer = TF2SceneSingleton.getRenderer()
      const scene = TF2SceneSingleton.getScene()
      const camera = TF2SceneSingleton.getCamera()
      
      if (controls) {
        controls.update()
      }
      
      if (model && TF2SceneSingleton.isRotating()) {
        model.rotation.y += 0.002 * delta
      }
      
      animateFlames(time * 0.001)
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }
    
    const animationId = requestAnimationFrame(animate)
    TF2SceneSingleton.setAnimationFrame(animationId)
    
    return () => {
      console.log("Cleaning up scene and canceling animation")
      window.removeEventListener('resize', handleResize)
      
      TF2SceneSingleton.cleanup()
    }
  }, [])
  
  return (
    <div className={`${className} flex flex-col`}>
      <div 
        ref={containerRef} 
        className="w-full h-96 md:h-[500px] relative bg-[#1a3c5a]"
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a3c5a] bg-opacity-80 z-10">
            <div className="text-white text-lg mb-3">
              <span className="inline-block animate-spin mr-2">⚙️</span>
              Loading Team Captain Cap...
            </div>
            <div className="w-64 h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#CF7336]"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a3c5a] bg-opacity-80 z-10">
            <div className="text-[#B8383B] text-lg">
              {error}
            </div>
          </div>
        )}
        
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(50, 130, 184, 0.15) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(50, 130, 184, 0.15) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div className="mt-6 flex flex-wrap justify-between items-center">
        <button 
          className="btn-primary text-sm py-2"
          onClick={toggleRotation}
        >
          {isRotating ? "Stop Rotation" : "Start Rotation"}
        </button>
        
        <button 
          className="btn-outline text-sm py-2"
          onClick={resetView}
        >
          Reset View
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-300 bg-[#2A2A2A] p-3 rounded-md border border-[#444444]">
        <p>🖱️ <strong>Left-click + drag</strong>: Rotate model | <strong>Scroll</strong>: Zoom in/out</p>
        <p>The Team Captain Cap features a Burning Flames unusual effect, one of the most valuable combinations in TF2.</p>
      </div>
    </div>
  )
}

export default SoldierOfficerShowcase