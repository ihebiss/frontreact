// ./hooks/useAuth.jsx
import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://localhost:8080/",
    realm: "myrealm",
    clientId: "myhanen",
});

export default function useAuth() {
    const isRun = useRef(false);
    const [token, setToken] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        if (isRun.current) return;
        isRun.current = true;

        client.init({ onLoad: "login-required" })
            .then((authenticated) => {
                console.log("response :", authenticated);
                setLogin(authenticated);
                setToken(client.token);
                localStorage.setItem('token', client.token);
            })
            .catch((error) => {
                console.error("Keycloak initialization failed:", error);
            });
    }, []);

    return [isLogin, token];
}