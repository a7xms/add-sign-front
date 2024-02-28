import rutoken from './rutoken';
import {useEffect, useRef, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {set} from "react-hook-form";

const RutokenWrapper = () => {
    const [plugin, setPlugin] = useState(null);
    const [extensionInstalled, setExtensionInstalled] = useState(false);
    const [pluginInstalled, setPluginInstalled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [deviceLabels, setDeviceLabels] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [certificate, setCertificate] = useState(null);

    const handleSubmit = () => {
        console.log("Hello world!");
    }

    const initializeRutoken = async () => {
        await rutoken.ready;
        if (window.chrome || typeof InstallTrigger !== 'undefined') {
            let isExtensionInstalled = await rutoken.isExtensionInstalled();
            setExtensionInstalled(isExtensionInstalled);
        } else {
            setExtensionInstalled(true);
        }

        let isPluginInstalled = await rutoken.isPluginInstalled();
        setPluginInstalled(isPluginInstalled);

        let pluginObject = await rutoken.loadPlugin();
        setPlugin(pluginObject);
    }

    const getAllDevices = async () => {
        let devices = await plugin.enumerateDevices();
        let deviceLabels = await Promise.all(devices.map(dev =>
            plugin.getDeviceInfo(dev, plugin.TOKEN_INFO_LABEL)
        ));
        setDevices(devices);
        setDeviceLabels(deviceLabels);
    }

    const handleDeviceSelect = async (e) => {
        let device = devices[e.target.value];
        let [a, b, c, d] = await Promise.all([
            this.plugin.enumerateCertificates(device, plugin.CERT_CATEGORY_UNSPEC),
            this.plugin.enumerateCertificates(device, plugin.CERT_CATEGORY_CA),
            this.plugin.enumerateCertificates(device, plugin.CERT_CATEGORY_OTHER),
            this.plugin.enumerateCertificates(device, plugin.CERT_CATEGORY_USER),
        ]);

        setCertificates([].concat(a, b, c, d));
    }


    useEffect(() => {
        initializeRutoken();
    }, []);

    useEffect(() => {
        if(plugin) {
            getAllDevices();
        }
    }, [plugin]);




    if(!extensionInstalled) {
        return (
            <h1>Не удаётся най ти расширение 'Адаптер Рутокен Плагина'</h1>
        )
    }
    if(!pluginInstalled) {
        return (
            <h1>Не удаётся найти Плагин</h1>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel htmlFor="devices">Devices</InputLabel>
                <Select
                    id="devices"
                    name="devices"
                    defaultValue=""
                    onChange={handleDeviceSelect}
                >
                    {deviceLabels.map((deviceLabel, index) => <MenuItem value={index} key={index}>{deviceLabel}</MenuItem> )}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="certificates">Certificates</InputLabel>
                <Select
                    id="certificates"
                    name="certificates"
                    defaultValue=""
                    // onChange={handleChange}
                >
                    {certificates.map((certificate, index) => <MenuItem value={index} key={index}>{certificate}</MenuItem> )}
                </Select>
            </FormControl>

            <FormControl>
                <TextField
                    id="pin-code"
                    name="pin-code"
                    label="Pin Code"
                    type="number"
                    // onChange={handleChange}
                />
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );

};

export default RutokenWrapper;