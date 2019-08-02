let currentPage = 1;
let numberOfPages = 1;
let isPrevExist = false;
let isNextExist = false;
let shownPages = [];

const setShownPages = () => {
    shownPages = [];
    isPrevExist = false;
    isNextExist = false;

    if (numberOfPages > 5) {
        if (currentPage < 5) {
            for (let i = 1; i <= 5; i++) {
                shownPages.push(i);
            }
        } else if (numberOfPages - currentPage < 4) {
            for (let i = numberOfPages - 4; i <= numberOfPages; i++) {
                shownPages.push(i);
            }
        } else {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                shownPages.push(i);
            }
        }
    } else {
        for (let i = 1; i <= numberOfPages; i++) {
            shownPages.push(i);
        }
    }

    if (currentPage !== 1) {
        isPrevExist = true;
    }
    if (currentPage !== numberOfPages) {
        isNextExist = true;
    }
};
