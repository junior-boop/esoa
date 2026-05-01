
import banniere1 from '../assets/image/banniere_1.png';
import banniere2 from '../assets/image/image-import-11.jpg';
import { React_Container } from './React_UI';

export const banniereImages = {
    banniere1: banniere1.src,
    banniere2: banniere2.src,
};

interface BanniereProps {
    imageSrcDesktop?: string;
    imageSrcMobile?: string;
    title?: string;
    description?: string;
}

export function Banniere({
    imageSrcDesktop = banniereImages.banniere1,
    imageSrcMobile = banniereImages.banniere2,
    title = 'Former des champions, bâtir des hommes.',
    description = "Notre académie ne forme pas seulement des footballeurs. Elle forge des caractères. À travers la discipline du sport, nous accompagnons chaque jeune dans la construction de sa confiance, de sa persévérance et de ses ambitions — sur le terrain comme dans la vie",
}: BanniereProps) {
    return (
        <div className="relative">
            {/* Image responsive via picture */}
            <picture>
                <source media="(min-width: 650px)" srcSet={imageSrcDesktop} />
                <source media="(max-width: 465px)" srcSet={imageSrcMobile} />
                <img
                    src={imageSrcDesktop}
                    alt="Bannière"
                    className="w-full h-200 object-cover mt-16"
                />
            </picture>

            {/* Overlay texte */}
            <div className="absolute top-0 w-full py-15 lg:py-30 px-4 lg:px-0">
                <React_Container>
                    <div className="flex lg:justify-end">
                        <div className="lg:w-[50%]">
                            <h3
                                className="bebas-neue-regular text-5xl lg:text-8xl font-bold mb-10"
                            >
                                {title}
                            </h3>
                            <p className="inter text-xl">
                                {description}
                            </p>
                        </div>
                    </div>
                </React_Container>
            </div>
        </div>
    );
}
