import rutoken from './rutoken';
import {useEffect, useRef, useState} from "react";

const RutokenWrapper = () => {
    const [plugin, setPlugin] = useState();
    const [extensionInstalled, setExtensionInstalled] = useState();
    const [pluginInstalled, setPluginInstalled] = useState();
    const [devices, setDevices] = useState();
    const [certificates, setCertificates] = useState();

    function checkVersion(lastVersion) {
        if (plugin.version.toString() < lastVersion)
            console.log("download last version: " + lastVersion);
        else
            console.log("you have last version");
    }

    function getLastRtPluginVersion(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://download.rutoken.ru/Rutoken_Plugin/Current/version.txt', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var lastPluginVersion = this.response.split('Version: v.')[1].split('Release')[0].replace(/\s+/g, '');
                callback(lastPluginVersion);
            }
        };
        xhr.send();
    }

    const initializeRutoken = () => {
        rutoken.ready
            // Проверка установки расширение 'Адаптера Рутокен Плагина' в Google Chrome
            .then(function() {
                if (window.chrome || typeof InstallTrigger !== 'undefined') {
                    return rutoken.isExtensionInstalled();
                } else {
                    return Promise.resolve(true);
                }
            })
            // Проверка установки Рутокен Плагина
            .then(function(result) {
                if (result) {
                    return rutoken.isPluginInstalled();
                } else {
                    return Promise.reject("Не удаётся най ти расширение 'Адаптер Рутокен Плагина'");
                }
            })
            // Загрузка плагина
            .then(function(result) {
                if (result) {
                    return rutoken.loadPlugin();
                } else {
                    return Promise.reject("Не удаётся найти Плагин");
                }
            })
            //Можно начинать работать с плагином
            .then(function(result) {
                if (!result) {
                    return Promise.reject("Не удаётся загрузить Плагин");
                } else {
                    setPlugin(result);
                    return Promise.resolve();
                }
            })
            .then(function() {
                console.log("Плагин загрузился");
                getLastRtPluginVersion(checkVersion);
            }, function(msg) {
                console.log("Plugin status: ", msg);
            });
    }

    useEffect(() => {

    }, []);



    return plugin;

};

export default RutokenWrapper;