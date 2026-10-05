---
name: three-scenes
description: How the three.js / React Three Fiber 3D explorers on the VIN Cloud site are built (hero globe, AI neural network, platform ecosystem orbit), their performance rules and known gotchas. Use before editing src/components/three or adding any new 3D/WebGL feature.
---

# 3D scenes (three 0.186 · @react-three/fiber 9 · drei 10)

## The three explorers
| File | Section | Interaction |
|---|---|---|
| `HeroGlobe.jsx` | Hero | Point-cloud globe, South Asia hub → cloud-region arcs with travelling pulses; drag (desktop), hover a node for its label |
| `NeuralScene.jsx` | `#ai` | Layered network: inputs (Documents, Tickets…) → hidden → outcomes; `activeIndex` from the AI tabs re-routes pulses + highlights one output |
| `EcosystemScene.jsx` | `#platforms` | VIN core (logo billboard) + 6 platform nodes on a ring; click/tap selects, ring rotates the selection to the front; synced with the DOM tab list |

Shared: `utils.js` (`latLonToVec3`, `isCoarsePointer`, `prefersReducedMotion`, `createGlowMaterial` fresnel shader).

## Mount pattern (mandatory)
```jsx
const NeuralScene = lazy(() => import('../three/NeuralScene'));
<SceneMount scene={NeuralScene} fallback={<StaticGradient />} className="h-[380px]" {...props} />
```
`SceneMount` mounts the scene only near the viewport, passes `active` (in view) so the Canvas uses
`frameloop={active ? 'always' : 'never'}`, catches errors, and shows `fallback` when WebGL is unavailable.

## Rules
- Each scene is a default-exported component taking `active` and rendering its own `<Canvas>` with `dpr={[1, 1.75]}`, `gl={{ alpha: true }}`, and an `aria-label` + `role="img"`.
- Keep DOM controls as the accessible/primary UI (tabs beside the canvas); the 3D view mirrors that state via props.
- **No OrbitControls on coarse pointers** (`isCoarsePointer()`): it sets `touch-action: none` and blocks page scrolling on phones. Auto-rotate manually in `useFrame` instead.
- Respect `prefersReducedMotion()` — slow or stop auto motion.
- Don't allocate in `useFrame` (reuse `Vector3`/`Object3D` via `useMemo`). Use `instancedMesh` / `lineSegments` for many items.
- Colors: brand teal `#7CC4DA/#5AAFC8/#4588A0`, cyan `#67E8F9`, violet `#A78BFA`; platform colors come from `PLATFORMS[].color`.
- drei `<Html>` labels: **no `distanceFactor`** (made labels huge); offset with an inner `style.transform`; pass `occlude={[meshRef]}` when labels can go behind a body.
- Textures: only from `/brand/` (e.g. `useTexture('/brand/vin-mark.png')`); the mark needs a light disc behind it.

## Known gotchas (verified in this project)
1. drei `<Html>` rendered in the canvas's first commit may (intermittently) never appear → gate every label with `useLabelsReady()` from `utils.js`.
2. `instancedMesh.setColorAt` must run before the first render (in `useLayoutEffect`), or the material compiles without instance colors.
3. Additive fresnel glow at intensity > 1 / scale > 1.5 blows out (huge halos) — keep ≈ 0.9 / 1.45.
4. `THREE.Clock` deprecation warnings in the console come from R3F internals — harmless.
5. Headless Chrome needs `--use-angle=swiftshader --enable-unsafe-swiftshader` to render WebGL for screenshots.

## Verify
`npm run build` → confirm no `three` modulepreload in `dist/index.html` (`grep modulepreload dist/index.html`),
then screenshot the section on desktop and 390px mobile (`ui-verification`).
