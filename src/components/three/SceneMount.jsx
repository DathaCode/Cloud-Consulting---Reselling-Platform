import React, { Component, Suspense, useMemo } from 'react';
import { useInView } from '../../hooks/useInView';

const hasWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
        return false;
    }
};

class SceneErrorBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}

/**
 * Mounts a (lazy) 3D scene only once it nears the viewport, and tells it whether it
 * is currently visible so it can pause rendering. Falls back when WebGL is unavailable.
 */
const SceneMount = ({ scene: Scene, fallback = null, className = '', ...sceneProps }) => {
    const { ref, inView, seen } = useInView();
    const supported = useMemo(() => typeof window !== 'undefined' && hasWebGL(), []);

    return (
        <div ref={ref} className={className}>
            {supported && seen ? (
                <SceneErrorBoundary fallback={fallback}>
                    <Suspense fallback={fallback}>
                        <Scene active={inView} {...sceneProps} />
                    </Suspense>
                </SceneErrorBoundary>
            ) : (
                fallback
            )}
        </div>
    );
};

export default SceneMount;
