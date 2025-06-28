import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/**
 * next-intl navigáció
 */
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);