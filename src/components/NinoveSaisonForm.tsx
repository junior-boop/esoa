
import { useState } from 'react';

interface FormData {
    email: string;
    equipements: string[];
    gsm: string;
    nomPrenom: string;
    dateNaissance: string;
    adresse: string;
    planningFR: string[];
    engagement: string;
    planningNL: string[];
    accordConditions: string;
    signatureImage: string;
    accordImage: string;
    accordRgpd: string;
    confirmation: boolean;
}

const initialForm: FormData = {
    email: '',
    equipements: [],
    gsm: '',
    nomPrenom: '',
    dateNaissance: '',
    adresse: '',
    planningFR: [],
    engagement: '',
    planningNL: [],
    accordConditions: '',
    signatureImage: '',
    accordImage: '',
    accordRgpd: '',
    confirmation: false,
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

function RadioGroup({ name, options, value, onChange, error }: {
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(opt.value)}
                        className="w-4 h-4 accent-orange-500 shrink-0"
                    />
                    <span className="inter text-sm text-black">{opt.label}</span>
                </label>
            ))}
            {error && <p className="inter text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

function CheckboxGroup({ options, values, onChange, error }: {
    options: { value: string; label: string }[];
    values: string[];
    onChange: (v: string[]) => void;
    error?: string;
}) {
    const toggle = (v: string) => {
        onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
    };
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label key={opt.value} className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={values.includes(opt.value)}
                        onChange={() => toggle(opt.value)}
                        className="mt-0.5 w-4 h-4 accent-orange-500 shrink-0"
                    />
                    <span className="inter text-sm text-black">{opt.label}</span>
                </label>
            ))}
            {error && <p className="inter text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

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

const equipementsOptions = [
    { value: 'k-way',    label: 'K-way de pluie / K-way regenjas' },
    { value: 'chaussette', label: 'Chaussette de foot / Voetbal kousen' },
    { value: 'maillot',  label: 'Maillot, short / Truitje, short' },
    { value: 'ballon',   label: 'Ballon / Bal' },
];

const planningFROptions = [
    { value: 'lundi-ip',      label: 'U8-U15 Niveau IP — Lundi de 17h30 à 19h00' },
    { value: 'mercredi-u5u9', label: 'U5-U7 & U8-U9 — Mercredi de 13h45 à 15h30' },
    { value: 'mercredi-deb',  label: 'U10-U15 Débutants — Mercredi de 13h45 à 15h30' },
    { value: 'mercredi-ip',   label: 'U10-U16 Mercredi IP — de 15h15 à 17h00' },
    { value: 'vendredi-ip',   label: 'U8-U15 Niveau IP — Vendredi de 17h30 à 19h00' },
];

const planningNLOptions = [
    { value: 'maandag-ip',     label: 'U8-U15 Niveau IP — Maandag van 17u30 tot 19u00' },
    { value: 'woensdag-u5u9',  label: 'U5-U7 & U8-U9 Niveau IP — Woensdag van 13u45 tot 15u30' },
    { value: 'woensdag-beg',   label: 'U8-U13 Beginners — Woensdag van 13u45 tot 15u30' },
    { value: 'woensdag-ip',    label: 'U10-U15 Niveau IP — Woensdag van 15u15 tot 17u00' },
    { value: 'donderdag-beg',  label: 'U5-U7 & U8-U13 Beginners — Donderdag van 17u30 tot 19u00' },
    { value: 'vrijdag-ip',     label: 'U8-U15 Niveau IP — Vrijdag van 17u30 tot 19u00' },
];

const accordOptions = [
    { value: 'accord',     label: 'D\'accord / AKKORD' },
    { value: 'pas-accord', label: 'Pas d\'accord / Niet Akkord' },
];

const imageOptions = [
    { value: 'oui', label: 'OUI / JA' },
    { value: 'non', label: 'NON / NEE' },
];

export function NinoveSaisonForm() {
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

    const setRadio = (field: keyof FormData) => (v: string) => {
        setForm(f => ({ ...f, [field]: v }));
        setErrors(er => ({ ...er, [field]: undefined }));
    };

    const setCheck = (field: keyof FormData) => (v: string[]) => {
        setForm(f => ({ ...f, [field]: v }));
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
        if (form.planningFR.length === 0) e.planningFR = 'Veuillez sélectionner au moins une option';
        if (!form.engagement) e.engagement = 'Réponse obligatoire';
        if (form.planningNL.length === 0) e.planningNL = 'Gelieve minstens één optie te selecteren';
        if (!form.accordConditions) e.accordConditions = 'Réponse obligatoire';
        if (!form.signatureImage) e.signatureImage = 'Champ obligatoire';
        if (!form.accordImage) e.accordImage = 'Réponse obligatoire';
        if (!form.accordRgpd) e.accordRgpd = 'Réponse obligatoire';
        if (!form.confirmation) e.confirmation = 'Confirmation requise';
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
                <p className="inter text-black/60 max-w-md">
                    Nous avons bien reçu votre demande. Vous serez contacté(e) prochainement à l'adresse <strong>{form.email}</strong>.
                </p>
            </div>
        );
    }

    return (
        <section className="w-full bg-[#EFF2F6] py-16 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <p className="inter text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">ESOA Ninove</p>
                    <h1 className="bebas-neue-regular text-5xl sm:text-6xl text-black" style={{ lineHeight: 1 }}>
                        Inscription<br />Saison 2026–2027
                    </h1>
                    <p className="inter text-black/60 mt-4 text-sm">
                        Inscription ESOA Ninove / Inschrijving ESOA Ninove<br />
                        <span className="text-black/40">Verplicht veld / Champ obligatoire <span className="text-orange-500">*</span></span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* Email */}
                    <Field label="Email" required>
                        <input type="email" placeholder="votre@email.com" value={form.email} onChange={set('email')} className={inputClass} />
                        {errors.email && <p className="inter text-xs text-red-500">{errors.email}</p>}
                    </Field>

                    {/* Équipements extra (optional) */}
                    <Field label="Équipements en extra" sublabel="/ Extra uitrusting (facultatif)">
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <p className="inter text-xs text-black/40 mb-3">Hors pack inscription 2026-2027 / Niet inbegrepen in het inschrijvingpakket</p>
                            <CheckboxGroup
                                options={equipementsOptions}
                                values={form.equipements}
                                onChange={setCheck('equipements')}
                            />
                        </div>
                    </Field>

                    {/* GSM */}
                    <Field label="Numéro GSM" sublabel="/ GSM Nummer" required>
                        <input type="tel" placeholder="+32 …" value={form.gsm} onChange={set('gsm')} className={inputClass} />
                        {errors.gsm && <p className="inter text-xs text-red-500">{errors.gsm}</p>}
                    </Field>

                    {/* Nom & Prénom */}
                    <Field label="Nom & Prénom" sublabel="/ Name & Voorname" required>
                        <input type="text" placeholder="DUPONT Jean" value={form.nomPrenom} onChange={set('nomPrenom')} className={inputClass} />
                        {errors.nomPrenom && <p className="inter text-xs text-red-500">{errors.nomPrenom}</p>}
                    </Field>

                    {/* Date naissance */}
                    <Field label="Date de naissance" sublabel="/ Geboorte datum" required>
                        <input type="date" value={form.dateNaissance} onChange={set('dateNaissance')} className={inputClass} />
                        {errors.dateNaissance && <p className="inter text-xs text-red-500">{errors.dateNaissance}</p>}
                    </Field>

                    {/* Adresse */}
                    <Field label="Adresse" sublabel="/ Adres" required>
                        <input type="text" placeholder="Rue, numéro, code postal, ville" value={form.adresse} onChange={set('adresse')} className={inputClass} />
                        {errors.adresse && <p className="inter text-xs text-red-500">{errors.adresse}</p>}
                    </Field>

                    {/* Planning FR */}
                    <Field label="Catégories & Planning d'entraînement (FR)" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <CheckboxGroup
                                options={planningFROptions}
                                values={form.planningFR}
                                onChange={setCheck('planningFR')}
                                error={errors.planningFR}
                            />
                        </div>
                    </Field>

                    {/* Engagement international */}
                    <Field label="Confirmation d'inscription & Engagement obligatoire" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-5 flex flex-col gap-4">
                            <div className="inter text-sm text-black/70 leading-relaxed space-y-2">
                                <p><strong>FR —</strong> En validant ce formulaire, vous confirmez l'inscription de votre enfant et acceptez l'obligation de participation aux <strong>stages internationaux</strong> ainsi qu'aux <strong>tournois internationaux</strong> prévus durant la saison 2026-2027. Aucune dérogation ne sera accordée, sauf cas de force majeure dûment justifié.</p>
                                <hr className="border-black/10" />
                                <p><strong>NL —</strong> Door dit formulier te bevestigen, schrijft u uw kind in en gaat u akkoord met de verplichte deelname aan <strong>internationale stages</strong> en <strong>internationale toernooien</strong> tijdens het seizoen. Uitzonderingen zijn niet toegestaan, behalve bij overmacht met geldige reden.</p>
                            </div>
                            <RadioGroup
                                name="engagement"
                                options={accordOptions}
                                value={form.engagement}
                                onChange={setRadio('engagement')}
                                error={errors.engagement}
                            />
                        </div>
                    </Field>

                    {/* Planning NL */}
                    <Field label="Categorieën & Trainingsplanning (NL)" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <CheckboxGroup
                                options={planningNLOptions}
                                values={form.planningNL}
                                onChange={setCheck('planningNL')}
                                error={errors.planningNL}
                            />
                        </div>
                    </Field>

                    {/* Divider */}
                    <div className="border-t border-black/10 my-2" />

                    {/* Conditions */}
                    <LegalBlock title="Conditions d'inscription / Voorwaarden van inschrijving">
                        <p><strong>FR —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Les entraînements débutent le <strong>01 septembre 2026</strong> et s'achèvent le <strong>30 juin 2027</strong></li>
                            <li>Les dates d'entraînements sont sous réserve de confirmation et susceptibles d'être modifiées</li>
                            <li>Frais de cotisation annuels (cotisation, assurance et équipements) : <strong>570 € / an</strong></li>
                            <li>
                                Options disponibles :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Ballon : <strong>20 €</strong></li>
                                    <li>Sac : <strong>25 €</strong></li>
                                    <li>Veste de pluie : <strong>25 €</strong></li>
                                    <li>Deuxième pack équipement : <strong>95 €</strong></li>
                                </ul>
                            </li>
                            <li>Le montant total doit être viré sur le compte bancaire — <strong>IBAN :</strong> BE54 0689 3810 3797</li>
                        </ul>
                        <p><strong>IMPORTANT :</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Joindre une vignette d'assurance maladie (le premier jour des entraînements)</li>
                            <li>Joindre une photocopie d'une pièce d'identité (parent ou tuteur)</li>
                            <li>Pas de remboursement</li>
                            <li>Matchs amicaux toutes les cinq semaines</li>
                            <li>Chaque année commencée à partir de la première session est due</li>
                            <li>Aucune raison ne sera acceptée pour le non-paiement d'une inscription</li>
                            <li>Après 15 minutes de retard des parents à la fin des entraînements, l'enfant n'est plus sous la responsabilité de l'académie</li>
                            <li>Participation au tournoi : <strong>6 € / enfant</strong></li>
                        </ul>
                        <hr className="border-black/10" />
                        <p><strong>NL —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>De training begint op <strong>01 september 2026</strong> en eindigt op <strong>30 juni 2027</strong></li>
                            <li>De trainingsdatums kunnen worden gewijzigd</li>
                            <li>Jaarlijkse contributie : <strong>€ 570 / jaar</strong></li>
                            <li>
                                Opties :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Bal : <strong>€ 20</strong></li>
                                    <li>Tas : <strong>€ 25</strong></li>
                                    <li>Regenjas : <strong>€ 25</strong></li>
                                    <li>Tweede uitrustingpakket : <strong>€ 95</strong></li>
                                </ul>
                            </li>
                            <li>Bankrekeningnummer — <strong>IBAN :</strong> BE54 0689 3810 3797</li>
                        </ul>
                        <p><strong>BELANGRIJK :</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Een sticker van de ziektekostenverzekering meebrengen (op de eerste dag van de training)</li>
                            <li>Een fotokopie van het identiteitsbewijs (ouder of voogd) meebrengen</li>
                            <li>Geen restitutie</li>
                            <li>Vriendschappelijke wedstrijden om de vijf weken</li>
                            <li>Elk jaar begonnen vanaf de eerste sessie is verschuldigd</li>
                            <li>Geen enkele reden wordt aanvaard voor niet-betaling van een inschrijving</li>
                            <li>Als ouders 15 minuten te laat zijn na de training, valt het kind niet langer onder de verantwoordelijkheid van de academie</li>
                            <li>Deelname aan het toernooi : <strong>€ 6 / kind</strong></li>
                        </ul>
                    </LegalBlock>

                    {/* Accord conditions */}
                    <Field label="Accord conditions d'inscription" sublabel="/ Akkoord inschrijvingsvoorwaarden" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <RadioGroup
                                name="accordConditions"
                                options={accordOptions}
                                value={form.accordConditions}
                                onChange={setRadio('accordConditions')}
                                error={errors.accordConditions}
                            />
                        </div>
                    </Field>

                    {/* Droit à l'image */}
                    <LegalBlock title="Autorisation de droit à l'image / Toestemming beeldrecht">
                        <p>
                            <strong>FR —</strong> En tant que parent ou tuteur légal du participant inscrit via ce formulaire, j'accorde à <strong>ESOA NINOVE</strong> l'autorisation d'utiliser l'image de mon enfant dans une vidéo, photo ou autres supports numériques dans toutes nos publications, y compris sur internet, à des fins non commerciales, dans le cadre de la promotion de nos activités : <em>« Entraînement de foot, événements et tournois que nous organisons »</em>.
                        </p>
                        <p>
                            Je suis informé(e) que je peux, à tout moment, exercer mon droit d'accès, de rectification ou retirer mon consentement en contactant : <a href="mailto:esoa9400@gmail.com" className="text-orange-500 underline">esoa9400@gmail.com</a>
                        </p>
                        <p>
                            <strong>Signature du parent / tuteur :</strong> Répondre en écrivant votre nom complet + <em>« accorde le consentement et autorisation pour mon enfant mineur »</em> + nom de l'enfant.
                        </p>
                        <hr className="border-black/10" />
                        <p>
                            <strong>NL —</strong> Als ouder of wettelijke voogd van de via dit formulier ingeschreven deelnemer, geeft u <strong>ESOA NINOVE</strong> toestemming om de afbeelding van uw kind te gebruiken in een video, foto of andere digitale media in al onze publicaties, inclusief internet, voor niet-commerciële doeleinden, als onderdeel van de promotie van onze activiteiten : <em>"Voetbaltrainingen, evenementen en toernooien die wij organiseren"</em>.
                        </p>
                        <p>
                            U kunt op elk moment uw toestemming intrekken via : <a href="mailto:esoa9400@gmail.com" className="text-orange-500 underline">esoa9400@gmail.com</a>
                        </p>
                        <p>
                            <strong>Handtekening van ouder/voogd :</strong> Schriftelijk beantwoorden : uw volledige naam + <em>"verleent toestemming en machtigingen voor mijn minderjarige kind"</em> + naam kind.
                        </p>
                    </LegalBlock>

                    {/* Signature image */}
                    <Field label="Signature droit à l'image" required>
                        <textarea
                            rows={3}
                            placeholder="Votre nom complet + « accorde le consentement et autorisation pour mon enfant mineur » + nom de l'enfant"
                            value={form.signatureImage}
                            onChange={set('signatureImage')}
                            className={inputClass + ' resize-none'}
                        />
                        {errors.signatureImage && <p className="inter text-xs text-red-500">{errors.signatureImage}</p>}
                    </Field>

                    {/* Accord image */}
                    <Field label="Accord droit à l'image" sublabel="/ Akkoord beeldrecht" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <RadioGroup
                                name="accordImage"
                                options={imageOptions}
                                value={form.accordImage}
                                onChange={setRadio('accordImage')}
                                error={errors.accordImage}
                            />
                        </div>
                    </Field>

                    {/* RGPD */}
                    <LegalBlock title="Politique RGPD / GDPR-beleid">
                        <p>
                            <strong>FR —</strong> Vous autorisez <strong>ESOA NINOVE</strong> à récolter les données via le formulaire d'inscription. Celles-ci sont enregistrées dans un fichier informatisé/papier au sein de notre centre sportif.
                        </p>
                        <p>Le centre sportif s'engage à ne pas vendre, louer, céder ni donner accès à vos données sans votre consentement préalable à des tiers, à moins d'y être contraint en raison d'une obligation légale.</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Base juridique :</strong> consentement — contrat — respect d'une obligation légale</li>
                            <li><strong>Durée de conservation :</strong> pendant la durée des deux prochaines saisons, renouvelable automatiquement</li>
                        </ul>
                        <p><strong>Finalité :</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Traitement des inscriptions et suivi sportif du joueur</li>
                            <li>Suivi de la vie de ESOA NINOVE</li>
                            <li>Facturation des cotisations</li>
                            <li>Gestion des assurances souscrites</li>
                        </ul>
                        <p><strong>Transfert vers un pays tiers :</strong> Non en règle générale — OUI en cas de participation volontaire à une activité sportive internationale.</p>
                        <p>Conformément au Règlement européen n°2016/679/UE du 27 avril 2016, vous bénéficiez d'un droit d'accès, de rectification et d'effacement de vos données.</p>
                        <hr className="border-black/10" />
                        <p>
                            <strong>NL —</strong> Via het registratieformulier geeft u <strong>ESOA NINOVE</strong> toestemming om de gegevens te verzamelen. Deze worden vastgelegd in een geautomatiseerd/papieren dossier binnen ons sportcentrum.
                        </p>
                        <p>Sportcentrum verbindt zich ertoe uw gegevens niet zonder uw voorafgaande toestemming aan derden te verkopen, verhuren of ter beschikking te stellen.</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Wettelijke basis:</strong> toestemming — contract — wettelijke verplichting</li>
                            <li><strong>Bewaartermijn:</strong> gedurende de twee komende seizoenen, automatisch verlengd</li>
                        </ul>
                        <p><strong>Doel:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Verwerking van inschrijvingen en sportmonitoring van de geregistreerde speler</li>
                            <li>Toezicht op de werking van ESOA NINOVE</li>
                            <li>Facturatie van bijdragen</li>
                            <li>Beheer van afgesloten verzekeringen</li>
                        </ul>
                        <p><strong>Overdracht naar een derde land:</strong> Nee als algemene regel — Ja bij vrijwillige deelname aan een internationale sportactiviteit.</p>
                        <p>In overeenstemming met de Europese Verordening nr. 2016/679/EU van 27 april 2016 heeft u recht op toegang, rectificatie en wissing van uw gegevens.</p>
                    </LegalBlock>

                    {/* Accord RGPD */}
                    <Field label="Accord RGPD" sublabel="/ Akkoord GDPR" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <RadioGroup
                                name="accordRgpd"
                                options={accordOptions}
                                value={form.accordRgpd}
                                onChange={setRadio('accordRgpd')}
                                error={errors.accordRgpd}
                            />
                        </div>
                    </Field>

                    {/* Confirmation finale */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.confirmation}
                                onChange={set('confirmation')}
                                className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
                            />
                            <span className="inter text-sm font-semibold text-black">
                                Pour accord — je confirme l'ensemble du formulaire.<span className="text-orange-500 ml-1">*</span><br />
                                <span className="font-normal text-black/50">Voor akkoord — ik bevestig het volledige formulier.</span>
                            </span>
                        </label>
                        {errors.confirmation && <p className="inter text-xs text-red-500 ml-7">{errors.confirmation}</p>}
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
