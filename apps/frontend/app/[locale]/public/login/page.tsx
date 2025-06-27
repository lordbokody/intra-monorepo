'use client'

import Link from "next/link";
import { FormikProvider, Form } from 'formik';
import {InputEmail} from "@intra/ui/components/forms/inputs/InputEmail";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/buttonSubmit/ButtonSubmit";
import {formStyles} from "../../../../components/styles/formStyles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useLocale, useTranslations} from "next-intl";
import {ButtonLoginGoogle} from "@intra/ui/components/forms/buttons/buttonLoginGoogle/ButtonLoginGoogle";
import {useLoginForm} from "./form";

/**
 * Login oldal
 */
export default function Home() {
    // Betöltjük a fordításokat
    const locale = useLocale();
    const t = useTranslations('all');

    // Betöltjük a formot
    const {
        formik,
        isError,
        errorText,
        buttonState,
        buttonGoogleState,
        signInWithGoogle
    } = useLoginForm()

    // Létrehozzuk a sablont
    return (
      <LayoutForm>
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
                  <Link className={formStyles.link} href={`/${locale}/public/forgot-password`}>{t("forgotPassword")}</Link>
                  <Link className={formStyles.link} href={`/${locale}/public/registration`}>{t("registration")}</Link>
              </div>
          </div>
      </LayoutForm>
  );
}
