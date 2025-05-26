'use client'

import Link from "next/link";
import { useFormik, FormikProvider, Form } from 'formik';
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {InputPassword} from "../../../../components/forms/inputs/InputPassword";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {getButtonState, ButtonStateType} from "../../../../utils/getButtonState";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {styles} from "./styles";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";
import {useTranslations} from "next-intl";
import {axiosRequest} from "../../../../utils/axios";
import type {LoginResponse} from "@intra/shared/types/auth.types";
import {sleep} from "@intra/shared/utils/sleep.util";
import {ButtonLoginGoogle} from "../../../../components/forms/buttons/buttonLoginGoogle/ButtonLoginGoogle";
import ButtonLoginFacebook from "../../../../components/forms/buttons/buttonLoginFacebook/ButtonLoginFacebook";
import {signIn} from "next-auth/react";
import {useSession} from "next-auth/react";

export default function Home() {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isForwarding, setIsForwarding] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<ButtonStateType>('disabled');
    const [buttonGoogleState, setButtonGoogleState] = useState<ButtonStateType>('enabled');
    const [errorText, setErrorText] = useState<string | null>(null);
    const router = useRouter();
    const t = useTranslations("all");
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axiosRequest<LoginResponse>({
                    method: 'post',
                    route: '/auth/login',
                    data: {
                        email: values.email,
                        password: values.password,
                    },
                });

                if (!response.success) {
                    console.log('error', response.message);
                    setIsError(true);
                    setErrorText(response.message as string);
                    await sleep(3000);
                    setIsError(false);
                } else {
                    const signInResult = await signIn("credentials", {
                        redirect: false,
                        token: response.token,
                        role: response?.user?.role,
                        registrationStatus: response?.user?.registrationStatus,
                    });

                    if (signInResult?.ok) {
                        console.log('session', session)
                        setIsSuccess(true);
                        await sleep(3000);
                        setIsForwarding(true);
                        router.push('/private/home');
                    } else {
                        setIsError(true);
                        setErrorText("Authentication failed.");
                        await sleep(3000);
                        setIsError(false);
                    }
                }
            } catch (error) {
                setIsError(true);
                setErrorText((error as Error).message);
                await sleep(3000);
                setIsError(false);
            }
        },
        validateOnBlur: true,
        validateOnChange: true,
    });

    useEffect(() => {
        const buttonState = getButtonState(formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isForwarding, isError);
        setButtonState(buttonState);
    }, [formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isError, isForwarding]);

    useEffect(() => {
        if(buttonGoogleState === 'submitting') {
            setButtonState('disabled');
        }
    }, [buttonGoogleState]);

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
                      setButtonGoogleState('submitting')
                      return signIn("google")
                  }}/>
              <ButtonLoginFacebook />
              <div className={styles.linkRow}>
                  <Link className={styles.link} href="/public/forgot-password">{t("forgotPassword")}</Link>
                  <Link className={styles.link} href="/public/registration">{t("registration")}</Link>
              </div>
          </div>
      </LayoutForm>

  );
}
