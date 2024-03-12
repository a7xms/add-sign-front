import rutoken from './rutoken';
import {useEffect, useRef, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const RutokenWrapper = ({buttonName, data, submit}) => {
    const [plugin, setPlugin] = useState(null);
    const [extensionInstalled, setExtensionInstalled] = useState(false);
    const [pluginInstalled, setPluginInstalled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [deviceLabels, setDeviceLabels] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [device, setDevice] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [pinCode, setPinCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await plugin.login(device, pinCode);
        var options = {};
        let signedData = await plugin.sign(device, certificate, data, plugin.DATA_FORMAT_PLAIN, options);
        submit(signedData);
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
        setDevice(devices[e.target.value]);
        let certificates = await plugin.enumerateCertificates(devices[e.target.value], plugin.CERT_CATEGORY_UNSPEC);
        setCertificates(certificates);
    }

    const handleCertificateSelect = async (e) => {
        setCertificate(certificates[e.target.value]);
    }

    const handlePinCodeChange = (e) => {
        setPinCode(e.target.value);
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
        <form onSubmit={handleSubmit}
              style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
            <FormControl style={{minWidth: '120px'}}>
                <InputLabel htmlFor="devices">Devices</InputLabel>
                <Select
                    id="devices"
                    name="devices"
                    defaultValue=""
                    onChange={handleDeviceSelect}
                >
                    {deviceLabels.map((deviceLabel, index) => <MenuItem value={index}
                                                                        key={index}>{deviceLabel}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl style={{minWidth: '120px'}}>
                <InputLabel htmlFor="certificates">Certificates</InputLabel>
                <Select
                    id="certificates"
                    name="certificates"
                    defaultValue=""
                    onChange={handleCertificateSelect}
                >
                    {certificates.map((certificate, index) => <MenuItem value={index}
                                                                        key={index}>{certificate}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl style={{minWidth: '120px'}}>
                <TextField
                    id="pin-code"
                    name="pin-code"
                    label="Pin Code"
                    type="number"
                    onChange={handlePinCodeChange}
                />
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                {buttonName}
            </Button>
        </form>
    );

};

export default RutokenWrapper;