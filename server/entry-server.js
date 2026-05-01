import React, { Children, cloneElement, createElement, forwardRef, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { VscCode, VscGraph, VscHistory, VscHome, VscMail, VscVscodeInsiders } from "react-icons/vsc";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";
import gsap$1, { gsap } from "gsap";
import { MdOutlineAutoGraph, MdSchool, MdWorkOutline } from "react-icons/md";
//#region src/components/Dock/Dock.tsx
var defaultSpring = {
	mass: .1,
	stiffness: 150,
	damping: 12
};
function DockItem({ icon, label, className = "", onClick, mouseX, spring, distance, magnification, baseItemSize }) {
	const ref = useRef(null);
	const labelHover = useMotionValue(0);
	const size = useSpring(useTransform(useTransform(mouseX, (val) => {
		return val - (ref.current?.getBoundingClientRect() ?? {
			x: 0,
			width: baseItemSize
		}).x - baseItemSize / 2;
	}), [
		-distance,
		0,
		distance
	], [
		baseItemSize,
		magnification,
		baseItemSize
	]), spring);
	return /* @__PURE__ */ jsxs(motion.div, {
		ref,
		style: {
			width: size,
			height: size
		},
		onHoverStart: () => labelHover.set(1),
		onHoverEnd: () => labelHover.set(0),
		onFocus: () => labelHover.set(1),
		onBlur: () => labelHover.set(0),
		onClick,
		className: `dock-item ${className}`,
		tabIndex: 0,
		role: "button",
		"aria-label": label,
		children: [/* @__PURE__ */ jsx(DockIcon, { children: icon }), /* @__PURE__ */ jsx(DockLabel, {
			isHovered: labelHover,
			children: label
		})]
	});
}
function DockLabel({ children, className = "", isHovered }) {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		const unsubscribe = isHovered.on("change", (latest) => {
			setIsVisible(latest === 1);
		});
		return () => unsubscribe();
	}, [isHovered]);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 0
		},
		animate: {
			opacity: 1,
			y: -10
		},
		exit: {
			opacity: 0,
			y: 0
		},
		transition: { duration: .2 },
		className: `dock-label ${className}`,
		role: "tooltip",
		children
	}) });
}
function DockIcon({ children, className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: `dock-icon ${className}`,
		children
	});
}
function Dock({ items, className = "", spring = defaultSpring, magnification = 70, distance = 200, panelHeight = 68, dockHeight = 256, baseItemSize = 50 }) {
	const mouseX = useMotionValue(Infinity);
	const panelHovered = useMotionValue(0);
	const height = useSpring(useTransform(panelHovered, [0, 1], [panelHeight, useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight])]), spring);
	return /* @__PURE__ */ jsx(motion.div, {
		style: {
			height,
			scrollbarWidth: "none"
		},
		className: "dock-outer",
		children: /* @__PURE__ */ jsx(motion.div, {
			onMouseMove: (e) => {
				panelHovered.set(1);
				mouseX.set(e.clientX);
			},
			onMouseLeave: () => {
				panelHovered.set(0);
				mouseX.set(Infinity);
			},
			className: `dock-panel ${className}`,
			style: { height: panelHeight },
			role: "toolbar",
			"aria-label": "Application dock",
			children: items.map((item, index) => /* @__PURE__ */ jsx(DockItem, {
				icon: item.icon,
				label: item.label,
				onClick: item.onClick,
				className: item.className,
				mouseX,
				spring,
				distance,
				magnification,
				baseItemSize
			}, index))
		})
	});
}
//#endregion
//#region src/assets/card.glb
var card_default = "/Projectprofile/assets/card-yCxUcYGg.glb";
//#endregion
//#region src/assets/lanyard.png
var lanyard_default = "/Projectprofile/assets/lanyard-5AIEfNxY.png";
//#endregion
//#region src/components/Lanyard/Lanyard.tsx
extend({
	MeshLineGeometry,
	MeshLineMaterial
});
function Lanyard({ position = [
	0,
	0,
	30
], gravity = [
	0,
	-40,
	0
], fov = 20, transparent = true }) {
	const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "lanyard-wrap",
		children: /* @__PURE__ */ jsxs(Canvas, {
			className: "lanyard-canvas",
			style: {
				width: "100%",
				height: "100%",
				touchAction: "none"
			},
			camera: {
				position,
				fov
			},
			dpr: [1, isMobile ? 1.25 : 1.5],
			gl: {
				alpha: transparent,
				antialias: true,
				powerPreference: "high-performance"
			},
			onCreated: ({ gl }) => gl.setClearColor(new THREE.Color(0), transparent ? 0 : 1),
			children: [
				/* @__PURE__ */ jsx("ambientLight", { intensity: Math.PI }),
				/* @__PURE__ */ jsx(Physics, {
					gravity,
					timeStep: isMobile ? 1 / 30 : 1 / 60,
					children: /* @__PURE__ */ jsx(Band, { isMobile })
				}),
				/* @__PURE__ */ jsxs(Environment, {
					blur: .75,
					children: [
						/* @__PURE__ */ jsx(Lightformer, {
							intensity: 2,
							color: "white",
							position: [
								0,
								-1,
								5
							],
							rotation: [
								0,
								0,
								Math.PI / 3
							],
							scale: [
								100,
								.1,
								1
							]
						}),
						/* @__PURE__ */ jsx(Lightformer, {
							intensity: 3,
							color: "white",
							position: [
								-1,
								-1,
								1
							],
							rotation: [
								0,
								0,
								Math.PI / 3
							],
							scale: [
								100,
								.1,
								1
							]
						}),
						/* @__PURE__ */ jsx(Lightformer, {
							intensity: 3,
							color: "white",
							position: [
								1,
								1,
								1
							],
							rotation: [
								0,
								0,
								Math.PI / 3
							],
							scale: [
								100,
								.1,
								1
							]
						}),
						/* @__PURE__ */ jsx(Lightformer, {
							intensity: 10,
							color: "white",
							position: [
								-10,
								0,
								14
							],
							rotation: [
								0,
								Math.PI / 2,
								Math.PI / 3
							],
							scale: [
								100,
								10,
								1
							]
						})
					]
				})
			]
		})
	});
}
function Band({ maxSpeed = 42, minSpeed = 0, isMobile = false }) {
	const { width, height } = useThree((s) => s.size);
	const camera = useThree((s) => s.camera);
	const band = useRef(null);
	const fixed = useRef(null);
	const j1 = useRef(null);
	const j2 = useRef(null);
	const j3 = useRef(null);
	const card = useRef(null);
	const vec = new THREE.Vector3();
	const ang = new THREE.Vector3();
	const rot = new THREE.Vector3();
	const dir = new THREE.Vector3();
	const dragTarget = new THREE.Vector3();
	const draggingRef = useRef(false);
	const dragDepthRef = useRef(0);
	const dragOffset = useRef(new THREE.Vector3());
	const segmentProps = {
		type: "dynamic",
		canSleep: true,
		colliders: false,
		angularDamping: 5.5,
		linearDamping: 5.5
	};
	const { nodes, materials } = useGLTF(card_default);
	const texture = useTexture(lanyard_default);
	const [curve] = useState(() => new THREE.CatmullRomCurve3([
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3(),
		new THREE.Vector3()
	]));
	const [dragging, setDragging] = useState(false);
	const [hovered, hover] = useState(false);
	useRopeJoint(fixed, j1, [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		1
	]);
	useRopeJoint(j1, j2, [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		1
	]);
	useRopeJoint(j2, j3, [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		1
	]);
	useSphericalJoint(j3, card, [[
		0,
		0,
		0
	], [
		0,
		1.5,
		0
	]]);
	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragging ? "grabbing" : "grab";
			return () => {
				document.body.style.cursor = "auto";
			};
		}
	}, [hovered, dragging]);
	useFrame((state, delta) => {
		const dt = Math.min(delta, 1 / 30);
		if (draggingRef.current && card.current) {
			const cam = state.camera;
			vec.set(state.pointer.x, state.pointer.y, .5).unproject(cam);
			dir.copy(vec).sub(cam.position).normalize();
			dragTarget.copy(cam.position).addScaledVector(dir, dragDepthRef.current);
			dragTarget.sub(dragOffset.current);
			card.current.setNextKinematicTranslation({
				x: dragTarget.x,
				y: dragTarget.y,
				z: dragTarget.z
			});
			[
				card,
				j1,
				j2,
				j3,
				fixed
			].forEach((ref) => ref.current?.wakeUp());
		}
		if (fixed.current && j1.current && j2.current && j3.current && card.current) {
			[j1, j2].forEach((ref) => {
				if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
				const clampedDistance = Math.max(.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
				const alpha = Math.min(1, dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
				ref.current.lerped.lerp(ref.current.translation(), alpha);
			});
			curve.points[0].copy(j3.current.translation());
			curve.points[1].copy(j2.current.lerped);
			curve.points[2].copy(j1.current.lerped);
			curve.points[3].copy(fixed.current.translation());
			band.current.geometry.setPoints(curve.getPoints(isMobile ? 20 : 36));
			if (!draggingRef.current) {
				ang.copy(card.current.angvel());
				rot.copy(card.current.rotation());
				card.current.setAngvel({
					x: ang.x,
					y: ang.y - rot.y * .12,
					z: ang.z
				});
			}
		}
	});
	curve.curveType = "chordal";
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("group", {
		position: [
			0,
			4,
			0
		],
		children: [
			/* @__PURE__ */ jsx(RigidBody, {
				ref: fixed,
				...segmentProps,
				type: "fixed"
			}),
			/* @__PURE__ */ jsx(RigidBody, {
				position: [
					.5,
					0,
					0
				],
				ref: j1,
				...segmentProps,
				children: /* @__PURE__ */ jsx(BallCollider, { args: [.1] })
			}),
			/* @__PURE__ */ jsx(RigidBody, {
				position: [
					1,
					0,
					0
				],
				ref: j2,
				...segmentProps,
				children: /* @__PURE__ */ jsx(BallCollider, { args: [.1] })
			}),
			/* @__PURE__ */ jsx(RigidBody, {
				position: [
					1.5,
					0,
					0
				],
				ref: j3,
				...segmentProps,
				children: /* @__PURE__ */ jsx(BallCollider, { args: [.1] })
			}),
			/* @__PURE__ */ jsxs(RigidBody, {
				position: [
					2,
					0,
					0
				],
				ref: card,
				...segmentProps,
				type: dragging ? "kinematicPosition" : "dynamic",
				children: [/* @__PURE__ */ jsx(CuboidCollider, { args: [
					.8,
					1.125,
					.01
				] }), /* @__PURE__ */ jsxs("group", {
					scale: 2.25,
					position: [
						0,
						-1.2,
						-.05
					],
					onPointerOver: () => hover(true),
					onPointerOut: () => hover(false),
					onPointerUp: (e) => {
						e.target.releasePointerCapture(e.pointerId);
						draggingRef.current = false;
						setDragging(false);
					},
					onPointerDown: (e) => {
						e.stopPropagation();
						e.target.setPointerCapture(e.pointerId);
						dragDepthRef.current = (e.camera ?? camera).position.distanceTo(e.point);
						dragOffset.current.copy(e.point).sub(vec.copy(card.current.translation()));
						draggingRef.current = true;
						setDragging(true);
					},
					children: [
						/* @__PURE__ */ jsx("mesh", {
							geometry: nodes.card.geometry,
							children: /* @__PURE__ */ jsx("meshPhysicalMaterial", {
								map: materials.base.map,
								"map-anisotropy": 16,
								clearcoat: isMobile ? 0 : 1,
								clearcoatRoughness: .15,
								roughness: .9,
								metalness: .8
							})
						}),
						/* @__PURE__ */ jsx("mesh", {
							geometry: nodes.clip.geometry,
							material: materials.metal,
							"material-roughness": .3
						}),
						/* @__PURE__ */ jsx("mesh", {
							geometry: nodes.clamp.geometry,
							material: materials.metal
						})
					]
				})]
			})
		]
	}), /* @__PURE__ */ jsxs("mesh", {
		ref: band,
		children: [/* @__PURE__ */ jsx("meshLineGeometry", {}), /* @__PURE__ */ jsx("meshLineMaterial", {
			color: "white",
			depthTest: false,
			resolution: [width, height],
			useMap: true,
			map: texture,
			repeat: [-4, 1],
			lineWidth: 1
		})]
	})] });
}
useGLTF.preload(card_default);
//#endregion
//#region src/components/Particles/Particles.tsx
var defaultColors = [
	"#ffffff",
	"#ffffff",
	"#ffffff"
];
var hexToRgb = (hex) => {
	hex = hex.replace(/^#/, "");
	if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
	const int = parseInt(hex, 16);
	return [
		(int >> 16 & 255) / 255,
		(int >> 8 & 255) / 255,
		(int & 255) / 255
	];
};
var vertex = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    
    gl_Position = projectionMatrix * mvPos;
  }
