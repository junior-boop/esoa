
import { useState } from 'react';

interface FormData {
    email: string;
    gsm: string;
    nomPrenom: string;
    dateNaissance: string;
    adresse: string;
    clubActuel: string;
    postePoied: string;
    remarques: string;
    consentImage: boolean;
    consentRgpd: boolean;
}

const initialForm: FormData = {
    email: '',
    gsm: '',
    nomPrenom: '',
    dateNaissance: '',
    adresse: '',
    clubActuel: '',
    postePoied: '',
    remarques: '',
    consentImage: false,
    consentRgpd: false,
};

function Field({ label, sublabel, required, children }: {
    label: string;
    sublabel?: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="inter font-semibold text-sm text-black uppercase tracking-wide">
                {label}
                {required && <span className="text-orange-500 ml-1">*</span>}
                {sublabel && <span className="normal-case font-normal text-black/50 ml-2">{sublabel}</span>}
            </label>
            {children}
        </div>
    );
}

const inputClass =
    'w-full border border-black/15 rounded-xl px-4 py-3 inter text-sm text-black bg-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-black/30';

function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-black/10 rounded-xl overflow-hidden">
            <div className="px-5 py-4 inter text-sm font-semibold text-black bg-[#F4F6FA]">
                {title}
            </div>
            <div className="px-5 py-5 inter text-sm text-black/70 leading-relaxed space-y-4 bg-white">
                {children}
            </div>
        </div>
    );
}

interface InscriptionFormProps {
    category?: string;   // ex: "U15 – U17"
    tag?: string;        // ex: "ESOA Elite 2026–2027"
    maxPlayers?: number; // ex: 15
}

