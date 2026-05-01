
interface TextImageBlockProps {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt?: string;
    reverse?: boolean;
    /** Optional label above the title (orange small caps) */
    label?: string;
}

export function TextImageBlock({
    title,
    paragraphs,
    imageSrc,
    imageAlt = '',
    reverse = false,
    label,
}: TextImageBlockProps) {
    return (
        <section className="w-full bg-[#EFF2F6] py-16 px-6 sm:px-6">
            <div className="max-w-287.5 mx-auto flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-12 lg:gap-20 sm:items-center">

                {/* ── Text block ───────────────────────────────── */}
                <div className={`flex flex-col gap-5 ${reverse ? 'sm:order-2' : 'sm:order-1'}`}>
                    {label && (
                        <p className="inter text-sm font-semibold text-orange-500 uppercase tracking-widest">
                            {label}
                        </p>
                    )}
                    <h2 className="bebas-neue-regular text-5xl sm:text-7xl lg:text-[96px] text-black leading-none">
                        {title}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="inter text-black/60 text-base sm:text-xl leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ── Image block ───────────────────────────────── */}
                <div className={`w-full ${reverse ? 'sm:order-1' : 'sm:order-2'}`}>
                    <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl aspect-square">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
