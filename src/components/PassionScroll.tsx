
import rec1   from '../assets/image/rec_1.png';
import rec2   from '../assets/image/rec_2.png';
import rec3   from '../assets/image/rec_3.png';
import rec4   from '../assets/image/rec_4.png';
import rec5   from '../assets/image/rec_5.png';
import ban1   from '../assets/image/banniere_1.png';
import ban2   from '../assets/image/banniere_2.png';
import img11  from '../assets/image/image-import-11.jpg';
import img18  from '../assets/image/image-import-18.jpg';
import img22  from '../assets/image/image-import-22.jpg';
import img25  from '../assets/image/image-import-25.jpg';

const images = [
    { src: rec1.src,  alt: 'Académie 1' },
    { src: img22.src, alt: 'Académie 2' },
    { src: rec2.src,  alt: 'Académie 3' },
    { src: img11.src, alt: 'Académie 4' },
    { src: rec3.src,  alt: 'Académie 5' },
    { src: ban1.src,  alt: 'Académie 6' },
    { src: img18.src, alt: 'Académie 7' },
    { src: rec4.src,  alt: 'Académie 8' },
    { src: img25.src, alt: 'Académie 9' },
    { src: rec5.src,  alt: 'Académie 10' },
    { src: ban2.src,  alt: 'Académie 11' },
];

export function PassionScroll() {
    // Duplicate for seamless loop
    const track = [...images, ...images];

    return (
        <section className="w-full bg-white py-12 sm:py-16 overflow-hidden">
            <style>{`
                @keyframes passion-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .passion-track {
                    animation: passion-scroll 40s linear infinite;
                    will-change: transform;
                }
                .passion-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Title */}
            <div className="text-center mb-8 sm:mb-10 px-4">
                <h2 className="bebas-neue-regular text-3xl sm:text-4xl lg:text-5xl text-black tracking-wide">
                    Une passion partagée
                </h2>
            </div>

            {/* Scroll strip */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="passion-track flex gap-2 sm:gap-3"
                    style={{ width: 'max-content' }}
                >
                    {track.map((img, i) => (
                        <div
                            key={i}
                            className="shrink-0 overflow-hidden rounded-lg sm:rounded-xl"
                            style={{ height: 'clamp(160px, 28vw, 320px)' }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="h-full w-auto object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
