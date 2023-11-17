// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tracker = require('@middleware.io/agent-apm-nextjs');

function register() {
    tracker.track({
        serviceName: "frontend-project-nextjs-apm",
        accessToken: "murwpaubimiwrfrtoxbwpoiuoztzdjgmsyph",

        // target: "https://spbnu.middleware.io:443",
    });
    tracker.warn("Instrumentation file scanned successfully!");
}

module.exports = { register };