export function InscriptionForm({
    category = 'U15 – U17',
    tag = 'ESOA Elite 2026–2027',
    maxPlayers,
}: InscriptionFormProps) {
    const [form, setForm] = useState<FormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const set = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;
        setForm(f => ({ ...f, [field]: value }));
        setErrors(er => ({ ...er, [field]: undefined }));
    };

    const validate = (): boolean => {
        const e: Partial<Record<keyof FormData, string>> = {};
        if (!form.email) e.email = 'Champ obligatoire';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
        if (!form.gsm) e.gsm = 'Champ obligatoire';
        if (!form.nomPrenom) e.nomPrenom = 'Champ obligatoire';
        if (!form.dateNaissance) e.dateNaissance = 'Champ obligatoire';
        if (!form.adresse) e.adresse = 'Champ obligatoire';
        if (!form.clubActuel) e.clubActuel = 'Champ obligatoire';
        if (!form.postePoied) e.postePoied = 'Champ obligatoire';
        if (!form.consentImage) e.consentImage = 'Consentement requis';
        if (!form.consentRgpd) e.consentRgpd = 'Acceptation requise';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 className="bebas-neue-regular text-4xl text-black mb-3">Inscription envoyée !</h2>
                <p className="inter text-black/60 max-w-md">Nous avons bien reçu votre demande. Vous serez contacté(e) prochainement à l'adresse <strong>{form.email}</strong>.</p>
            </div>
        );
    }

    return (
        <section className="w-full bg-[#EFF2F6] py-16 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <p className="inter text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">{tag}</p>
                    <h1 className="bebas-neue-regular text-5xl sm:text-6xl text-black" style={{ lineHeight: 1 }}>
                        Inscription<br />{category}
                    </h1>
                    <p className="inter text-black/60 mt-4 text-sm">
                        Entraînement uniquement les dimanches · via talent test<br />
                        <span className="text-black/40">Verplicht veld / Champ obligatoire <span className="text-orange-500">*</span></span>
                    </p>
                    {maxPlayers && (
                        <p className="inter text-sm font-semibold text-orange-500 mt-2">
                            ⚠️ Max {maxPlayers} joueurs / module
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* Email */}
                    <Field label="Email" required>
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            value={form.email}
                            onChange={set('email')}
                            className={inputClass}
                        />
                        {errors.email && <p className="inter text-xs text-red-500">{errors.email}</p>}
                    </Field>

                    {/* GSM */}
                    <Field label="Numéro GSM" sublabel="/ GSM Nummer" required>
                        <input
                            type="tel"
                            placeholder="+32 …"
                            value={form.gsm}
                            onChange={set('gsm')}
                            className={inputClass}
                        />
                        {errors.gsm && <p className="inter text-xs text-red-500">{errors.gsm}</p>}
                    </Field>

                    {/* Nom & Prénom */}
                    <Field label="Nom & Prénom" sublabel="/ Name & Voorname" required>
                        <input
                            type="text"
                            placeholder="DUPONT Jean"
                            value={form.nomPrenom}
                            onChange={set('nomPrenom')}
                            className={inputClass}
                        />
                        {errors.nomPrenom && <p className="inter text-xs text-red-500">{errors.nomPrenom}</p>}
                    </Field>

                    {/* Date de naissance */}
                    <Field label="Date de naissance" sublabel="/ Geboorte datum" required>
                        <input
                            type="date"
                            value={form.dateNaissance}
                            onChange={set('dateNaissance')}
                            className={inputClass}
                        />
                        {errors.dateNaissance && <p className="inter text-xs text-red-500">{errors.dateNaissance}</p>}
                    </Field>

                    {/* Adresse */}
                    <Field label="Adresse" sublabel="/ Adres" required>
                        <input
                            type="text"
                            placeholder="Rue, numéro, code postal, ville"
                            value={form.adresse}
                            onChange={set('adresse')}
                            className={inputClass}
                        />
                        {errors.adresse && <p className="inter text-xs text-red-500">{errors.adresse}</p>}
                    </Field>

                    {/* Club actuel */}
                    <Field label="Club actuel" sublabel="/ Tijdelijke club" required>
                        <input
                            type="text"
                            placeholder="Nom du club"
                            value={form.clubActuel}
                            onChange={set('clubActuel')}
                            className={inputClass}
                        />
                        {errors.clubActuel && <p className="inter text-xs text-red-500">{errors.clubActuel}</p>}
                    </Field>

                    {/* Poste & Pied */}
                    <Field label="Poste & Pied de prédilection" sublabel="/ Positie & Beste voet" required>
                        <input
                            type="text"
                            placeholder="ex : Milieu offensif — Pied droit"
                            value={form.postePoied}
                            onChange={set('postePoied')}
                            className={inputClass}
                        />
                        {errors.postePoied && <p className="inter text-xs text-red-500">{errors.postePoied}</p>}
                    </Field>

                    {/* Remarques */}
                    <Field label="Remarques" sublabel="/ Opmerking (facultatif)">
                        <textarea
                            rows={3}
                            placeholder="Informations complémentaires…"
                            value={form.remarques}
                            onChange={set('remarques')}
                            className={inputClass + ' resize-none'}
                        />
                    </Field>

                    {/* Divider */}
                    <div className="border-t border-black/10 my-2" />

                    {/* Droit à l'image */}
                    <LegalBlock title="Autorisation de droit à l'image / Beeldrecht">
                        <p>
                            <strong>FR —</strong> Je soussigné(e), accorde à <strong>ESOA-NINOVE</strong> l'autorisation d'utiliser mon image dans une vidéo ou d'autres supports numériques dans toutes ses publications, y compris les publications sur internet, à des fins non commerciales, dans le cadre de la promotion des activités : <em>« Entraînement spécifique élite de haut niveau »</em>.
                        </p>
                        <p>
                            Je suis informé(e) que je peux, à tout moment, exercer mon droit d'accès à l'image, de rectification ou retirer mon consentement en contactant : <a href="mailto:esoa9400@gmail.com" className="text-orange-500 underline">esoa9400@gmail.com</a>
                        </p>
                        <p>
                            <strong>Pour les participants mineurs :</strong> Le parent ou tuteur légal accorde le consentement au nom de l'enfant mineur.
                        </p>
                        <hr className="border-black/10" />
                        <p>
                            <strong>NL —</strong> Ik, ondergetekende, verleen hierbij aan <strong>ESOA-NINOVE</strong> toestemming om mijn afbeelding te gebruiken in een video of ander digitaal medium, voor niet-commerciële doeleinden, als onderdeel van de promotie van: <em>"Elite-specifieke training op hoog niveau"</em>.
                        </p>
                        <p>
                            Ik kan op elk moment mijn toestemming intrekken via: <a href="mailto:esoa9400@gmail.com" className="text-orange-500 underline">esoa9400@gmail.com</a>
                        </p>
                        <p>
                            <strong>Voor minderjarige deelnemers:</strong> De ouder of wettelijke voogd geeft toestemming namens het minderjarige kind.
                        </p>
                    </LegalBlock>

                    {/* Consentement image checkbox */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.consentImage}
                                onChange={set('consentImage')}
                                className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
                            />
                            <span className="inter text-sm font-semibold text-black">
                                J'accorde l'autorisation de droit à l'image telle que décrite ci-dessus.<span className="text-orange-500 ml-1">*</span><br />
                                <span className="font-normal text-black/50">Ik verleen het beeldrecht zoals hierboven beschreven.</span>
                            </span>
                        </label>
                        {errors.consentImage && <p className="inter text-xs text-red-500 ml-7">{errors.consentImage}</p>}
                    </div>

                    {/* RGPD */}
                    <LegalBlock title="Politique RGPD / GDPR-beleid">
                        <p>
                            <strong>FR —</strong> Vous autorisez <strong>ESOA NINOVE</strong> à récolter les données via le formulaire d'inscription. Celles-ci sont enregistrées dans un fichier informatisé/papier au sein de notre centre sportif.
                        </p>
                        <p>
                            Le centre sportif s'engage à ne pas vendre, louer, céder ni donner accès à vos données sans votre consentement préalable à des tiers, à moins d'y être contraint en raison d'une obligation légale.
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Base juridique :</strong> consentement — contrat — respect d'une obligation légale</li>
                            <li><strong>Durée de conservation :</strong> pendant la durée du Module, renouvelable automatiquement si vous êtes inscrit au prochain module</li>
                        </ul>
                        <p><strong>Finalité :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Traitement des inscriptions et suivi sportif du joueur</li>
                            <li>Suivi de la vie de ESOA NINOVE</li>
                            <li>Facturation des cotisations</li>
                            <li>Gestion des assurances souscrites</li>
                        </ul>
                        <p>
                            <strong>Transfert vers un pays tiers :</strong> Non en règle générale — OUI en cas de participation volontaire à une activité sportive internationale.
                        </p>
                        <p>
                            Conformément au Règlement européen n°2016/679/UE du 27 avril 2016, vous bénéficiez d'un droit d'accès, de rectification et d'effacement de vos données.
                        </p>
                        <hr className="border-black/10" />
                        <p>
                            <strong>NL —</strong> Via het registratieformulier geeft u <strong>ESOA NINOVE</strong> toestemming om de gegevens te verzamelen. Deze worden vastgelegd in een geautomatiseerd/papieren dossier binnen ons sportcentrum.
                        </p>
                        <p>
                            Sportcentrum verbindt zich ertoe uw gegevens niet zonder uw voorafgaande toestemming aan derden te verkopen, verhuren of ter beschikking te stellen, tenzij verplicht op grond van een wettelijke verplichting.
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Wettelijke basis:</strong> toestemming — contract — wettelijke verplichting</li>
                            <li><strong>Houdbaarheid:</strong> voor de duur van de Module, automatisch verlengd bij inschrijving voor de volgende module</li>
                        </ul>
                        <p><strong>Doel:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Verwerking van inschrijvingen en sportmonitoring van de geregistreerde speler</li>
                            <li>Toezicht op de werking van ESOA NINOVE</li>
                            <li>Facturatie van bijdragen</li>
                            <li>Beheer van afgesloten verzekeringen</li>
                        </ul>
                        <p>
                            <strong>Overdracht naar een derde land:</strong> Nee als algemene regel — Ja bij vrijwillige deelname aan een internationale sportactiviteit.
                        </p>
                        <p>
                            In overeenstemming met de Europese Verordening nr. 2016/679/EU van 27 april 2016 heeft u recht op toegang, rectificatie en wissing van uw gegevens.
                        </p>
                    </LegalBlock>

                    {/* Conditions d'inscription */}
                    <LegalBlock title="Conditions d'inscription / Voorwaarden van inschrijving">
                        <p><strong>FR —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Inscription uniquement pour des entraînements spécifiques de football</li>
                            <li>Tous les inscrits sont couverts par l'assurance de l'académie en cas d'accident survenu durant les entraînements</li>
                            <li>Module de <strong>10 séances</strong> d'une heure et demie, tous les dimanches matin</li>
                            <li>Tout module commencé est dû — pas de remboursement</li>
                            <li>Frais d'inscription et de participation : <strong>300 € / module</strong> (minimum 2 modules) — la totalité doit être versée en espèces avant le début de la première séance</li>
                            <li>Présence obligatoire durant tout le module</li>
                            <li>Obligation de s'entraîner en uniforme de l'académie :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Survêtements : <strong>55 €</strong></li>
                                    <li>Maillot, short et bas : <strong>30 €</strong></li>
                                </ul>
                            </li>
                        </ul>
                        <hr className="border-black/10" />
                        <p><strong>NL —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Inschrijving alleen voor specifieke voetbaltrainingen</li>
                            <li>Alle inschrijvers zijn gedekt door de verzekering van de academie bij een ongeval tijdens de opleiding</li>
                            <li>Module van <strong>10 sessies</strong> van anderhalf uur, elke zondagochtend — minimaal 2 modules vereist</li>
                            <li>Voor elke gestarte module is geen restitutie verschuldigd</li>
                            <li>Inschrijvings- en deelnamekosten : <strong>€ 300 / module</strong> — het geheel moet vóór aanvang van de eerste sessie contant worden betaald</li>
                            <li>Verplichte aanwezigheid gedurende de volledige module</li>
                            <li>Verplichting om in academie-uniform te trainen :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Trainingspakken : <strong>€ 55</strong></li>
                                    <li>Shirt, short en ondergoed : <strong>€ 30</strong></li>
                                </ul>
                            </li>
                        </ul>
                    </LegalBlock>

                    {/* Accord général */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.consentRgpd}
                                onChange={set('consentRgpd')}
                                className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
                            />
                            <span className="inter text-sm font-semibold text-black">
                                J'ai lu et j'accepte les conditions d'inscription ainsi que la politique RGPD.<br />
                                <span className="font-normal text-black/50">Ik heb de inschrijvingsvoorwaarden en het GDPR-beleid gelezen en ga ermee akkoord.</span>
                            </span>
                        </label>
                        {errors.consentRgpd && <p className="inter text-xs text-red-500 ml-7">{errors.consentRgpd}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-4 w-full py-4 rounded-full bg-black text-white inter font-semibold text-sm uppercase tracking-widest hover:bg-orange-500 transition-colors"
                    >
                        Envoyer mon inscription →
                    </button>

                    <p className="inter text-xs text-center text-black/30">
                        * Champ obligatoire / Verplicht veld
                    </p>
                </form>
            </div>
        </section>
    );
}
