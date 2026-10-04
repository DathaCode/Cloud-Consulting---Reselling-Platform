import * as THREE from 'three';

export const latLonToVec3 = (lat, lon, radius = 1) => {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

// Orbit controls capture touch drags, which would block page scrolling on phones.
export const isCoarsePointer = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Fresnel rim-glow material used for atmospheres and cores. */
export const createGlowMaterial = (color = '#67E8F9', intensity = 1.2, power = 2.5) =>
    new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color(color) },
            uIntensity: { value: intensity },
            uPower: { value: power },
        },
        vertexShader: /* glsl */ `
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                vNormal = normalize(normalMatrix * normal);
                vView = normalize(-mv.xyz);
                gl_Position = projectionMatrix * mv;
            }
        `,
        fragmentShader: /* glsl */ `
            uniform vec3 uColor;
            uniform float uIntensity;
            uniform float uPower;
            varying vec3 vNormal;
            varying vec3 vView;
            void main() {
                float f = pow(1.0 - abs(dot(vNormal, vView)), uPower) * uIntensity;
                gl_FragColor = vec4(uColor, f);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
    });
