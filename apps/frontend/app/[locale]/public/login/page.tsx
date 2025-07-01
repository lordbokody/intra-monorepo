"use client"

import Link from "next/link";
import { FormikProvider, Form } from 'formik';
import {InputEmail} from "@intra/ui/components/forms/inputs/InputEmail";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/ButtonSubmit";
import {formStyles} from "@intra/ui/components/styles/formStyles";
import {FormCard} from "@intra/ui/components/layout/FormCard/FormCard";
import {ButtonLoginGoogle} from "@intra/ui/components/forms/buttons/ButtonLoginGoogle";
import {useLoginForm} from "./form";
import {useAppTranslations} from "@intra/ui/utils/useAppTranslations";
import {customRedirect} from "../../../../i18n/navigation";
import {sleep} from "@intra/shared/utils/sleep.util";

/**
 * Login oldal
 */
export default function Home() {
    // Betöltjük a fordításokat
    const { locale, t } = useAppTranslations();

    // Betöltjük a formot
    const {
        formik,
        isError,
        errorText,
        buttonState,
        buttonGoogleState,
        signInWithGoogle
    } = useLoginForm()

    const beforeRouteChange = async () => {
        console.log('before route change start')
        await sleep(3000)
        console.log('before route change end')
    }

    const redirectToForgotPassword = () =>
        customRedirect(beforeRouteChange, `/public/forgot-password`, locale);

    // Létrehozzuk a sablont
    return (
      <FormCard>
          <div className={formStyles.form}>
              <FormikProvider value={formik}>
                  <Form>
                      {/*Oldal neve*/}
                      <h2 className={formStyles.label}>{t("login")}</h2>

                      {/*Input mezők*/}
                      <InputEmail
                          label={t("email")}
                          id="email"
                          name="email"
                      />
                      <InputPassword
                          label={t("password")}
                          id="password"
                          name="password"
                      />

                      {/*Információs szövegek*/}
                      <p className={formStyles.error(isError)}>{errorText}</p>

                      {/*Submit gomb*/}
                      <ButtonSubmit state={buttonState}>
                          {t("login")}
                      </ButtonSubmit>
                  </Form>
              </FormikProvider>

              {/*Google login gomb*/}
              <ButtonLoginGoogle
                  state={buttonGoogleState}
                  onClick={() => {
                      return signInWithGoogle()
                  }}/>

              {/*Linkek*/}
              <div className={formStyles.linkRow}>
                  <a className={formStyles.link} onClick={async () => { await redirectToForgotPassword() }}>{t("forgotPassword")}</a>
                  <Link className={formStyles.link} href={`/${locale}/public/registration`}>{t("registration")}</Link>
              </div>
          </div>
      </FormCard>
  );
}
