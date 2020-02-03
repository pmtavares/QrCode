import React, { Component, Fragment }  from 'react'
import {View, Text, StatusBar, TouchableOpacity, Linking} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles'

class  Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));


        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }

    render(){
        const { scan, ScanResult, result } = this.state;
        const desccription = 'QR code App that I created for testing purposes @Pedro.'
        
        return (
            
            <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.textTitle}>My React-Native QR Code !</Text>
                {!scan && !ScanResult &&
                    <View style={styles.cardView} >
                        <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>
                        <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                        </TouchableOpacity>

                    </View>
                }

                {ScanResult &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Result !</Text>
                        <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                            <Text>Type : {result.type}</Text>
                            <Text>Result : {result.data}</Text>
                            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                            <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                            </TouchableOpacity>

                        </View>
                    </Fragment>
                }


                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { this.scanner = node }}
                        onRead={this.onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                                Go to wikipedia.org/wiki/QR_code</Text>
                        }
                        cameraStyle={{height: 150, width:280, alignSelf: 'center'}}
                        markerStyle={{borderWidth:5, borderColor:'red'}}
                        bottomContent={
                            <View>                              
                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                        <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                </TouchableOpacity>
                            </View>

                        }
                    />
                }
            </Fragment>
        </View>
        )
    }
};


export default Home;
