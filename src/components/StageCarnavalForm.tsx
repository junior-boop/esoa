
import { useState } from 'react';

interface FormData {
    email: string;
    nomPrenom: string;
    emailParent: string;
    dateNaissance: string;
    adresse: string;
    clubActuel: string;
    semaine: string;
    categorie: string;
    postePied: string;
    accord: boolean;
}

const initialForm: FormData = {
    email: '',
    nomPrenom: '',
    emailParent: '',
    dateNaissance: '',
    adresse: '',
    clubActuel: '',
    semaine: '',
    categorie: '',
    postePied: '',
    accord: false,
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
            {error && <p className="inter text-xs text-red-500">{error}</p>}
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

const semaineOptions = [
    { value: '22-26/02/2027', label: 'Du 22/02/2027 au 26/02/2027' },
    { value: 'deux-semaines', label: 'De twee weken / Les deux semaines' },
    { value: '01-05/03/2027', label: 'Du 01/03/2027 au 05/03/2027' },
    { value: 'autre', label: 'Autre / Other' },
];

const categorieOptions = [
    { value: 'U9-U11', label: 'U9 – U11' },
    { value: 'U12-U13', label: 'U12 – U13' },
    { value: 'U14+', label: 'U14+' },
];

export function StageCarnavalForm() {
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

    const validate = (): boolean => {
        const e: Partial<Record<keyof FormData, string>> = {};
        if (!form.email) e.email = 'Champ obligatoire';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
        if (!form.nomPrenom) e.nomPrenom = 'Champ obligatoire';
        if (!form.emailParent) e.emailParent = 'Champ obligatoire';
        else if (!/\S+@\S+\.\S+/.test(form.emailParent)) e.emailParent = 'Email invalide';
        if (!form.dateNaissance) e.dateNaissance = 'Champ obligatoire';
        if (!form.adresse) e.adresse = 'Champ obligatoire';
        if (!form.clubActuel) e.clubActuel = 'Champ obligatoire';
        if (!form.semaine) e.semaine = 'Veuillez choisir une semaine';
        if (!form.categorie) e.categorie = 'Veuillez choisir une catégorie';
        if (!form.accord) e.accord = 'Acceptation requise';
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
                    <p className="inter text-sm font-semibold text-orange-500 uppercase tracking-widest mb-2">ESOA Brussels</p>
                    <h1 className="bebas-neue-regular text-5xl sm:text-6xl text-black" style={{ lineHeight: 1 }}>
                        Stage de<br />Carnaval 2027
                    </h1>
                    <p className="inter text-black/60 mt-4 text-sm">
                        Inschrijving formulier / Formulaire d'inscription<br />
                        <span className="text-black/40">Verplicht veld / Champ obligatoire <span className="text-orange-500">*</span></span>
                    </p>
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

                    {/* Nom & Prénom */}
                    <Field label="Nom & Prénom" sublabel="/ Naam & Voornaam" required>
                        <input
                            type="text"
                            placeholder="DUPONT Jean"
                            value={form.nomPrenom}
                            onChange={set('nomPrenom')}
                            className={inputClass}
                        />
                        {errors.nomPrenom && <p className="inter text-xs text-red-500">{errors.nomPrenom}</p>}
                    </Field>

                    {/* Email parent */}
                    <Field label="Adresse mail du parent / E-mail ouder" required>
                        <input
                            type="email"
                            placeholder="parent@email.com"
                            value={form.emailParent}
                            onChange={set('emailParent')}
                            className={inputClass}
                        />
                        {errors.emailParent && <p className="inter text-xs text-red-500">{errors.emailParent}</p>}
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
                    <Field label="Club actuel" sublabel="/ Actuele club" required>
                        <input
                            type="text"
                            placeholder="Nom du club"
                            value={form.clubActuel}
                            onChange={set('clubActuel')}
                            className={inputClass}
                        />
                        {errors.clubActuel && <p className="inter text-xs text-red-500">{errors.clubActuel}</p>}
                    </Field>

                    {/* Choix semaine */}
                    <Field label="Choix de la semaine de stage" sublabel="/ Keuze van de trainingsweek" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <RadioGroup
                                name="semaine"
                                options={semaineOptions}
                                value={form.semaine}
                                onChange={setRadio('semaine')}
                                error={errors.semaine}
                            />
                        </div>
                    </Field>

                    {/* Catégorie */}
                    <Field label="Catégorie" required>
                        <div className="bg-white border border-black/15 rounded-xl px-4 py-4">
                            <RadioGroup
                                name="categorie"
                                options={categorieOptions}
                                value={form.categorie}
                                onChange={setRadio('categorie')}
                                error={errors.categorie}
                            />
                        </div>
                    </Field>

                    {/* Poste & Pied (optional) */}
                    <Field label="Poste & Pied de prédilection" sublabel="/ Positie op het veld & Beste voet (facultatif)">
                        <input
                            type="text"
                            placeholder="ex : Milieu offensif — Pied droit"
                            value={form.postePied}
                            onChange={set('postePied')}
                            className={inputClass}
                        />
                    </Field>

                    {/* Divider */}
                    <div className="border-t border-black/10 my-2" />

                    {/* Conditions */}
                    <LegalBlock title="Conditions d'inscription / Voorwaarden van inschrijving">
                        <p><strong>FR —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Inscription uniquement pour des entraînements spécifiques de football</li>
                            <li>Chaque enfant doit avoir son propre ballon</li>
                            <li>Tous les inscrits sont couverts par l'assurance de l'académie en cas d'accident survenu durant les entraînements</li>
                            <li>Tout stage commencé est dû — pas de remboursement</li>
                            <li>Frais d'inscription et de participation : <strong>100 € / semaine</strong></li>
                            <li>
                                La totalité doit être versée avant le début du stage sur ce compte bancaire :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li><strong>IBAN :</strong> BE54 0689 3810 3797</li>
                                    <li><strong>Communication :</strong> <code className="bg-black/5 px-1 rounded text-xs">ESOANINOVE PAASVOETBALKamp2026</code></li>
                                </ul>
                            </li>
                            <li>
                                S'entraîner en uniforme de l'académie est recommandé :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Survêtements : <strong>40 €</strong></li>
                                    <li>Maillot, short et bas : <strong>25 €</strong></li>
                                    <li>En option — Ballon : <strong>20 €</strong></li>
                                </ul>
                            </li>
                        </ul>
                        <hr className="border-black/10" />
                        <p><strong>NL —</strong></p>
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>Inschrijving uitsluitend voor specifieke voetbaltraining</li>
                            <li>Elk kind moet zijn eigen bal meebrengen</li>
                            <li>Alle inschrijvers zijn gedekt door de verzekering van de academie bij een ongeval tijdens de training</li>
                            <li>Bij aanvang van de cursus is geen terugbetaling mogelijk</li>
                            <li>Inschrijvings- en deelnamekosten : <strong>€ 100 / week</strong></li>
                            <li>
                                Het totale bedrag moet vóór aanvang van de cursus betaald zijn op dit bankrekeningnummer :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li><strong>IBAN :</strong> BE54 0689 3810 3797</li>
                                    <li><strong>Mededeling :</strong> <code className="bg-black/5 px-1 rounded text-xs">ESOANINOVE PAASVOETBALKamp2026</code></li>
                                </ul>
                            </li>
                            <li>
                                Training in academie-uniform wordt aanbevolen :
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                                    <li>Trainingspak : <strong>€ 40</strong></li>
                                    <li>Shirt, short en sokken : <strong>€ 25</strong></li>
                                    <li>In optie — Bal : <strong>€ 20</strong></li>
                                </ul>
                            </li>
                        </ul>
                    </LegalBlock>

                    {/* Accord */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.accord}
                                onChange={set('accord')}
                                className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
                            />
                            <span className="inter text-sm font-semibold text-black">
                                J'ai lu et j'accepte les conditions d'inscription.<span className="text-orange-500 ml-1">*</span><br />
                                <span className="font-normal text-black/50">Ik heb de inschrijvingsvoorwaarden gelezen en ga ermee akkoord.</span>
                            </span>
                        </label>
                        {errors.accord && <p className="inter text-xs text-red-500 ml-7">{errors.accord}</p>}
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
