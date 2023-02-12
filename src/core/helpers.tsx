export const parseParameter = (param: string): number | null => {
    const nodes = document.querySelectorAll("script");
    const container = [...nodes].find(
        script => script.innerHTML.indexOf(param) > -1
    );
    if (container) {
        const result = container.innerHTML.match(
            new RegExp(`"${param}":.?"([1-9]*)"`)
        );
        if (result && result[1]) return parseInt(result[1]);
        console.warn(`${param} not found!`);
    } else {
        console.warn(`${param} not found!`);
        return null;
    }
    return null;
};
