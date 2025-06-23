import localFont from 'next/font/local';

const PoppinsFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Poppins/Poppins-Regular.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Poppins/Poppins-Medium.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Poppins/Poppins-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'block',
    variable: '--font-poppins',
});

const DrukFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Druk/DrukLCG-BoldItalic.ttf',
            weight: '700',
            style: 'italic',
        },
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
    display: 'block',
    variable: '--font-druk',
});

const DrukWideFont = localFont({
    src: [
        {
            path: '../../assets/fonts/Druk/DrukWideLCG-BoldItalic.ttf',
            weight: '800',
            style: 'italic',
        },
        {
            path: '../../assets/fonts/Druk/DrukWideLCG-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Druk/DrukWideLCG-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
    ],
    display: 'block',
    variable: '--font-druk-wide',
});

export const fontString = `${PoppinsFont.className} ${PoppinsFont.variable} ${DrukFont.className} ${DrukFont.variable} ${DrukWideFont.className} ${DrukWideFont.variable}`;
