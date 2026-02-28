import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { type Container, type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        // Loads the slim version of tsparticles to keep the bundle size small
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log("Particles loaded", container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            className="absolute inset-0 z-[-40] pointer-events-none"
            options={{
                fullScreen: { enable: false },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "slow",
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        slow: {
                            factor: 3,
                            radius: 200,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ffffff", "#818cf8", "#c084fc"], // Premium white/purple tint
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false, // Turned off links for a cleaner "space dust" or "snow" look rather than a messy web
                        opacity: 0.1,
                        width: 1,
                    },
                    move: {
                        direction: "top", // Slowly floating upwards like embers/dust
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.3, // Extremely slow to feel premium and cinematic, not distracting
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080,
                        },
                        value: 80, // Not too many to clog the screen
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false,
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
