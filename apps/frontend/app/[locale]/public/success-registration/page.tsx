import { Check } from 'lucide-react';
import {getOuterDivClassNames, getIconClassNames, getLabelClassNames, getDescriptionClassNames} from "./styles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";

export default function SuccessRegistrationPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <div className={getOuterDivClassNames()}>
                <Check className={getIconClassNames()} />
                <div>
                    <p className={getLabelClassNames()}>{t("registrationSuccess")}</p>
                    <p className={getDescriptionClassNames()}>{t("registrationInfo")}</p>
                </div>
            </div>
        </LayoutForm>
    );
}