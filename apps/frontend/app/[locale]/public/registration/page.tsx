'use client'

import { useFormik, FormikProvider, Form } from 'formik';

import {registerSchemaClient} from "../../../../../../packages/shared/src/schemas/auth/register.client.schema";
import {InputText} from "../../../../components/forms/inputs/InputText";
import {InputEmail} from "../../../../components/forms/inputs/InputEmail";
import {InputPassword} from "../../../../components/forms/inputs/InputPassword";
import {InputDate} from "../../../../components/forms/inputs/InputDate";
import {InputCheckbox} from "../../../../components/forms/inputs/InputCheckbox";
import {ButtonSubmit} from "../../../../components/forms/buttons/buttonSubmit/ButtonSubmit";
import {getButtonState, ButtonStateType} from "../../../../utils/getButtonState";
import {axiosRequest} from "../../../../utils/axios";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {RegisterResponse} from "@intra/shared/types/auth.types";
import {FindOneByEmailResponse} from "@intra/shared/types/user.types";
import {styles} from "./styles";
import {sleep} from "@intra/shared/utils/sleep.util";
import {useLocale, useTranslations} from 'next-intl';

import Link from "next/link";
import {LayoutForm} from "../../../../components/layout/layoutForm/LayoutForm";

const checkEmailExists = async (email: string): Promise<boolean> => {
    const response = await axiosRequest<FindOneByEmailResponse>({
        method: 'get',
        route: `/user/find/${email}`,
    });
    return !response.success;
};


export default function RegisterPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isForwarding, setIsForwarding] = useState(false);
    const [buttonState, setButtonState] = useState<ButtonStateType>('disabled');
    const router = useRouter();
    const t = useTranslations('all');
    const locale = useLocale();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthday: '',
            acceptTerms: false,
            acceptPrivacy: false
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axiosRequest<RegisterResponse>({
                    method: 'post',
                    route: `/auth/register`,
                    data: {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        birthday: values.birthday
                    }
                });
                if(!response.success){
                    setIsError(true);
                    await sleep(2000);
                    setIsError(false);
                } else {
                    resetForm();
                    setIsSuccess(true);
                    await sleep(2000);
                    setIsForwarding(true);
                    router.push('/public/success-registration');
                }
            } catch (error) {
                console.log('error', error)
                setIsError(true);
                await sleep(2000);
                setIsError(false);
            }
        },
        validationSchema: registerSchemaClient(locale, checkEmailExists),
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
                    <h2 className={styles.label}>{t('registration')}</h2>

                    <InputText
                        label={t('name')}
                        id="name"
                        name="name"
                        required={true}
                    />
                    <InputEmail
                        label={t('email')}
                        id="email"
                        name="email"
                        required={true}
                        debounce={true}
                    />
                    <InputPassword
                        label={t('password')}
                        id="password"
                        name="password"
                        required={true}
                    />
                    <InputPassword
                        label={t('confirmPassword')}
                        id="confirmPassword"
                        name="confirmPassword"
                        required={true}
                    />
                    <InputDate
                        label={t('birthday')}
                        id="birthday"
                        name="birthday"
                        required={true}
                    />
                    <InputCheckbox
                        label={t('acceptTerms')}
                        id="acceptTerms"
                        name="acceptTerms"
                        required={true}
                    />
                    <InputCheckbox
                        label={t('acceptPrivacy')}
                        id="acceptPrivacy"
                        name="acceptPrivacy"
                        required={true}
                    />
                    <p className={styles.required}>{t('*-required')}</p>
                    <ButtonSubmit state={buttonState}>
                        {t('registration')}
                    </ButtonSubmit>
                    <div className={styles.linkRow}>
                        <Link className={styles.link} href="/public/login">{t('backToHome')}</Link>
                    </div>
                </Form>
            </FormikProvider>
        </LayoutForm>
    )
}