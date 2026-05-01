
interface ActionSectionProps {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
    faqHref?: string;
}

export function ActionSection({
    title = 'TON AVENIR COMMENCE ICI.',
    description = "Des places limitées sont disponibles dans nos centres. Ne laisse pas passer l'opportunité de rejoindre une académie qui croit en chaque talent, quel que soit le point de départ.",
    buttonLabel = 'Démarrer mon inscription',
    buttonHref = '/inscription',
    faqHref = '#faq',
}: ActionSectionProps) {
    return (
        <section
            className="w-full py-24 px-6 lg:h-184.25 flex flex-col items-center justify-center text-center"
            style={{
                background: 'linear-gradient(135deg, #1a1aff 0%, #2d2db0 40%, #7b3f8c 80%, #c0394b 100%)',
            }}
        >
            <h2
                className="bebas-neue-regular text-[64px] md:text-[80px] text-[#ff5a1f] uppercase mb-6"
                style={{ lineHeight: 1 }}
            >
                {title}
            </h2>

            <p className="inter text-white text-base md:text-lg max-w-2xl mb-12">
                {description}
            </p>

            <a
                href={buttonHref}
                className="inter font-semibold text-white bg-[#ff5a1f] hover:bg-[#e04a10] transition-colors px-12 py-5 rounded-full text-base mb-6"
            >
                {buttonLabel}
            </a>

            <a
                href={faqHref}
                className="inter italic text-white text-sm hover:underline"
            >
                Vous avez des questions ? → Consultez notre FAQ
            </a>
        </section>
    );
}
