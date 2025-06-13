'use client'

import Link from "next/link";
import { FormikProvider, Form } from 'formik';
import {InputEmail} from "@intra/ui/components/forms/inputs/InputEmail";
import {InputPassword} from "@intra/ui/components/forms/inputs/InputPassword";
import {ButtonSubmit} from "@intra/ui/components/forms/buttons/buttonSubmit/ButtonSubmit";
import {formStyles} from "@intra/ui/styles/formStyles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";
import {ButtonLoginGoogle} from "@intra/ui/components/forms/buttons/buttonLoginGoogle/ButtonLoginGoogle";
import ButtonLoginFacebook from "../../../../components/forms/buttons/buttonLoginFacebook/ButtonLoginFacebook";
import {useLoginForm} from "./form";
import {Gradient} from "@intra/ui/gradient";

export default function Home() {
    // Betöltjük a fordításokat
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
                      <h2 className={formStyles.label}>{t("login")}</h2>
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
                      <p className={formStyles.error(isError)}>{errorText}</p>
                      <ButtonSubmit state={buttonState}>
                          {t("login")}
                      </ButtonSubmit>
                  </Form>
              </FormikProvider>

              <ButtonLoginGoogle
                  state={buttonGoogleState}
                  onClick={() => {
                      return signInWithGoogle()
                  }}/>
              {/*<ButtonLoginFacebook />*/}
              <div className={formStyles.linkRow}>
                  <Link className={formStyles.link} href="/public/forgot-password">{t("forgotPassword")}</Link>
                  <Link className={formStyles.link} href="/public/registration">{t("registration")}</Link>
              </div>
          </div>
      </LayoutForm>
  );
}
