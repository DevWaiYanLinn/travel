export const delay = (n: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
};

export const list = (length: number) => Array.from({ length }, (_, i) => i + 1);
