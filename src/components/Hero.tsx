
import { useState, useEffect, useRef } from 'react';
import { React_Container } from './React_UI';

import img1 from '../assets/image/image-import-18.jpg';
import img2 from '../assets/image/image-import-22.jpg';
import img3 from '../assets/image/image-import-25.jpg';

export interface HeroSlide {
    src: string;
    alt?: string;
    title: string;
    description: string;
}

const defaultSlides: HeroSlide[] = [
    {
        src: img1.src,
        alt: 'Héros 1',
        title: 'NINOVE',
        description: "Le talent fait gagner des matchs, mais le travail d'équipe fait gagner des championnats. Ici, nous formons des joueurs qui apprennent à se dépasser et à gagner ensemble.",
    },
    {
        src: img2.src,
        alt: 'Héros 2',
        title: 'NINOVE',
        description: "Une académie où chaque jeune talent est accompagné, encouragé et formé pour atteindre son plein potentiel sur et en dehors du terrain.",
    },
    {
        src: img3.src,
        alt: 'Héros 3',
        title: 'NINOVE',
        description: "Rejoignez une communauté de passionnés qui partagent la même vision : former les champions de demain avec rigueur, passion et bienveillance.",
    },
];

interface HeroProps {
    slides?: HeroSlide[];
    autoPlayInterval?: number;
}

export function Hero({ slides = defaultSlides, autoPlayInterval = 6000 }: HeroProps) {
    const [current, setCurrent] = useState(0);
    const [animKey, setAnimKey] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (index: number) => {
        setCurrent(index);
        setAnimKey(k => k + 1);
    };

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(prev => {
                const next = (prev + 1) % slides.length;
                setAnimKey(k => k + 1);
                return next;
            });
        }, autoPlayInterval);
    };

    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [slides.length, autoPlayInterval]);

    // Animation image — crossfade
    useEffect(() => {
        if (!imgRef.current) return;
        imgRef.current.animate(
            [{ opacity: 0, transform: 'scale(1.04)' }, { opacity: 1, transform: 'scale(1)' }],
            { duration: 800, easing: 'ease-out', fill: 'forwards' }
        );
    }, [animKey]);

    // Animation texte — slide up
    useEffect(() => {
        if (!textRef.current) return;
        textRef.current.animate(
            [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 600, delay: 150, easing: 'ease-out', fill: 'forwards' }
        );
    }, [animKey]);

    const slide = slides[current];

    return (
        <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

            {/* Image de fond */}
            <img
                ref={imgRef}
                key={animKey}
                src={slide.src}
                alt={slide.alt ?? slide.title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dégradé bas */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#EFF2F6] via-[#EFF2F6]/40 to-transparent" />

            {/* Contenu bas gauche */}
            <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-14">
                <React_Container>
                    <div ref={textRef} key={`text-${animKey}`} className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10">

                        {/* Titre */}
                        <h1
                            className="bebas-neue-regular text-black shrink-0"
                            style={{ fontSize: '96px', lineHeight: 1 }}
                        >
                            {slide.title}
                        </h1>

                        {/* Description */}
                        <p
                            className="inter text-black max-w-sm sm:max-w-md pb-1"
                            style={{ fontSize: '18px', lineHeight: 1.5 }}
                        >
                            {slide.description}
                        </p>
                    </div>

                    {/* Dots de navigation */}
                    <div className="flex items-center gap-2 mt-6">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    goTo(i);
                                    startTimer();
                                }}
                                aria-label={`Slide ${i + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === current
                                    ? 'bg-orange-500 w-8'
                                    : 'bg-gray-400 w-2.5'
                                    }`}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                </React_Container>
            </div>
        </section>
    );
}
