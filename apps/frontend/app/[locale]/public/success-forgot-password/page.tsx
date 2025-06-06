import {styles} from "./styles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";
import Link from "next/link";

export default function SuccessRegistrationPage() {
    // Betöltjük a fordításokat
    const t = useTranslations('all');

    // Létrehozzuk a sablont
    return (
        <LayoutForm>
            <div className={styles.form}>
                <h2 className={styles.label}>{t("forgot-password-email-subject")}</h2>
                <p className={styles.description}>{t("forgot-password-success")}</p>
                <div className={styles.linkRow}>
                    <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                </div>
            </div>
        </LayoutForm>
    );
}