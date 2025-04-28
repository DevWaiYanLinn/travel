export const delay = (n: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
};

export const list = (length: number) => Array.from({ length }, (_, i) => i + 1);

export const filterParms = (obj: Object) =>
    Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) =>
                value !== undefined && value !== "" && value !== null
        )
    );

export const buildQuerySting = (obj: any) =>
    new URLSearchParams(obj).toString();
