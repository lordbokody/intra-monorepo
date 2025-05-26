'use client'

import { useFormik, FormikProvider, Form } from 'formik';
import { InputText } from "../../../../components/forms/inputs/InputText";
import { InputEmail } from "../../../../components/forms/inputs/InputEmail";
import { InputPassword } from "../../../../components/forms/inputs/InputPassword";
import { InputDate } from "../../../../components/forms/inputs/InputDate";
import { InputCheckbox } from "../../../../components/forms/inputs/InputCheckbox";
import { ButtonSubmit } from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {getButtonState, ButtonStateType} from "../../../../utils/getButtonState";
import { axiosRequest } from "../../../../utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {styles} from "./styles";
import { sleep } from "@repo/shared/utils/sleep.util";
import {useLocale, useTranslations} from 'next-intl';
import { LayoutForm } from "../../../../components/layout/layoutForm/LayoutForm";
import {signIn, useSession} from "next-auth/react";
import {finishRegisterSchema} from "./schema";
import {FinishRegistrationResponse} from "@repo/shared/types/auth.types";

export default function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isForwarding, setIsForwarding] = useState(false);
    const [buttonState, setButtonState] = useState<ButtonStateType>('enabled');
    const router = useRouter();
    const t = useTranslations('all');
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
            password: '',
            confirmPassword: '',
            birthday: '',
            acceptTerms: false,
            acceptPrivacy: false
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const response = await axiosRequest<FinishRegistrationResponse>({
                    method: 'patch',
                    route: `/auth/finishRegistration`,
                    token: session?.backendJwt,
                    data: {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        birthday: values.birthday
                    }
                });
                if (!response.success) {
                    console.log('error', response.message)
                    setIsError(true);
                    await sleep(3000);
                    setIsError(false);
                } else {
                    const signInResult = await signIn("credentials", {
                        redirect: false,
                        token: response.token,
                        role: response.user.role,
                        registrationStatus: response.user.registrationStatus,
                    });

                    if (signInResult?.ok) {
                        console.log('session', session)
                        setIsSuccess(true);
                        await sleep(3000);
                        setIsForwarding(true);
                        router.push('/private/home');
                    } else {
                        setIsError(true);
                        //setErrorText("Authentication failed.");
                        await sleep(3000);
                        setIsError(false);
                    }
                }
            } catch (error) {
                console.log('error', error)
                setIsError(true);
                await sleep(3000);
                setIsError(false);
            }
        },
        validationSchema: finishRegisterSchema(t),
        validateOnBlur: true,
        validateOnChange: true,
    });

    useEffect(() => {
        const buttonState = getButtonState(formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isForwarding, isError);
        setButtonState(buttonState);
    }, [formik.isValid, formik.dirty, formik.isSubmitting, isSuccess, isError, isForwarding]);

    return (
        <LayoutForm>
            <FormikProvider value={formik}>
                <Form className={styles.form} >
                    <h2 className={styles.label}>Regisztráció véglegesítése</h2>

                    <InputText label={t('name')} id="name" name="name" value={formik.values.name} required={true} />
                    <InputEmail label={t('email')} id="email" name="email" value={formik.values.email} required={true} disabled={true} preLoad={true} />
                    <InputPassword label={t('password')} id="password" name="password" value={formik.values.password} required={true} />
                    <InputPassword label={t('confirmPassword')} id="confirmPassword" value={formik.values.confirmPassword} name="confirmPassword" required={true} />
                    <InputDate label={t('birthday')} id="birthday" name="birthday" value={formik.values.birthday} required={true} />
                    <InputCheckbox label={t('acceptTerms')} id="acceptTerms" name="acceptTerms" value={formik.values.acceptTerms} required={true} />
                    <InputCheckbox label={t('acceptPrivacy')} id="acceptPrivacy" name="acceptPrivacy" value={formik.values.acceptPrivacy} required={true} />

                    <p className={styles.required}>{t('*-required')}</p>

                    <ButtonSubmit state={buttonState}>
                        Véglegesít
                    </ButtonSubmit>
                </Form>
            </FormikProvider>
        </LayoutForm>
    )
}
