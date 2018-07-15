// tslint:disable:no-string-literal
// tslint:disable:no-console

import * as React from 'react';

const { THREE } = window;
const Validator = THREE.LoaderSupport.Validator;

interface ThreeSenceBaseProps {
    components: string[];
}

interface ReportProgressEvent {
    text: string;
}

export class ThreeSenceBase extends React.PureComponent<ThreeSenceBaseProps> {
    static animationFrameId: number;
    static renderer: THREE.WebGLRenderer;
    static composer: THREE.EffectComposer;
    static mouse: THREE.Vector2;
    static outlinePass: THREE.OutlinePass;

    container: HTMLDivElement;
    controls: THREE.OrbitControls | null;
    aspectRatio: number;
    camera: THREE.PerspectiveCamera;
    cameraTarget: THREE.Vector3;
    cameraDefaults: {
        posCamera: THREE.Vector3,
        posCameraTarget: THREE.Vector3,
        near: number,
        far: number,
        fov: number
    };
    scene: THREE.Scene;
    raycaster: THREE.Raycaster;
    selectedObjects: THREE.Object3D[];
    highlightTimeout: number;

    static reportProgress = function (event: ReportProgressEvent) {
        console.log('Progress: ' + Validator.verifyInput(event.text, ''));
    };

    // tslint:disable-next-line:typedef
    constructor(props) {
        super(props);

        if (ThreeSenceBase.animationFrameId) {
            this.clearScene();
        }

        this.aspectRatio = 1;
        this.scene = null;
        this.cameraDefaults = {
            posCamera: new THREE.Vector3(0, 70, 250.0),
            posCameraTarget: new THREE.Vector3(0, 0, 0),
            near: 0.1,
            far: 10000,
            fov: 45
        };
        this.camera = null;
        this.cameraTarget = this.cameraDefaults.posCameraTarget;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.selectedObjects = [];
        // * Sence
        this.scene = new THREE.Scene();

        // * Function binds
        this.renderSence = this.renderSence.bind(this);
    }

    componentDidMount() {
        this.recalcAspectRatio();

        const resizeWindow = () => {
            this.resizeDisplayGL();
        };

        // tslint:disable-next-line:no-console
        console.log('Starting initialisation phase...');

        if (!ThreeSenceBase.mouse) {
            ThreeSenceBase.mouse = new THREE.Vector2();
        }

        this.initRenderer();
        this.initCamera();
        this.initControls();
        this.initLights();
        this.initComposer();
        this.initContent();

        this.resizeDisplayGL();
        this.renderSence();

        window.addEventListener('resize', resizeWindow, false);
        this.container.onmousemove = this.onTouchMove.bind(this);
        this.container.ontouchmove = this.onTouchMove.bind(this);

        setInterval(() => {
            this.scene.traverse((o: THREE.Mesh) => {
                if (o instanceof THREE.Mesh) {
                    const img = document.createElement('img');
                    img.src = `/static/models/sofa/maps/170${Math.floor((Math.random() * 6) + 1)}.jpg`;

                    o.material['map'].image = img;
                    o.material['map'].needsUpdate = true;
                }
            });
            // tslint:disable-next-line:align
        }, 10000);
    }

    initComposer() {
        if (ThreeSenceBase.composer) {
            return;
        }

        ThreeSenceBase.composer = new THREE.EffectComposer(ThreeSenceBase.renderer);
        ThreeSenceBase.composer.setSize(this.container.clientWidth, this.container.clientHeight);

        // * SSAA Render
        const renderPass = new THREE.SSAARenderPass(this.scene, this.camera);
        renderPass.clearColor = 0xdcdde1;
        renderPass.clearAlpha = 1;
        renderPass.sampleLevel = 2;
        ThreeSenceBase.composer.addPass(renderPass);

        // * Outline
        ThreeSenceBase.outlinePass = new THREE.OutlinePass(
            new THREE.Vector2(this.container.clientWidth, this.container.clientHeight),
            this.scene,
            this.camera);
        ThreeSenceBase.outlinePass.edgeStrength = 10;
        ThreeSenceBase.outlinePass.pulsePeriod = 1;
        ThreeSenceBase.composer.addPass(ThreeSenceBase.outlinePass);

        // * SSAO
        const ssaoPass = new THREE.SSAOPass(this.scene, this.camera);
        ssaoPass.aoClamp = .8;
        ssaoPass.lumInfluence = 1;
        ThreeSenceBase.composer.addPass(ssaoPass);

        const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        effectFXAA.renderToScreen = true;
        ThreeSenceBase.composer.addPass(effectFXAA);
    }

    clearScene() {
        cancelAnimationFrame(ThreeSenceBase.animationFrameId);
    }

