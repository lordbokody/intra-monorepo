'use client'

import Link from "next/link";
import { FormikProvider, Form } from 'formik';
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {InputPassword} from "../../../../components/forms/inputs/InputPassword";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {styles} from "./styles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";
import {ButtonLoginGoogle} from "../../../../components/forms/buttons/buttonLoginGoogle/ButtonLoginGoogle";
import ButtonLoginFacebook from "../../../../components/forms/buttons/buttonLoginFacebook/ButtonLoginFacebook";
import {useLoginForm} from "./form";

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
          <div className={styles.form}>
              <FormikProvider value={formik}>
                  <Form>
                      <h2 className={styles.label}>{t("login")}</h2>
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
                      <p className={styles.error(isError)}>{errorText}</p>
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
              <div className={styles.linkRow}>
                  <Link className={styles.link} href="/public/forgot-password">{t("forgotPassword")}</Link>
                  <Link className={styles.link} href="/public/registration">{t("registration")}</Link>
              </div>
          </div>
      </LayoutForm>
  );
}
