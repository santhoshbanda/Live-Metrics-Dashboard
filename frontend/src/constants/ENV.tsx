interface ENV {
    API_URL: string | undefined;
    APP_URL: string | undefined;
    WEB_SOCKET_URL: string | undefined;
}

const ENV: ENV = {
    API_URL: import.meta.env.VITE_API_URL,
    APP_URL: import.meta.env.VITE_APP_URL,
    WEB_SOCKET_URL: import.meta.env.VITE_WEB_SOCKET_URL,
}

console.log(ENV, 'ENV')

export default ENV;
