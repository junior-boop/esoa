import { React_Container } from "./React_UI";

interface HeroHeaderProps {
    label?: string;
    title: string;
    imageSrc: string;
    imageAlt?: string;
}

export function HeroHeader({ label, title, imageSrc, imageAlt = '' }: HeroHeaderProps) {
    return (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 50vw, 580px)' }}>
            {/* Background image */}
            <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                draggable={false}
            />

            {/* Subtle dark overlay */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #EFF2F6 0%, rgba(0,0,0,0.08) 100%)' }}
            />

            {/* Bottom-left text */}
            <div className="absolute bottom-0 left-0 px-2 sm:px-10 lg:px-16 pb-8 sm:pb-12  w-full">
                <React_Container>
                    {label && (
                        <p className="inter text-black text-sm sm:text-sm font-semibold uppercase tracking-widest">
                            {label}
                        </p>
                    )}
                    <h1 className="bebas-neue-regular text-black leading-none"
                        style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}>
                        {title}
                    </h1>
                </React_Container>
            </div>
        </div>
    );
}
