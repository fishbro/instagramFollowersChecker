export const parseParameter = (param: string): number | null => {
    const nodes = document.querySelectorAll("script");
    const container = [...nodes].find(
        script => script.innerHTML.indexOf(param) > -1
    );
    if (container) {
        const result = container.innerHTML.match(
            new RegExp(`"${param}":.?"([0-9]*)"`)
        );
        if (result && result[1]) return parseInt(result[1]);
        console.warn(`${param} not found!`);
    } else {
        console.warn(`${param} not found!`);
        return null;
    }
    return null;
};

export const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomBoolean = () => Math.random() >= 0.5;
