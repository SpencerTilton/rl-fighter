export function createDashboardLayer(font, playerEnv) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const coins = 13;
    const score = 24500;

    return function drawDashboard(context) {
        const {score, time} = playerEnv.playerController;

        font.print('WELCOME (TEST TEXT)', context, 16, LINE1);
    };
}