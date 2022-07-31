export const preparePaging = (page: number, limit: number): { offset: number, limit: number } => {
    const resLimit = !!Number(limit) ? limit : 10;
    let resPage = !!Number(page) ? page : 0;
    if (!!page) {
        resPage = (page - 1) * resLimit;
        return { offset: resPage, limit: resLimit };
    }
        return  { offset: resPage, limit: resLimit };
};
