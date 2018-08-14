// tslint:disable:no-string-literal
// tslint:disable:no-console
// tslint:disable:align
// tslint:disable:readonly-keyword
import * as React from 'react';

const { THREE } = window;
const Validator = THREE.LoaderSupport.Validator;

interface ReportProgressEvent {
    text: string;
}

export interface ThreeSenceBaseProps {
    onObjectSelect: (object: THREE.Mesh | null) => void;
}

export class ThreeSenceBase<TProps extends ThreeSenceBaseProps> extends React.PureComponent<TProps> {
    animationFrameId: number;
    renderer: THREE.WebGLRenderer;
    composer: THREE.EffectComposer;
    mouse: THREE.Vector2;
    outlinePass: THREE.OutlinePass;
    controls: THREE.OrbitControls | null;

    container: HTMLDivElement;
    aspectRatio: number = 1;
    camera: THREE.PerspectiveCamera;
    cameraTarget: THREE.Vector3;
    cameraDefaults = {
        posCamera: new THREE.Vector3(0, 70, 160.0),
        posCameraTarget: new THREE.Vector3(0, 30, 0),
        near: 0.1,
        far: 10000,
        fov: 45
    };
    scene: THREE.Scene;
    raycaster: THREE.Raycaster = new THREE.Raycaster();

    highlightObjects: THREE.Object3D[] = [];
    selectedObject: THREE.Object3D;

    highlightTimeout: NodeJS.Timer | number;
    mouseHoldTimeout: NodeJS.Timer | number;
    isMouseHold: boolean;

    static reportProgress = function (event: ReportProgressEvent) {
        console.log('Progress: ' + Validator.verifyInput(event.text, ''));
    };

    initSence() {
        // * Sence
        this.scene = new THREE.Scene();

        // * Function binds
        this.renderSence = this.renderSence.bind(this);

        this.recalcAspectRatio();
        const resizeWindow = () => {
            this.resizeDisplayGL();
        };

        // tslint:disable-next-line:no-console
        console.log('Starting initialisation phase...');

        if (!this.mouse) {
            this.mouse = new THREE.Vector2();
        }

        this.initRenderer();
        this.initCamera();
        this.initControls();
        this.initLights();
        this.initComposer();

        this.resizeDisplayGL();
        this.renderSence();

        window.addEventListener('resize', resizeWindow, false);
        this.container.onmousemove = this.onTouchMove.bind(this);
        this.container.ontouchmove = this.onTouchMove.bind(this);

        this.container.onmousedown = () => {
            this.mouseHoldTimeout = setTimeout(() => {
                this.isMouseHold = true;
            }, 250);
        };
        this.container.onmouseup = () => {
            this.onClick();
            clearTimeout(this.mouseHoldTimeout as number);
            this.isMouseHold = false;
        };
    }

    initComposer() {
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.setSize(this.container.clientWidth, this.container.clientHeight);

        // * SSAA Render
        const renderPass = new THREE.SSAARenderPass(this.scene, this.camera);
        renderPass.clearColor = '#f9f9f9';
        renderPass.clearAlpha = 1;

        renderPass.sampleLevel = 2;
        this.composer.addPass(renderPass);

        // * Outline
        this.outlinePass = new THREE.OutlinePass(
            new THREE.Vector2(this.container.clientWidth, this.container.clientHeight),
            this.scene,
            this.camera);
        this.outlinePass.pulsePeriod = 1;
        this.composer.addPass(this.outlinePass);

        // * SSAO
        const ssaoPass = new THREE.SSAOPass(this.scene, this.camera);
        ssaoPass.aoClamp = 2;
        ssaoPass.lumInfluence = 1;
        this.composer.addPass(ssaoPass);

        // * FXAA
        const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / this.container.clientWidth, 1 / this.container.clientHeight);
        effectFXAA.renderToScreen = true;
        this.composer.addPass(effectFXAA);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.renderer.autoClear = false;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            this.cameraDefaults.fov,
            this.aspectRatio,
            this.cameraDefaults.near,
            this.cameraDefaults.far
        );

        this.cameraTarget = this.cameraDefaults.posCameraTarget;
        this.resetCamera();
    }

    initControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = this.cameraTarget;

        this.controls.minDistance = 0;
        this.controls.maxDistance = 500;
        this.controls.maxPolarAngle = Math.PI / 2.4;
        this.controls.minPolarAngle = Math.PI / 2.4;

        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.07;
        this.controls.rotateSpeed = 0.07;
    }

    initLights() {
        // * Environtment
        const hemiLight = new THREE.AmbientLight(0xffffff, 0xffffff, 1);
        hemiLight.intensity = 1.8;
        this.scene.add(hemiLight);

        // * Directional
        const dirLight = new THREE.DirectionalLight(0xffffff, 1, 1);
        dirLight.intensity = 1.8;
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

    resizeDisplayGL() {
        this.recalcAspectRatio();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight, false);

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

    resetControl() {
        this.cameraTarget = new THREE.Vecter3(0, 0, 0);
        this.controls.target = this.cameraTarget;
    }

    renderSence() {
        this.animationFrameId = requestAnimationFrame(this.renderSence);
        performance.now();
        if (!this.renderer.autoClear) {
            this.renderer.clear();
        }
        this.controls.update();
        this.composer.render();
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects([this.scene], true);
        if (intersects.length > 0) {
            if (this.highlightTimeout) {
                clearTimeout(this.highlightTimeout as number);
            }
            const selectedObject = intersects[0].object;

            if (this.outlinePass.selectedObjects[0] !== selectedObject) {
                this.container.style.cursor = 'default';
                if (this.selectedObject) {
                    return;
                }
                this.outlinePass.selectedObjects = [];
            }

            this.highlightTimeout = setTimeout(() => {
                this.outlinePass.selectedObjects = [selectedObject];
                this.container.style.cursor = 'pointer';
                // tslint:disable-next-line:align
            }, 50);

        } else {
            if (this.selectedObject) {
                return;
            }

            this.outlinePass.selectedObjects = [];
            this.container.style.cursor = 'default';
        }
    }

    onTouchMove(event: MouseEvent & TouchEvent) {
        if (this.isMouseHold) {
            return;
        }

        let x, y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            const bounds = event.target['getBoundingClientRect']();
            x = event.clientX - bounds.left;
            y = event.clientY - bounds.top;
        }
        this.mouse.x = (x / this.container.clientWidth) * 2 - 1;
        this.mouse.y = - (y / this.container.clientHeight) * 2 + 1;
        this.checkIntersection();
    }

    onClick() {
        if (this.isMouseHold) {
            return;
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects([this.scene], true);
        if (intersects.length > 0) {
            let selectedObject = intersects[0].object;
            if (selectedObject === this.selectedObject) {
                selectedObject = null;
            }
            this.selectObject(selectedObject);
            this.props.onObjectSelect(selectedObject as THREE.Mesh || null);
        } else {
            this.selectObject(null);
            this.props.onObjectSelect(null);
        }
    }

    selectObject(object: THREE.Object3D) {
        this.selectedObject = object;
        this.outlinePass.selectedObjects = object ? [object] : [];
    }

    clearScene() {
        cancelAnimationFrame(this.animationFrameId);
    }
}