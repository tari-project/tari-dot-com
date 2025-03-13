'use client';

import React, { useEffect, useRef } from 'react';
import { GradientCanvas, Wrapper } from './styles';

const GradientBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateCanvasSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
        };

        updateCanvasSize();

        const gl = canvas.getContext('webgl', {
            preserveDrawingBuffer: true,
            antialias: true,
        });

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        const vertexShader = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying vec2 vTextureCoord;

      void main() {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

        const fragmentShader = `
      precision highp float;
      varying vec2 vTextureCoord;
      uniform float uTime;

      float random(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float blob(vec2 uv, vec2 center, float radius, float softness) {
        float d = length(uv - center);
        return smoothstep(radius + softness, radius - softness, d);
      }

      void main() {
        vec2 uv = vTextureCoord;
        float t = uTime * 0.3;
        
        vec2 uv1 = uv + vec2(sin(t * 0.5) * 0.2, cos(t * 0.3) * 0.1);
        float g1 = length(uv1 - 0.5) * 0.8;
        
        vec2 uv2 = uv + vec2(cos(t * 0.4) * 0.1, sin(t * 0.6) * 0.2);
        float g2 = length(uv2 - 0.5) * 1.2;
        
        vec2 uv3 = uv + vec2(sin(t * 0.7) * 0.15, cos(t * 0.5) * 0.15);
        float g3 = length(uv3 - 0.5);

        vec2 blob1Center = vec2(
          0.8 + sin(t * 0.4) * 0.25,
          0.15 + cos(t * 0.5) * 0.2
        );
        float blob1 = blob(uv, blob1Center, 0.22, 0.14);

        vec2 blob2Center = vec2(
          0.2 + cos(t * 0.3) * 0.25,
          0.25 + sin(t * 0.6) * 0.2
        );
        float blob2 = blob(uv, blob2Center, 0.28, 0.17);

        vec3 color1 = vec3(0.15, 0.12, 0.1);
        vec3 color2 = vec3(0.08, 0.1, 0.08);
        vec3 color3 = vec3(0.05, 0.05, 0.05);
        vec3 blobColor1 = vec3(0.25, 0.22, 0.19);
        vec3 blobColor2 = vec3(0.19, 0.21, 0.18);

        float bottomEdge = smoothstep(0.8, 0.4, uv.y);
        vec3 bottomColor = vec3(0.0627, 0.0627, 0.0627);

        vec3 baseColor = mix(
          mix(color1, color2, g1),
          color3,
          mix(g2, g3, 0.5)
        );

        vec3 finalColor = mix(baseColor, blobColor1, blob1 * 0.6);
        finalColor = mix(finalColor, blobColor2, blob2 * 0.5);
        finalColor = mix(bottomColor, finalColor, bottomEdge);

        vec2 seed = gl_FragCoord.xy;
        float noise = (random(seed) - 0.5) * 0.015;
        finalColor += vec3(noise);

        gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
      }
    `;

        const createShader = (type: number, source: string): WebGLShader | null => {
            const shader = gl.createShader(type);
            if (!shader) return null;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertShader = createShader(gl.VERTEX_SHADER, vertexShader);
        const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);

        if (!vertShader || !fragShader) {
            console.error('Failed to create shaders');
            return;
        }

        const program = gl.createProgram();
        if (!program) {
            console.error('Failed to create program');
            return;
        }

        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }

        const positions = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]);

        const textureCoordinates = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);

        const positionBuffer = gl.createBuffer();
        const texCoordBuffer = gl.createBuffer();

        if (!positionBuffer || !texCoordBuffer) {
            console.error('Failed to create buffers');
            return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'aVertexPosition');
        const texcoordLocation = gl.getAttribLocation(program, 'aTextureCoord');
        const timeLocation = gl.getUniformLocation(program, 'uTime');

        const startTime = Date.now();

        const render = () => {
            updateCanvasSize();

            gl.viewport(0, 0, canvas.width, canvas.height);

            const time = (Date.now() - startTime) * 0.001;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);

            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(texcoordLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(timeLocation, time);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationFrameRef.current = requestAnimationFrame(render);
        };

        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener('resize', handleResize);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameRef.current);
            gl.deleteProgram(program);
            gl.deleteShader(vertShader);
            gl.deleteShader(fragShader);
            gl.deleteBuffer(positionBuffer);
            gl.deleteBuffer(texCoordBuffer);
        };
    }, []);

    return (
        <Wrapper>
            <GradientCanvas ref={canvasRef} />
        </Wrapper>
    );
};

export default GradientBackground;
