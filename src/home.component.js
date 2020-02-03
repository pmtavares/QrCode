import React, { useState, Fragment }  from 'react'
import {View, Text, StatusBar, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles'


const Home = () =>  {
    const [scan, setScan] = useState(false);
    const [scanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);  

    
    const onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        setResult(e);
        setScan(false);
        setScanResult(true);

        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            setResult(e);
            setScan(false);
            setScanResult(true);
            
        }

    }

    const activeQR = () => {
        setScan(true);
        
    }
    const scanAgain = () => {
        setScan(true);
        setScanResult(false);
        
    }

    let scanner;

    const startScan = () => {
      if (scanner) {
        scanner._setScanning(false);
      }
    }

       // const { scan, ScanResult, result } = this.state;
        const desccription = 'QR code App that I created for testing purposes @Pedro.'
        
        return (            
            <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.textTitle}>My React-Native QR Code !</Text>
                {!scan && !scanResult &&
                    <View style={styles.cardView} >
                        <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>
                        <TouchableOpacity onPress={() => activeQR()} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                        </TouchableOpacity>

                    </View>
                }

                {scanResult &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Result !</Text>
                        <View style={scanResult ? styles.scanCardView : styles.cardView}>
                            <Text>Type : {result.type}</Text>
                            <Text>Result : {result.data}</Text>
                            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                            <TouchableOpacity onPress={()=>scanAgain()} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                            </TouchableOpacity>

                        </View>
                    </Fragment>
                }


                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { node }}
                        onRead={(e) => onSuccess(e)}
                        topContent={
                            <Text style={styles.centerText}>
                                Go to wikipedia.org/wiki/QR_code</Text>
                        }
                        cameraStyle={{height: 150, width:280, alignSelf: 'center'}}
                        markerStyle={{borderWidth:5, borderColor:'red'}}
                        bottomContent={
                            <View>                              
                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => startScan()}>
                                        <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                </TouchableOpacity>
                            </View>

                        }
                    />
                }
            </Fragment>
        </View>
        )
    
};

export default Home;