`;
var fragment = `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;
var Particles = ({ particleCount = 200, particleSpread = 10, speed = .1, particleColors, moveParticlesOnHover = false, particleHoverFactor = 1, alphaParticles = false, particleBaseSize = 100, sizeRandomness = 1, cameraDistance = 20, disableRotation = false, pixelRatio = 1, className }) => {
	const containerRef = useRef(null);
	const mouseRef = useRef({
		x: 0,
		y: 0
	});
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const renderer = new Renderer({
			dpr: pixelRatio,
			depth: false,
			alpha: true
		});
		const gl = renderer.gl;
		container.appendChild(gl.canvas);
		gl.clearColor(0, 0, 0, 0);
		const camera = new Camera(gl, { fov: 15 });
		camera.position.set(0, 0, cameraDistance);
		const resize = () => {
			const width = container.clientWidth;
			const height = container.clientHeight;
			renderer.setSize(width, height);
			camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
		};
		window.addEventListener("resize", resize, false);
		resize();
		const handleMouseMove = (e) => {
			const w = Math.max(window.innerWidth, 1);
			const h = Math.max(window.innerHeight, 1);
			mouseRef.current = {
				x: e.clientX / w * 2 - 1,
				y: -(e.clientY / h * 2 - 1)
			};
		};
		if (moveParticlesOnHover) window.addEventListener("mousemove", handleMouseMove, false);
		const count = particleCount;
		const positions = new Float32Array(count * 3);
		const randoms = new Float32Array(count * 4);
		const colors = new Float32Array(count * 3);
		const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;
		for (let i = 0; i < count; i++) {
			let x, y, z, len;
			do {
				x = Math.random() * 2 - 1;
				y = Math.random() * 2 - 1;
				z = Math.random() * 2 - 1;
				len = x * x + y * y + z * z;
			} while (len > 1 || len === 0);
			const r = Math.cbrt(Math.random());
			positions.set([
				x * r,
				y * r,
				z * r
			], i * 3);
			randoms.set([
				Math.random(),
				Math.random(),
				Math.random(),
				Math.random()
			], i * 4);
			const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
			colors.set(col, i * 3);
		}
		const geometry = new Geometry(gl, {
			position: {
				size: 3,
				data: positions
			},
			random: {
				size: 4,
				data: randoms
			},
			color: {
				size: 3,
				data: colors
			}
		});
		const program = new Program(gl, {
			vertex,
			fragment,
			uniforms: {
				uTime: { value: 0 },
				uSpread: { value: particleSpread },
				uBaseSize: { value: particleBaseSize * pixelRatio },
				uSizeRandomness: { value: sizeRandomness },
				uAlphaParticles: { value: alphaParticles ? 1 : 0 }
			},
			transparent: true,
			depthTest: false
		});
		const particles = new Mesh(gl, {
			mode: gl.POINTS,
			geometry,
			program
		});
		let animationFrameId;
		let lastTime = performance.now();
		let elapsed = 0;
		const update = (t) => {
			animationFrameId = requestAnimationFrame(update);
			const delta = t - lastTime;
			lastTime = t;
			elapsed += delta * speed;
			program.uniforms.uTime.value = elapsed * .001;
			if (moveParticlesOnHover) {
				particles.position.x = -mouseRef.current.x * particleHoverFactor;
				particles.position.y = -mouseRef.current.y * particleHoverFactor;
			} else {
				particles.position.x = 0;
				particles.position.y = 0;
			}
			if (!disableRotation) {
				particles.rotation.x = Math.sin(elapsed * 2e-4) * .1;
				particles.rotation.y = Math.cos(elapsed * 5e-4) * .15;
				particles.rotation.z += .01 * speed;
			}
			renderer.render({
				scene: particles,
				camera
			});
		};
		animationFrameId = requestAnimationFrame(update);
		return () => {
			window.removeEventListener("resize", resize);
			if (moveParticlesOnHover) window.removeEventListener("mousemove", handleMouseMove, false);
			cancelAnimationFrame(animationFrameId);
			if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
		};
	}, [
		particleCount,
		particleSpread,
		speed,
		moveParticlesOnHover,
		particleHoverFactor,
		alphaParticles,
		particleBaseSize,
		sizeRandomness,
		cameraDistance,
		disableRotation,
		pixelRatio
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: `particles-container ${className}`
	});
};
//#endregion
//#region src/components/TextType/TextType.tsx
var TextType = ({ text, as: Component = "div", typingSpeed = 50, initialDelay = 0, pauseDuration = 2e3, deletingSpeed = 30, loop = true, className = "", showCursor = true, hideCursorWhileTyping = false, cursorCharacter = "|", cursorClassName = "", cursorBlinkDuration = .5, textColors = [], variableSpeed, onSentenceComplete, startOnVisible = false, reverseMode = false, ...props }) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(!startOnVisible);
	const cursorRef = useRef(null);
	const containerRef = useRef(null);
	const textArray = useMemo(() => Array.isArray(text) ? text : [text], [text]);
	const getRandomSpeed = useCallback(() => {
		if (!variableSpeed) return typingSpeed;
		const { min, max } = variableSpeed;
		return Math.random() * (max - min) + min;
	}, [variableSpeed, typingSpeed]);
	useEffect(() => {
		if (!startOnVisible || !containerRef.current) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setIsVisible(true);
			});
		}, { threshold: .1 });
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [startOnVisible]);
	useEffect(() => {
		if (showCursor && cursorRef.current) {
			gsap.set(cursorRef.current, { opacity: 1 });
			gsap.to(cursorRef.current, {
				opacity: 0,
				duration: cursorBlinkDuration,
				repeat: -1,
				yoyo: true,
				ease: "power2.inOut"
			});
		}
	}, [showCursor, cursorBlinkDuration]);
	useEffect(() => {
		if (!isVisible) return;
		let timeout;
		const currentText = textArray[currentTextIndex];
		const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;
		const executeTypingAnimation = () => {
			if (isDeleting) if (displayedText === "") {
				setIsDeleting(false);
				if (currentTextIndex === textArray.length - 1 && !loop) return;
				if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
				setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
				setCurrentCharIndex(0);
				timeout = setTimeout(() => {}, pauseDuration);
			} else timeout = setTimeout(() => {
				setDisplayedText((prev) => prev.slice(0, -1));
			}, deletingSpeed);
			else if (currentCharIndex < processedText.length) timeout = setTimeout(() => {
				setDisplayedText((prev) => prev + processedText[currentCharIndex]);
				setCurrentCharIndex((prev) => prev + 1);
			}, variableSpeed ? getRandomSpeed() : typingSpeed);
			else if (textArray.length >= 1) {
				if (!loop && currentTextIndex === textArray.length - 1) return;
				timeout = setTimeout(() => {
					setIsDeleting(true);
				}, pauseDuration);
			}
		};
		if (currentCharIndex === 0 && !isDeleting && displayedText === "") timeout = setTimeout(executeTypingAnimation, initialDelay);
		else executeTypingAnimation();
		return () => clearTimeout(timeout);
	}, [
		currentCharIndex,
		displayedText,
		isDeleting,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		textArray,
		currentTextIndex,
		loop,
		initialDelay,
		isVisible,
		reverseMode,
		variableSpeed,
		onSentenceComplete
	]);
	const contentColorStyle = textColors.length > 0 ? { color: textColors[currentTextIndex % textColors.length] } : void 0;
	return createElement(Component, {
		ref: containerRef,
		className: `text-type ${className}`,
		...props
	}, /* @__PURE__ */ jsx("span", {
		className: "text-type__content",
		style: contentColorStyle,
		children: displayedText
	}));
};
//#endregion
//#region src/components/BorderGlow/BorderGlow.tsx
function parseHSL(hslStr) {
	const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
	if (!match) return {
		h: 40,
		s: 80,
		l: 80
	};
	return {
		h: parseFloat(match[1]),
		s: parseFloat(match[2]),
		l: parseFloat(match[3])
	};
}
function buildGlowVars(glowColor, intensity) {
	const { h, s, l } = parseHSL(glowColor);
	const base = `${h}deg ${s}% ${l}%`;
	const opacities = [
		100,
		60,
		50,
		40,
		30,
		20,
		10
	];
	const keys = [
		"",
		"-60",
		"-50",
		"-40",
		"-30",
		"-20",
		"-10"
	];
	const vars = {};
	for (let i = 0; i < opacities.length; i++) vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
	return vars;
}
var GRADIENT_POSITIONS = [
	"80% 55%",
	"69% 34%",
	"8% 6%",
	"41% 38%",
	"86% 85%",
	"82% 18%",
	"51% 4%"
];
var GRADIENT_KEYS = [
	"--gradient-one",
	"--gradient-two",
	"--gradient-three",
	"--gradient-four",
	"--gradient-five",
	"--gradient-six",
	"--gradient-seven"
];
var COLOR_MAP = [
	0,
	1,
	2,
	0,
	1,
	2,
	1
];
function buildGradientVars(colors) {
	const vars = {};
	for (let i = 0; i < 7; i++) {
		const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
		vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
	}
	vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
	return vars;
}
function easeOutCubic(x) {
	return 1 - Math.pow(1 - x, 3);
}
function easeInCubic(x) {
	return x * x * x;
}
function animateValue({ start = 0, end = 100, duration = 1e3, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
	const t0 = performance.now() + delay;
	function tick() {
		const elapsed = performance.now() - t0;
		const t = Math.min(elapsed / duration, 1);
		onUpdate(start + (end - start) * ease(t));
		if (t < 1) requestAnimationFrame(tick);
		else if (onEnd) onEnd();
	}
	setTimeout(() => requestAnimationFrame(tick), delay);
}
var BorderGlow = ({ children, className = "", edgeSensitivity = 30, glowColor = "40 80 80", backgroundColor = "#060010", borderRadius = 28, glowRadius = 40, glowIntensity = 1, coneSpread = 25, animated = false, colors = [
	"#c084fc",
	"#f472b6",
	"#38bdf8"
], fillOpacity = .5 }) => {
	const cardRef = useRef(null);
	const getCenterOfElement = useCallback((el) => {
		const { width, height } = el.getBoundingClientRect();
		return [width / 2, height / 2];
	}, []);
	const getEdgeProximity = useCallback((el, x, y) => {
		const [cx, cy] = getCenterOfElement(el);
		const dx = x - cx;
		const dy = y - cy;
		let kx = Infinity;
		let ky = Infinity;
		if (dx !== 0) kx = cx / Math.abs(dx);
		if (dy !== 0) ky = cy / Math.abs(dy);
		return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
	}, [getCenterOfElement]);
	const getCursorAngle = useCallback((el, x, y) => {
		const [cx, cy] = getCenterOfElement(el);
		const dx = x - cx;
		const dy = y - cy;
		if (dx === 0 && dy === 0) return 0;
		let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
		if (degrees < 0) degrees += 360;
		return degrees;
	}, [getCenterOfElement]);
	const handlePointerMove = useCallback((e) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const edge = getEdgeProximity(card, x, y);
		const angle = getCursorAngle(card, x, y);
		card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
		card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
	}, [getEdgeProximity, getCursorAngle]);
	useEffect(() => {
		if (!animated || !cardRef.current) return;
		const card = cardRef.current;
		const angleStart = 110;
		const angleEnd = 465;
		card.classList.add("sweep-active");
		card.style.setProperty("--cursor-angle", `${angleStart}deg`);
		animateValue({
			duration: 500,
			onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`)
		});
		animateValue({
			ease: easeInCubic,
			duration: 1500,
			end: 50,
			onUpdate: (v) => {
				card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
			}
		});
		animateValue({
			ease: easeOutCubic,
			delay: 1500,
			duration: 2250,
			start: 50,
			end: 100,
			onUpdate: (v) => {
				card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
			}
		});
		animateValue({
			ease: easeInCubic,
			delay: 2500,
			duration: 1500,
			start: 100,
			end: 0,
			onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`),
			onEnd: () => card.classList.remove("sweep-active")
		});
	}, [animated]);
	const glowVars = buildGlowVars(glowColor, glowIntensity);
	return /* @__PURE__ */ jsxs("div", {
		ref: cardRef,
		onPointerMove: handlePointerMove,
		className: `border-glow-card ${className}`,
		style: {
			"--card-bg": backgroundColor,
			"--edge-sensitivity": edgeSensitivity,
			"--border-radius": `${borderRadius}px`,
			"--glow-padding": `${glowRadius}px`,
			"--cone-spread": coneSpread,
			"--fill-opacity": fillOpacity,
			...glowVars,
			...buildGradientVars(colors)
		},
		children: [/* @__PURE__ */ jsx("span", { className: "edge-light" }), /* @__PURE__ */ jsx("div", {
			className: "border-glow-inner",
			children
		})]
	});
};
//#endregion
//#region src/components/CardSwap/CardSwap.tsx
var Card = forwardRef(({ customClass, ...rest }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	...rest,
	className: `card ${customClass ?? ""} ${rest.className ?? ""}`.trim()
}));
Card.displayName = "Card";
var makeSlot = (i, distX, distY, total) => ({
	x: i * distX,
	y: -i * distY,
	z: -i * distX * 1.5,
	zIndex: total - i
});
var placeNow = (el, slot, skew) => gsap$1.set(el, {
	x: slot.x,
	y: slot.y,
	z: slot.z,
	xPercent: -50,
	yPercent: -50,
	skewY: skew,
	transformOrigin: "center center",
	zIndex: slot.zIndex,
	force3D: true
});
var CardSwap = ({ width = 500, height = 400, cardDistance = 60, verticalDistance = 70, delay = 5e3, pauseOnHover = false, onCardClick, skewAmount = 6, easing = "elastic", onActiveChange, children }) => {
	const config = easing === "elastic" ? {
		ease: "elastic.out(0.6,0.9)",
		durDrop: 2,
		durMove: 2,
		durReturn: 2,
		promoteOverlap: .9,
		returnDelay: .05
	} : {
		ease: "power1.inOut",
		durDrop: .8,
		durMove: .8,
		durReturn: .8,
		promoteOverlap: .45,
		returnDelay: .2
	};
	const childArr = useMemo(() => Children.toArray(children), [children]);
	const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
	const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
	const tlRef = useRef(null);
	const intervalRef = useRef(0);
	const container = useRef(null);
	useEffect(() => {
		const total = refs.length;
		refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
		const swap = () => {
			if (order.current.length < 2) return;
			const [front, ...rest] = order.current;
			const elFront = refs[front].current;
			const tl = gsap$1.timeline();
			tlRef.current = tl;
			tl.to(elFront, {
				y: "+=500",
				duration: config.durDrop,
				ease: config.ease
			});
			tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
			rest.forEach((idx, i) => {
				const el = refs[idx].current;
				const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
				tl.set(el, { zIndex: slot.zIndex }, "promote");
				tl.to(el, {
					x: slot.x,
					y: slot.y,
					z: slot.z,
					duration: config.durMove,
					ease: config.ease
				}, `promote+=${i * .15}`);
			});
			const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
			tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
			tl.call(() => {
				gsap$1.set(elFront, { zIndex: backSlot.zIndex });
			}, void 0, "return");
			tl.to(elFront, {
				x: backSlot.x,
				y: backSlot.y,
				z: backSlot.z,
				duration: config.durReturn,
				ease: config.ease
			}, "return");
			tl.call(() => {
				order.current = [...rest, front];
				onActiveChange?.(order.current[0]);
			});
		};
		swap();
		intervalRef.current = window.setInterval(swap, delay);
		if (pauseOnHover) {
			const node = container.current;
			const pause = () => {
				tlRef.current?.pause();
				clearInterval(intervalRef.current);
			};
			const resume = () => {
				tlRef.current?.play();
				intervalRef.current = window.setInterval(swap, delay);
			};
			node.addEventListener("mouseenter", pause);
			node.addEventListener("mouseleave", resume);
			return () => {
				node.removeEventListener("mouseenter", pause);
				node.removeEventListener("mouseleave", resume);
				clearInterval(intervalRef.current);
			};
		}
		return () => clearInterval(intervalRef.current);
	}, [
		cardDistance,
		verticalDistance,
		delay,
		pauseOnHover,
		skewAmount,
		easing
	]);
	const rendered = childArr.map((child, i) => isValidElement(child) ? cloneElement(child, {
		key: i,
		ref: refs[i],
		style: {
			width: "100%",
			height: "100%",
			...child.props.style ?? {}
		},
		onClick: (e) => {
			child.props.onClick?.(e);
			onCardClick?.(i);
		}
	}) : child);
	return /* @__PURE__ */ jsx("div", {
		ref: container,
		className: "card-swap-container",
		style: {
			width,
			height
		},
		children: rendered
	});
};
//#endregion
//#region src/components/SkillColorStack/SkillColorStack.tsx
var SKILLS = [
	{
		name: "HTML",
		image: "/Projectprofile/assets/html-CWBimHzt.png"
	},
	{
		name: "CSS",
		image: "/Projectprofile/assets/css-CuE9_fvL.png"
	},
	{
		name: "JavaScript",
		image: "/Projectprofile/assets/javascript-CvOTt5FK.png"
	},
	{
		name: "React",
		image: "/Projectprofile/assets/react-D6H8nCoO.png"
	},
	{
		name: "Python",
		image: "/Projectprofile/assets/python-CQvBKBi8.png"
	},
	{
		name: "Java",
		image: "/Projectprofile/assets/java-LOiEYsw0.png"
	},
	{
		name: "SQL",
		image: "/Projectprofile/assets/sql-l8om-r1m.png"
	},
	{
		name: "MongoDB",
		image: "/Projectprofile/assets/mongoDB-BFSCFtPC.png"
	},
	{
		name: "Jupyter",
		image: "/Projectprofile/assets/jupyte-DKIdddQS.png"
	},
	{
		name: "Power BI",
		image: "/Projectprofile/assets/powerbi-BZT1ZuJp.png"
	},
	{
		name: "Git",
		image: "/Projectprofile/assets/git-BBRc2-hi.png"
	},
	{
		name: "Linux",
		image: "/Projectprofile/assets/linux-BWP7hQns.png"
	},
	{
		name: "VS Code",
		image: "/Projectprofile/assets/vscode-CYQHwi_I.png"
	}
];
function SkillColorStack() {
	return /* @__PURE__ */ jsx("div", {
		className: "skills-stack",
		children: /* @__PURE__ */ jsx("div", {
			className: "skills-stack__items",
			children: SKILLS.map((skill) => /* @__PURE__ */ jsx("button", {
				className: "skills-stack__item",
				"aria-label": skill.name,
				type: "button",
				children: /* @__PURE__ */ jsx("img", {
					src: skill.image,
					alt: "",
					className: "skills-stack__image"
				})
			}, skill.name))
		})
	});
}
//#endregion
//#region src/components/GrowthJourney/GrowthJourney.tsx
var JOURNEY = [
	{
		period: "June 2020 - May 2021",
		title: "SSC",
		place: "Narayana E-Techno School",
		detail: "Completed Secondary School Certificate with 10/10 CGPA.",
		type: "education"
	},
	{
		period: "June 2021 - April 2023",
		title: "Intermediate - MPC",
		place: "Narayana Junior College",
		detail: "Completed MPC stream with CGPA 8.7/10.",
		type: "education"
	},
	{
		period: "Aug 2023",
		title: "B.Tech CSE (Data Science)",
		place: "Undergraduate Program",
		detail: "Pursuing Computer Science Engineering with Data Science specialization. Current CGPA: 8.7/10.",
		type: "education"
	},
	{
		period: "Aug 2024 - Sept 2024",
		title: "Android Developer Intern",
		place: "DevElet Company",
		detail: "Worked as an Android Developer intern, gaining practical development experience.",
		type: "experience"
	}
];
function GrowthJourney() {
	return /* @__PURE__ */ jsx("div", {
		className: "growth-timeline",
		children: JOURNEY.map((item) => {
			const Icon = item.type === "experience" ? MdWorkOutline : MdSchool;
			return /* @__PURE__ */ jsxs("div", {
				className: "growth-timeline__item",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "growth-timeline__period",
						children: item.period
					}),
					/* @__PURE__ */ jsx("div", {
						className: "growth-timeline__marker",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx(Icon, { size: 26 })
					}),
					/* @__PURE__ */ jsxs("article", {
						className: "growth-timeline__card",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "growth-timeline__title",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "growth-timeline__meta",
								children: item.place
							}),
							/* @__PURE__ */ jsx("p", {
								className: "growth-timeline__detail",
								children: item.detail
							})
						]
					})
				]
			}, `${item.period}-${item.title}`);
		})
	});
}
//#endregion
//#region src/components/AchievementStack/AchievementStack.tsx
var ACHIEVEMENTS = [
	{
		title: "Blitz Cohort",
		label: "Highlights",
		desc: "Completed startup Mentorship Program From ideation to MVP, working on Buddy through the BlitZ Startup Program from T-Hub has been an incredible experience, led a team TEAM : Buddy",
		image: "/Projectprofile/assets/blitz-Do3A1NNB.jpg",
		href: "https://www.linkedin.com/posts/mushkerohithreddy_startups-innovation-skills-activity-7241838610717560832-0uCH"
	},
	{
		title: "Winner",
		label: "Highlights",
		desc: "MRCET Startup Competition secured first place among 30+ teams,pitched Credit card leaning platform ",
		image: "/Projectprofile/assets/start-w9lCFCwm.jpg",
		href: "https://www.linkedin.com/posts/mushkerohithreddy_startup-innovation-onemanshow-activity-7226873749101264896-r7S8"
	},
	{
		title: "Core Team Member",
		label: "Highlights",
		desc: "Part of Organizing committee, Organized GDG Internal Hackathon with 800+ participants with a team of 30 members",
		image: "/Projectprofile/assets/gdg-CPAwlxbf.jpeg",
		href: "https://www.linkedin.com/posts/mushkerohithreddy_gdg-recon2root-teamwork-activity-7455554205316067328-RPNC"
	}
];
function AchievementStack() {
	return /* @__PURE__ */ jsx("div", {
		className: "achievement-stack",
		children: ACHIEVEMENTS.map((achievement) => /* @__PURE__ */ jsxs("article", {
			className: "achievement-stack__card",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "achievement-stack__content",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "achievement-stack__title",
					children: achievement.title
				}), /* @__PURE__ */ jsx("p", {
					className: "achievement-stack__desc",
					children: achievement.desc
				})]
			}), /* @__PURE__ */ jsxs("a", {
				className: "achievement-stack__link",
				href: achievement.href,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": `Open LinkedIn post for ${achievement.title}`,
				children: [/* @__PURE__ */ jsx("img", {
					src: achievement.image,
					alt: achievement.title,
					className: "achievement-stack__image"
				}), /* @__PURE__ */ jsx("span", {
					className: "achievement-stack__cta",
					children: "Highlights"
				})]
			})]
		}, achievement.title))
	});
}
//#endregion
//#region src/components/TiltedCard/TiltedCard.tsx
var springValues = {
	damping: 30,
	stiffness: 100,
	mass: 2
};
function TiltedCard({ imageSrc, altText = "Tilted card image", captionText = "", containerHeight = "300px", containerWidth = "100%", imageHeight = "300px", imageWidth = "300px", scaleOnHover = 1.1, rotateAmplitude = 14, showMobileWarning = true, showTooltip = true, overlayContent = null, displayOverlayContent = false, className = "" }) {
	const ref = useRef(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useMotionValue(0), springValues);
	const rotateY = useSpring(useMotionValue(0), springValues);
	const scale = useSpring(1, springValues);
	const opacity = useSpring(0);
	const rotateFigcaption = useSpring(0, {
		stiffness: 350,
		damping: 30,
		mass: 1
	});
	const [lastY, setLastY] = useState(0);
	function handleMouse(e) {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;
		rotateX.set(offsetY / (rect.height / 2) * -rotateAmplitude);
		rotateY.set(offsetX / (rect.width / 2) * rotateAmplitude);
		x.set(e.clientX - rect.left);
		y.set(e.clientY - rect.top);
		const velocityY = offsetY - lastY;
		rotateFigcaption.set(-velocityY * .6);
		setLastY(offsetY);
	}
	function handleMouseEnter() {
		scale.set(scaleOnHover);
		opacity.set(1);
	}
	function handleMouseLeave() {
		opacity.set(0);
		scale.set(1);
		rotateX.set(0);
		rotateY.set(0);
		rotateFigcaption.set(0);
	}
	return /* @__PURE__ */ jsxs("figure", {
		ref,
		className: `tilted-card-figure ${className}`.trim(),
		style: {
			height: containerHeight,
			width: containerWidth
		},
		onMouseMove: handleMouse,
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		children: [
			showMobileWarning && /* @__PURE__ */ jsx("div", {
				className: "tilted-card-mobile-alert",
				children: "This effect is not optimized for mobile. Check on desktop."
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "tilted-card-inner",
				style: {
					width: imageWidth,
					height: imageHeight,
					rotateX,
					rotateY,
					scale
				},
				children: [/* @__PURE__ */ jsx(motion.img, {
					src: imageSrc,
					alt: altText,
					className: "tilted-card-img",
					style: {
						width: imageWidth,
						height: imageHeight
					}
				}), displayOverlayContent && overlayContent && /* @__PURE__ */ jsx(motion.div, {
					className: "tilted-card-overlay",
					children: overlayContent
				})]
			}),
			showTooltip && /* @__PURE__ */ jsx(motion.figcaption, {
				className: "tilted-card-caption",
				style: {
					x,
					y,
					opacity,
					rotate: rotateFigcaption
				},
				children: captionText
			})
		]
	});
}
//#endregion
//#region src/assets/gate.png
var gate_default = "/Projectprofile/assets/gate-DQi7ETWq.png";
//#endregion
//#region src/assets/github.png
var github_default = "/Projectprofile/assets/github-DOqpT8Iq.png";
//#endregion
//#region src/assets/linkdin.png
var linkdin_default = "/Projectprofile/assets/linkdin-pFjxm4Vv.png";
//#endregion
//#region src/assets/mail.png
var mail_default = "/Projectprofile/assets/mail-DxHRGQ8W.png";
//#endregion
//#region src/assets/movie.png
var movie_default = "/Projectprofile/assets/movie--kGaaaFY.png";
//#endregion
//#region src/assets/news.png
var news_default = "/Projectprofile/assets/news-D-6fOXq2.png";
//#endregion
//#region src/assets/resume.png
var resume_default = "/Projectprofile/assets/resume-Bk0p6G6l.png";
//#endregion
//#region src/App.tsx
var GITHUB_USERNAME = "byrohithreddy";
var CONTACT_LINKS = [
	{
		label: "rohith2005hyd@gmail.com",
		value: "Connect through email",
		href: "mailto:rohith2005hyd@gmail.com",
		image: mail_default
	},
	{
		label: ".in/mushkerohithreddy",
		value: "Professional updates",
		href: "https://www.linkedin.com/in/mushkerohithreddy",
		image: linkdin_default
	},
	{
		label: "byrohithreddy",
		value: `github.com/${GITHUB_USERNAME}`,
		href: `https://github.com/${GITHUB_USERNAME}`,
		image: github_default
	},
	{
		label: "Resume",
		value: "View resume",
		href: "https://drive.google.com/file/d/1XuxZFqS5P0K7mLmBOE0U9dFBw7w_gT5b/view?usp=sharing",
		image: resume_default
	}
];
var PROJECTS = [
	{
		title: "Fake News Detector (NLP)",
		github: "https://github.com/byrohithreddy/Fake_news_detector_NLP",
		live: "https://byrohithreddy-fake-news-detector.hf.space/",
		desc: "NLP classifier using TF-IDF, Logistic Regression & Random Forest achieving 85%+ accuracy. Features an interactive Gradio interface for real-time predictions with a full preprocessing pipeline including tokenization and feature engineering.",
		tags: [
			"Python",
			"NLP",
			"Gradio",
			"ML",
			"TF-IDF"
		],
		image: news_default
	},
	{
		title: "Movie Recommendation System",
		github: "https://github.com/byrohithreddy/Movie_recommendation_system",
		live: "https://byrohithreddy-movie-recommendation-system.hf.space/",
		desc: "Content-based movie recommendation engine using cosine similarity on TF-IDF vectors. Deployed on Hugging Face Spaces with an interactive interface to discover similar movies instantly.",
		tags: [
			"Python",
			"NLP",
			"Numpy",
			"Scikit-learn"
		],
		image: movie_default
	},
	{
		title: "E-Gatepass Management System",
		github: "https://github.com/byrohithreddy/Epass-management-system",
		live: "https://byrohithreddy.github.io/Epass-management-system/",
		desc: "Full-stack web application with role-based access control and barcode-based verification. Features a responsive dashboard for real-time monitoring, reporting, and student gatepass management.",
		tags: [
			"React",
			"Node.js",
			"Barcode",
			"Full-Stack"
		],
		image: gate_default
	}
];
function ProjectPanel({ project, visible }) {
	const [rendered, setRendered] = useState(visible);
	const [active, setActive] = useState(visible);
	useEffect(() => {
		if (visible) {
			setRendered(true);
			const t = setTimeout(() => setActive(true), 20);
			return () => clearTimeout(t);
		} else {
			setActive(false);
			const t = setTimeout(() => setRendered(false), 500);
			return () => clearTimeout(t);
		}
	}, [visible]);
	if (!rendered) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: `project-panel ${active ? "project-panel--in" : "project-panel--out"}`,
		children: [
			/* @__PURE__ */ jsx("a", {
				href: project.github,
				target: "_blank",
				rel: "noreferrer",
				className: "project-panel-title",
				children: project.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "project-panel-desc",
				children: project.desc
			}),
			/* @__PURE__ */ jsx("div", {
				className: "project-panel-tags",
				children: project.tags.map((tag) => /* @__PURE__ */ jsx("span", {
					className: "project-tag",
					children: tag
				}, tag))
			}),
			/* @__PURE__ */ jsxs("a", {
				href: project.github,
				target: "_blank",
				rel: "noreferrer",
				className: "project-btn",
				children: ["GitHub Repo ", /* @__PURE__ */ jsx(VscVscodeInsiders, { size: 20 })]
			})
		]
	});
}
function App() {
	const [repos, setRepos] = useState(null);
	const [username, setUsername] = useState("");
	const [activeProject, setActiveProject] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		setIsMobile(window.innerWidth <= 900);
		const handleResize = () => setIsMobile(window.innerWidth <= 900);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then((res) => res.json()).then((data) => {
			setRepos(data.public_repos);
			setUsername(data.login);
		});
	}, []);
	const digits = repos !== null ? repos.toString().padStart(3, "0").split("") : [
		"·",
		"·",
		"·"
	];
	const dockItems = [
		{
			icon: /* @__PURE__ */ jsx(VscHome, { size: 18 }),
			label: "Home",
			onClick: () => window.scrollTo({
				top: 0,
				behavior: "smooth"
			})
		},
		{
			icon: /* @__PURE__ */ jsx(VscCode, { size: 18 }),
			label: "Projects",
			onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
		},
		{
			icon: /* @__PURE__ */ jsx(MdOutlineAutoGraph, { size: 18 }),
			label: "Skills",
			onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
		},
		{
			icon: /* @__PURE__ */ jsx(VscHistory, { size: 18 }),
			label: "Growth",
			onClick: () => document.getElementById("growth-journey")?.scrollIntoView({ behavior: "smooth" })
		},
		{
			icon: /* @__PURE__ */ jsx(VscGraph, { size: 18 }),
			label: "Achievements",
			onClick: () => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" })
		},
		{
			icon: /* @__PURE__ */ jsx(VscMail, { size: 18 }),
			label: "Contact",
			onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "app",
		children: [
			/* @__PURE__ */ jsx(Particles, {
				className: "particles-bg",
				particleColors: [
					"#c084fc",
					"#a78bfa",
					"#e9d5ff"
				],
				particleCount: 200,
				particleSpread: 10,
				speed: .1,
				particleBaseSize: 100,
				moveParticlesOnHover: true,
				alphaParticles: false,
				disableRotation: false,
				pixelRatio: 1
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hero-frame",
				children: [/* @__PURE__ */ jsx(Lanyard, {
					position: [
						3,
						0,
						12
					],
					gravity: [
						0,
						-40,
						0
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "text-panel",
					children: [
						/* @__PURE__ */ jsx(TextType, {
							className: "hero",
							text: ["Mushke Rohith Reddy"],
							typingSpeed: 30,
							initialDelay: 1e3,
							pauseDuration: 1e3,
							showCursor: true,
							cursorCharacter: "|",
							deletingSpeed: 0,
							variableSpeed: {
								min: 40,
								max: 90
							},
							cursorBlinkDuration: .55,
							loop: false
						}),
						/* @__PURE__ */ jsx(TextType, {
							className: "hero-subtext",
							text: ["Data Science undergraduate with experience in developing and deploying machine learning solutions, including NLP-based classification and recommendation systems. Proficient in Python, data analysis, and model building, with a focus on real-world applications and scalable solutions. Passionate about solving problems using data-driven approaches."],
							typingSpeed: 30,
							initialDelay: 4e3,
							pauseDuration: 3200,
							showCursor: true,
							cursorCharacter: "|",
							deletingSpeed: 0,
							variableSpeed: {
								min: 40,
								max: 90
							},
							cursorBlinkDuration: .55,
							loop: false
						}),
						/* @__PURE__ */ jsx(BorderGlow, {
							edgeSensitivity: 30,
							glowColor: "40 80 80",
							backgroundColor: "transparent",
							borderRadius: 28,
							glowRadius: 40,
							glowIntensity: 4,
							coneSpread: 25,
							animated: false,
							colors: [
								"#c084fc",
								"#f472b6",
								"#38bdf8"
							],
							children: /* @__PURE__ */ jsxs("div", {
								style: {
									padding: "1.75em 2em",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "2rem"
								},
								children: [
									/* @__PURE__ */ jsxs("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: "0.5rem"
										},
										children: [/* @__PURE__ */ jsx("div", {
											style: {
												display: "flex",
												gap: "6px"
											},
											children: digits.map((d, i) => /* @__PURE__ */ jsx("div", {
												className: "gh-digit",
												children: d
											}, i))
										}), /* @__PURE__ */ jsx("div", {
											style: {
												fontSize: "0.7rem",
												color: "rgba(255, 255, 255, 0.66)",
												letterSpacing: "0.15em",
												textTransform: "uppercase"
											},
											children: "Repositories"
										})]
									}),
									/* @__PURE__ */ jsx("div", { style: {
										width: "1px",
										height: "60px",
										background: "rgba(255, 255, 255, 1)"
									} }),
									/* @__PURE__ */ jsxs("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											alignItems: "flex-start",
											gap: "0.3rem"
										},
										children: [/* @__PURE__ */ jsxs("div", {
											className: "gh-username",
											children: ["@", username || GITHUB_USERNAME]
										}), /* @__PURE__ */ jsxs("a", {
											href: `https://github.com/${GITHUB_USERNAME}`,
											target: "_blank",
											rel: "noreferrer",
											className: "gh-url",
											children: ["github.com/", GITHUB_USERNAME]
										})]
									})
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "Projects",
				id: "projects",
				children: [/* @__PURE__ */ jsx(TextType, {
					className: "heading",
					text: ["Projects"],
					typingSpeed: 10,
					initialDelay: 1e3,
					pauseDuration: 1e3,
					showCursor: true,
					cursorCharacter: "|",
					variableSpeed: {
						min: 40,
						max: 90
					},
					cursorBlinkDuration: .55,
					loop: false,
					startOnVisible: true
				}), isMobile ? /* @__PURE__ */ jsx("div", {
					className: "projects-mobile-layout",
					children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxs("div", {
						className: "mobile-project-item",
						children: [/* @__PURE__ */ jsxs("a", {
							href: p.live,
							target: "_blank",
							rel: "noreferrer",
							className: "mobile-project-img-link",
							children: [/* @__PURE__ */ jsx("img", {
								src: p.image,
								alt: p.title,
								className: "mobile-project-img"
							}), /* @__PURE__ */ jsx("div", {
								className: "mobile-project-img-overlay",
								children: /* @__PURE__ */ jsx("span", { children: "View Live →" })
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mobile-project-info",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: p.github,
									target: "_blank",
									rel: "noreferrer",
									className: "project-panel-title",
									children: p.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "project-panel-desc",
									children: p.desc
								}),
								/* @__PURE__ */ jsx("div", {
									className: "project-panel-tags",
									children: p.tags.map((tag) => /* @__PURE__ */ jsx("span", {
										className: "project-tag",
										children: tag
									}, tag))
								}),
								/* @__PURE__ */ jsxs("a", {
									href: p.github,
									target: "_blank",
									rel: "noreferrer",
									className: "project-btn",
									children: ["GitHub Repo ", /* @__PURE__ */ jsx(VscVscodeInsiders, { size: 20 })]
								})
							]
						})]
					}, i))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "projects-layout",
					children: [/* @__PURE__ */ jsx("div", {
						className: "projects-info",
						children: PROJECTS.map((p, i) => /* @__PURE__ */ jsx(ProjectPanel, {
							project: p,
							visible: activeProject === i
						}, i))
					}), /* @__PURE__ */ jsx(CardSwap, {
						width: 620,
						height: 390,
						cardDistance: 52,
						verticalDistance: 50,
						delay: 5e3,
						pauseOnHover: true,
						skewAmount: 6,
						onActiveChange: setActiveProject,
						children: PROJECTS.map((p, i) => /* @__PURE__ */ jsx(Card, {
							customClass: "project-card",
							children: /* @__PURE__ */ jsxs("a", {
								href: p.live,
								target: "_blank",
								rel: "noreferrer",
								className: "project-card-img-link",
								children: [/* @__PURE__ */ jsx("img", {
									src: p.image,
									alt: p.title,
									className: "project-card-img"
								}), /* @__PURE__ */ jsx("div", {
									className: "project-card-img-overlay",
									children: /* @__PURE__ */ jsx("span", { children: "View Live →" })
								})]
							})
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "skills",
				id: "skills",
				children: [/* @__PURE__ */ jsx(TextType, {
					className: "heading",
					text: ["Skills"],
					typingSpeed: 10,
					initialDelay: 1e3,
					pauseDuration: 1e3,
					showCursor: true,
					cursorCharacter: "|",
					variableSpeed: {
						min: 40,
						max: 90
					},
					cursorBlinkDuration: .55,
					loop: false,
					startOnVisible: true
				}), /* @__PURE__ */ jsx(SkillColorStack, {})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "growth-journey",
				id: "growth-journey",
				children: [/* @__PURE__ */ jsx(TextType, {
					className: "heading",
					text: ["Growth Journey"],
					typingSpeed: 10,
					initialDelay: 1e3,
					pauseDuration: 1e3,
					showCursor: true,
					cursorCharacter: "|",
					variableSpeed: {
						min: 40,
						max: 90
					},
					cursorBlinkDuration: .55,
					loop: false,
					startOnVisible: true
				}), /* @__PURE__ */ jsx(GrowthJourney, {})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "achievements",
				id: "achievements",
				children: [/* @__PURE__ */ jsx(TextType, {
					className: "heading",
					text: ["Achievements"],
					typingSpeed: 10,
					initialDelay: 1e3,
					pauseDuration: 1e3,
					showCursor: true,
					cursorCharacter: "|",
					variableSpeed: {
						min: 40,
						max: 90
					},
					cursorBlinkDuration: .55,
					loop: false,
					startOnVisible: true
				}), /* @__PURE__ */ jsx(AchievementStack, {})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "contact",
				id: "contact",
				children: [/* @__PURE__ */ jsx(TextType, {
					className: "heading",
					text: ["Contact"],
					typingSpeed: 10,
					initialDelay: 1e3,
					pauseDuration: 1e3,
					showCursor: true,
					cursorCharacter: "|",
					variableSpeed: {
						min: 40,
						max: 90
					},
					cursorBlinkDuration: .55,
					loop: false,
					startOnVisible: true
				}), /* @__PURE__ */ jsx("div", {
					className: "contact-grid",
					children: CONTACT_LINKS.map((link) => /* @__PURE__ */ jsx("a", {
						className: "contact-card-link",
						href: link.href,
						target: "_blank",
						rel: "noreferrer",
						children: /* @__PURE__ */ jsx(TiltedCard, {
							imageSrc: link.image,
							altText: `${link.label} contact card`,
							captionText: link.label,
							className: `contact-tilted-card contact-tilted-card--${link.label.toLowerCase()}`,
							containerHeight: "220px",
							containerWidth: "100%",
							imageHeight: "220px",
							imageWidth: "100%",
							rotateAmplitude: 18,
							scaleOnHover: 1.04,
							showMobileWarning: false,
							showTooltip: true,
							displayOverlayContent: true,
							overlayContent: /* @__PURE__ */ jsx("div", { className: "contact-card" })
						})
					}, link.label))
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "dock-root",
				children: /* @__PURE__ */ jsx(Dock, {
					items: dockItems,
					panelHeight: 68,
					baseItemSize: 50,
					magnification: 70
				})
			})
		]
	});
}
//#endregion
//#region src/entry-server.tsx
function render() {
	return { html: renderToString(/* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })) };
}
//#endregion
export { render };
