
interface ResumeItemProps {
    title: string;
    description: string;
}

const items: ResumeItemProps[] = [
    {
        title: 'ENCADREMENT PROFESSIONNEL',
        description:
            "Nos entraîneurs sont tous diplômés UEFA et justifient d'une expérience terrain significative. Chaque enfant est suivi par des professionnels qui connaissent les exigences du football de haut niveau et savent adapter leur approche à chaque profil.",
    },
    {
        title: 'MÉTHODE PÉDAGOGIQUE STRUCTURÉE',
        description:
            "Notre programme de formation s'appuie sur une progression claire, de l'initiation jusqu'aux catégories avancées. Chaque séance est conçue pour développer à la fois les fondamentaux techniques, la vision du jeu et l'intelligence tactique.",
    },
    {
        title: 'SUIVI INDIVIDUEL DE CHAQUE JOUEUR',
        description:
            "Ici, chaque joueur compte. Nous établissons un bilan personnalisé à chaque début de saison et assurons un suivi régulier des progrès. Les parents sont tenus informés de l'évolution de leur enfant tout au long de l'année.",
    },
    {
        title: 'INFRASTRUCTURE DE QUALITÉ',
        description:
            "Nos centres disposent de terrains entretenus, de vestiaires adaptés et d'équipements modernes. Nous offrons un environnement sûr et stimulant où les jeunes joueurs peuvent s'épanouir et progresser dans les meilleures conditions.",
    },
];

function ResumeItem({ title, description }: ResumeItemProps) {
    return (
        <div className="pb-8">
            <h3 className="bebas-neue-regular text-4xl sm:text-[40px] tracking-wide text-black mb-2">
                {title}
            </h3>
            <p className="inter text-xl sm:text-xl text-black leading-relaxed">
                {description}
            </p>
        </div>
    );
}

interface ResumeSectionProps {
    title?: string;
    subtitle?: string;
    items?: ResumeItemProps[];
}

export function ResumeSection({
    title = 'Pourquoi',
    subtitle = 'nous choisir ?',
    items: customItems,
}: ResumeSectionProps) {
    const list = customItems ?? items;

    return (
        <section className="w-full bg-[#eef0f5] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24">

                {/* Titre gauche — sticky sur desktop */}
                <div className="md:w-[280px] lg:w-[320px] shrink-0">
                    <h2
                        className="inter font-bold text-[36px] sm:text-[46px] md:text-[44px] text-black"
                        style={{ lineHeight: 1.1 }}
                    >
                        {title}<br />{subtitle}
                    </h2>
                </div>

                {/* Liste des items */}
                <div className="flex-1 flex flex-col">
                    {list.map((item) => (
                        <ResumeItem key={item.title} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}
