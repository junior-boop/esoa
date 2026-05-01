
import { useState, useRef } from 'react';
import img1 from '../assets/image/image-import-22.jpg';

const ACTIVE_W = 420;
const ACTIVE_H = 320;
const INACTIVE_SCALE = 0.95;
const INACTIVE_W = Math.round(ACTIVE_W * INACTIVE_SCALE);
const INACTIVE_H = Math.round(ACTIVE_H * INACTIVE_SCALE);

type ImageCard = {
    type: 'image';
    src: string;
    text: string;
};

type OrangeCard = {
    type: 'orange';
    title: string;
    description?: string;
    href?: string;
};

type ActionCard = ImageCard | OrangeCard;

const defaultCards: ActionCard[] = [
    {
        type: 'image',
        src: img1.src,
        text: 'Développer leurs compétences et leur discipline grâce au sport.',
    },
    {
        type: 'orange',
        title: 'Les stages de formation',
        href: '#',
    },
    {
        type: 'orange',
        title: 'Contactez-nous maintenant pour l\'inscription de votre Champion',
        href: '#',
    },
];

interface ActionCarouselProps {
    cards?: ActionCard[];
}

function CardImage({ card, active }: { card: ImageCard; active: boolean }) {
    return (
        <div className="relative w-full h-full">
            <img src={card.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <p
                    className="bebas-neue-regular text-white text-center"
                    style={{ fontSize: active ? '32px' : '26px', lineHeight: 1.15, transition: 'font-size 0.4s' }}
                >
                    {card.text}
                </p>
            </div>
        </div>
    );
}

function CardOrange({ card }: { card: OrangeCard }) {
    return (
        <div
            className="relative w-full h-full flex flex-col justify-between p-7"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' }}
        >
            <h3
                className="bebas-neue-regular text-white"
                style={{ fontSize: '28px', lineHeight: 1.2 }}
            >
                {card.title}
            </h3>
            {card.description && (
                <p className="inter text-white/90 text-sm">{card.description}</p>
            )}
            <div className="flex justify-end mt-4">
                <a
                    href={card.href ?? '#'}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center"
                    aria-label="Voir plus"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export function ActionCarousel({ cards = defaultCards }: ActionCarouselProps) {
    const [active, setActive] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const scrollToItem = (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const item = track.children[index] as HTMLElement;
        if (!item) return;
        const offset = item.offsetLeft - track.offsetWidth / 2 + item.offsetWidth / 2;
        track.scrollTo({ left: offset, behavior: 'smooth' });
    };

    const navigate = (dir: -1 | 1) => {
        const next = Math.max(0, Math.min(cards.length - 1, active + dir));
        setActive(next);
        scrollToItem(next);
    };

    return (
        <section className="w-full py-14 bg-white overflow-hidden">
            {/* Boutons navigation */}
            <div className="max-w-287.5 mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-end">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        disabled={active === 0}
                        aria-label="Précédent"
                        className="w-11 h-11 rounded-full border border-black flex items-center justify-center transition-colors hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        disabled={active === cards.length - 1}
                        aria-label="Suivant"
                        className="w-11 h-11 rounded-full border border-black flex items-center justify-center transition-colors hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Track */}
            <div
                ref={trackRef}
                className="flex items-center gap-4 overflow-x-hidden"
                style={{
                    paddingLeft: 'max(1rem, calc((100vw - 71.875rem) / 2 + 1rem))',
                    paddingRight: 'max(1rem, calc((100vw - 71.875rem) / 2 + 1rem))',
                }}
            >
                {cards.map((card, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={i}
                            onClick={() => { setActive(i); scrollToItem(i); }}
                            className="shrink-0 overflow-hidden rounded-2xl focus:outline-none"
                            style={{
                                width: isActive ? `min(80vw, ${ACTIVE_W}px)` : `min(76vw, ${INACTIVE_W}px)`,
                                height: isActive ? `min(65vw, ${ACTIVE_H}px)` : `min(61.75vw, ${INACTIVE_H}px)`,
                                transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1)',
                                cursor: 'pointer',
                            }}
                            aria-label={`Carte ${i + 1}`}
                        >
                            {card.type === 'image'
                                ? <CardImage card={card} active={isActive} />
                                : <CardOrange card={card} />
                            }
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
