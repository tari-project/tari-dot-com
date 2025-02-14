import localFont from 'next/font/local';

const AllianceFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Alliance/alliance-no-1-regular.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Alliance/alliance-no-1-semibold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Alliance/alliance-no-1-bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-alliance',
});

const PoppinsFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Poppins/Poppins-Regular.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Poppins/Poppins-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-poppins',
});

const DrukFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Druk/DrukLCG-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Druk/DrukLCG-Heavy.ttf',
            weight: '800',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-druk',
});

export const fontString = `${AllianceFont.className} ${AllianceFont.variable} ${PoppinsFont.className} ${PoppinsFont.variable} ${DrukFont.className} ${DrukFont.variable}`;
