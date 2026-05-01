
import image from '../assets/image/rec_1.png';
import { React_Container } from './React_UI';

interface EventItemsProps {
    title?: string;
    date?: string;
    time?: string;
    location?: string;
    imageSrc?: string;
}

export function EventItems({
    title = 'Compétition des jeunes U20',
    date = 'Mardi 24 mars, 2026',
    time = '12h 30',
    location = 'Limoge',
    imageSrc,
}: EventItemsProps) {
    return (
        <div className="w-[326px] h-[469px] animation_hover">
            <div className="w-full h-82 overflow-hidden rounded-2xl">
                <img
                    src={imageSrc ?? image.src}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 bg-white">
                <h1 className="text-3xl font-extrabold text-black mb-4 inter" style={{ lineHeight: 1 }}>
                    {title}
                </h1>
                <p className="text-black inter">
                    {date}<br />{time} - {location}
                </p>
            </div>
        </div>
    );
}

export function EventsItemsLarge() {
    return (
        <div className="w-[458px] h-[514px] relative overflow-hidden rounded-3xl animation_hover">
            <div className="w-full h-full absolute top-0 left-0">
                <img src={image.src} alt="Events" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h1 className='text-3xl font-bold text-white w-[80%] mb-4'>Compétition des jeunes U20 </h1>
                <p className='text-white'>Mardi 24 mars, 2026 <br />12h 30 - Limoge</p>
            </div>
        </div>
    );
}

export function EventsItemsSmall() {
    return (
        <div className="w-[326px] h-[469px] animation_hover">
            <div className='rounded-3xl overflow-hidden w-[326px] h-[328px]'>
                <img src={image.src} alt="Events" className="w-full h-full object-cover" />
            </div>
            <div className='p-4'>
                <h1 className='text-3xl font-extrabold text-black  mb-4 inter' style={{ lineHeight: 1 }}>Compétition des jeunes U20 </h1>
                <p className='text-black inter'>Mardi 24 mars, 2026 <br />12h 30 - Limoge</p>
            </div>
        </div>
    );
}

export function EventsSection() {
    return (
        <div className="flex flex-col md:flex-row items-top gap-[21px] md:justify-between ">
            <EventItems />
            <EventItems />
            <EventItems />
        </div>
    )
}

/* Stat simple : chiffre + label */
export function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left">
            <span
                className="bebas-neue-regular text-black"
                style={{ fontSize: '128px', lineHeight: 0.9 }}
            >
                {value}
            </span>
            <span className="inter font-bold text-black mt-3" style={{ fontSize: '36px', lineHeight: 1.2 }}>
                {label}
            </span>
        </div>
    );
}

/* Stat avec image : chiffre + label superposés sur une photo */
export function StatItemImage({
    value,
    label,
    imageSrc,
    imageAlt = '',
}: {
    value: string;
    label: string;
    imageSrc: string;
    imageAlt?: string;
}) {
    return (
        <div className="relative rounded-2xl overflow-hidden w-[280px] sm:w-[320px] aspect-[4/3] shrink-0">
            <img src={imageSrc} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
            {/* Overlay dégradé pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span
                    className="bebas-neue-regular text-white"
                    style={{ fontSize: '96px', lineHeight: 0.9 }}
                >
                    {value}
                </span>
                <span className="inter font-bold text-white mt-2" style={{ fontSize: '24px', lineHeight: 1.2 }}>
                    {label}
                </span>
            </div>
        </div>
    );
}

/* Section complète des 3 stats */
export function StatsSection({ imageStatSrc }: { imageStatSrc?: string }) {
    return (
        <section className="bg-[#EFF2F6] py-28">
            <React_Container>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-25 sm:gap-16 lg:gap-24 flex-wrap bg-[#EFF2F6]">
                    <StatItem
                        value="+200"
                        label={"enfants aujourd'hui\nen pro et semi-pro"}
                    />
                    <StatItem
                        value="5ANS"
                        label={"expertise et de\nméthodologie"}
                    />
                    <StatItemImage
                        value="45"
                        label="Nombre d'entraîneurs certifiés"
                        imageSrc={imageStatSrc ?? image.src}
                        imageAlt="Entraîneur certifié"
                    />
                </div>
            </React_Container>
        </section>
    );
}

/* Kept for backward compatibility */
export function Stats({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className='max-w-87.5 w-fit'>
            <h3 className='bebas-neue-regular text-[128px] uppercase mb-2' style={{ lineHeight: 0.9 }}>{title}</h3>
            <div>
                <span className='inter text-4xl font-bold'>{children}</span>
            </div>
        </div>
    );
}