    initRenderer() {
        if (ThreeSenceBase.renderer) {
            return;
        }

        ThreeSenceBase.renderer = new THREE.WebGLRenderer();
        ThreeSenceBase.renderer.autoClear = false;
        ThreeSenceBase.renderer.gammaInput = true;
        ThreeSenceBase.renderer.gammaOutput = true;
        ThreeSenceBase.renderer.shadowMap.enabled = true;
        ThreeSenceBase.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        ThreeSenceBase.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.container.appendChild(ThreeSenceBase.renderer.domElement);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            this.cameraDefaults.fov,
            this.aspectRatio,
            this.cameraDefaults.near,
            this.cameraDefaults.far
        );
        this.resetCamera();
    }

    initControls() {
        this.controls = new THREE.OrbitControls(this.camera, ThreeSenceBase.renderer.domElement);
        this.controls.maxAzimuthAngle = 1.141592653589793;
        this.controls.minAzimuthAngle = -1.141592653589793;
        this.controls.minDistance = 250;
        this.controls.maxDistance = 350;
        this.controls.maxPolarAngle = Math.PI / 2.4;
        this.controls.minPolarAngle = Math.PI / 2.4;

        this.controls.enablePan = false;
        this.controls.enableZoom = true;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.07;
        this.controls.rotateSpeed = 0.07;
    }

    initLights() {
        // * Environtment
        const hemiLight = new THREE.AmbientLight(0xffffff, 0xffffff, 1);
        hemiLight.intensity = 1.5;
        this.scene.add(hemiLight);

        // * Directional
        const dirLight = new THREE.DirectionalLight(0xffffff, 1, 1);
        dirLight.intensity = 1.5;
        dirLight.position.set(-120, 120, 90);
        const d = 150;
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        this.scene.add(dirLight);

        // * Helpers
        if (!true) {
            const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
            this.scene.add(dirLightHeper);
        }
    }

    initContent() {
        const { components } = this.props;
        for (const component of components) {
            ThreeSenceBase.reportProgress({ text: 'Loading: ' + component });

            const objLoader = new THREE.OBJLoader2();

            // tslint:disable-next-line:typedef
            const callbackOnLoad = (event) => {

                for (const mesh of event.detail.loaderRootNode.children) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.position.y = -20;
                }

                event.detail.loaderRootNode.receiveShadow = true;
                this.scene.add(event.detail.loaderRootNode);

                console.info('Loading complete: ' + event.detail.modelName);

                ThreeSenceBase.reportProgress({ text: '' });
            };

            const onLoadMtl = function (materials: THREE.Material[]) {
                for (const key in materials) {
                    if (materials.hasOwnProperty(key)) {
                        const material = materials[key];
                        if (material['map']) {
                            material['map'].anisotropy = 16;
                            material['shininess'] = 50;
                        }
                    }
                }
                objLoader.setModelName(component);
                objLoader.setMaterials(materials);
                objLoader.setLogging(true, true);
                objLoader.load(`static/models/sofa/${component}.obj`, callbackOnLoad, null, null, null, false);
            };
            objLoader.loadMtl(`static/models/sofa/${component}.mtl`, null, onLoadMtl);
        }
    }

    resizeDisplayGL() {
        this.recalcAspectRatio();
        ThreeSenceBase.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight, false);

        this.updateCamera();
    }

    recalcAspectRatio() {
        this.aspectRatio = (this.container.offsetHeight === 0) ? 1 :
            this.container.offsetWidth / this.container.offsetHeight;
    }

    updateCamera() {
        this.camera.aspect = this.aspectRatio;
        this.camera.lookAt(this.cameraTarget);
        this.camera.updateProjectionMatrix();
    }

    resetCamera() {
        this.camera.position.copy(this.cameraDefaults.posCamera);
        this.cameraTarget.copy(this.cameraDefaults.posCameraTarget);
        this.updateCamera();
    }

    renderSence() {
        ThreeSenceBase.animationFrameId = requestAnimationFrame(this.renderSence);
        performance.now();
        if (!ThreeSenceBase.renderer.autoClear) {
            ThreeSenceBase.renderer.clear();
        }

        this.controls.update();
        ThreeSenceBase.composer.render();

    }

    checkIntersection() {
        this.raycaster.setFromCamera(ThreeSenceBase.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects([this.scene], true);
        if (intersects.length > 0) {
            if (this.highlightTimeout) {
                clearTimeout(this.highlightTimeout);
            }
            const selectedObject = intersects[0].object;

            if (ThreeSenceBase.outlinePass.selectedObjects[0] !== selectedObject) {
                ThreeSenceBase.outlinePass.selectedObjects = [];
                this.container.style.cursor = 'default';
            }
            this.highlightTimeout = setTimeout(() => {
                ThreeSenceBase.outlinePass.selectedObjects = [selectedObject];
                this.container.style.cursor = 'pointer';
                // tslint:disable-next-line:align
            }, 50);

        } else {
            ThreeSenceBase.outlinePass.selectedObjects = [];
            this.container.style.cursor = 'default';
        }
    }

    onTouchMove(event: MouseEvent & TouchEvent) {
        let x, y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            const bounds = event.target['getBoundingClientRect']();
            x = event.clientX - bounds.left;
            y = event.clientY - bounds.top;
        }
        ThreeSenceBase.mouse.x = (x / this.container.clientWidth) * 2 - 1;
        ThreeSenceBase.mouse.y = - (y / this.container.clientHeight) * 2 + 1;
        this.checkIntersection();
    }
}