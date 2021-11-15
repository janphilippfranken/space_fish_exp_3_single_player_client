export const GO_TO_PAGE = "GO_TO_PAGE";
export const pages = {
    CONSENT: "CONSENT",
    INSTRUCTIONS: "INSTRUCTIONS",
    REGISTER: "REGISTER",
    GAME: "GAME",
    DEBRIEF: "DEBRIEF",
    END: "END"
};

export const goToPage = page => {
    return { type: GO_TO_PAGE, page: page };
};