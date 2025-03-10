export const scrollToElement = (id: string, offset: number = 0): void => {
    const elementId = id.startsWith('#') ? id.substring(1) : id;
    const element = document.getElementById(elementId);

    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};
