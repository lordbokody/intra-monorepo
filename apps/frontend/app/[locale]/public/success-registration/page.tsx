import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";
import { formStyles as styles } from "@intra/ui/formStyles";
import Link from "next/link";

export default function SuccessRegistrationPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <div className={styles.form}>
                <h2 className={styles.label}>{t("registrationSuccess")}</h2>
                <p className={styles.description}>{t("registrationInfo")}</p>
                <div className={styles.linkRow}>
                    <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                </div>
            </div>
        </LayoutForm>
    );
}