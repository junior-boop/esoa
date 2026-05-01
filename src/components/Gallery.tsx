
import { useState, useRef } from 'react';

import img1 from '../assets/image/image-import-18.jpg';
import img2 from '../assets/image/image-import-22.jpg';
import img3 from '../assets/image/image-import-25.jpg';
import img4 from '../assets/image/rec_1.png';
import img5 from '../assets/image/rec_2.png';

const defaultImages = [
    { src: img1.src, alt: 'Centre 1' },
    { src: img2.src, alt: 'Centre 2' },
    { src: img3.src, alt: 'Centre 3' },
    { src: img4.src, alt: 'Centre 4' },
    { src: img5.src, alt: 'Centre 5' },
    { src: img3.src, alt: 'Centre 3' },
    { src: img4.src, alt: 'Centre 4' },
    { src: img5.src, alt: 'Centre 5' },
    { src: img3.src, alt: 'Centre 3' },
    { src: img4.src, alt: 'Centre 4' },
    { src: img5.src, alt: 'Centre 5' },
];

interface GalleryImage {
    src: string;
    alt?: string;
}

interface GallerySectionProps {
    images?: GalleryImage[];
    title?: string;
    galleryHref?: string;
}

const ACTIVE_W = 380;
const ACTIVE_H = 310;
const INACTIVE_SCALE = 0.95;
const INACTIVE_W = Math.round(ACTIVE_W * INACTIVE_SCALE);
const INACTIVE_H = Math.round(ACTIVE_H * INACTIVE_SCALE);

export function GallerySection({
    images = defaultImages,
    title = 'Notre Centre',
    galleryHref = '#',
}: GallerySectionProps) {
    const [active, setActive] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const navigate = (dir: -1 | 1) => {
        const next = Math.max(0, Math.min(images.length - 1, active + dir));
        setActive(next);

        // scroll the track so active item stays visible
        const track = trackRef.current;
        if (!track) return;
        const item = track.children[next] as HTMLElement;
        if (!item) return;
        const offset = item.offsetLeft - track.offsetWidth / 2 + item.offsetWidth / 2;
        track.scrollTo({ left: offset, behavior: 'smooth' });
    };

    return (
        <section className="w-full py-14 bg-white overflow-hidden">
            {/* Header */}
            <div className="max-w-287.5 mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
                <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
                    <h2 className="inter font-bold text-2xl text-black">{title}</h2>
                    <a
                        href={galleryHref}
                        className="inter text-sm font-semibold text-black hover:text-orange-500 transition-colors flex items-center gap-1"
                    >
                        Voir toute la gallerie <span aria-hidden>→</span>
                    </a>
                </div>

                {/* Boutons navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        disabled={active === 0}
                        aria-label="Image précédente"
                        className="w-11 h-11 rounded-full border border-black flex items-center justify-center transition-colors hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        disabled={active === images.length - 1}
                        aria-label="Image suivante"
                        className="w-11 h-11 rounded-full border border-black flex items-center justify-center transition-colors hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Track — starts at container left edge, overflows right */}
            <div
                ref={trackRef}
                className="flex items-center h-85 gap-4 overflow-x-hidden"
                style={{
                    paddingLeft: 'max(1rem, calc((100vw - 71.875rem) / 2 + 1rem))',
                    paddingRight: 'max(1rem, calc((100vw - 71.875rem) / 2 + 1rem))',
                }}
            >
                {images.map((img, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setActive(i);
                                const track = trackRef.current;
                                if (!track) return;
                                const item = track.children[i] as HTMLElement;
                                const offset = item.offsetLeft - track.offsetWidth / 2 + item.offsetWidth / 2;
                                track.scrollTo({ left: offset, behavior: 'smooth' });
                            }}
                            className="shrink-0 overflow-hidden rounded-xl lg:rounded-2xl focus:outline-none"
                            style={{
                                width: isActive ? `min(80vw, ${ACTIVE_W}px)` : `min(76vw, ${INACTIVE_W}px)`,
                                height: isActive ? `min(65vw, ${ACTIVE_H}px)` : `min(61.75vw, ${INACTIVE_H}px)`,
                                transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1)',
                                cursor: 'pointer',
                            }}
                            aria-label={img.alt ?? `Image ${i + 1}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt ?? ''}
                                className="w-full  h-full object-cover"
                            />
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
