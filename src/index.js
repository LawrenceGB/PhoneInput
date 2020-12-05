import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Modal, Pressable, Alert, StatusBar, Platform } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { countries } from '../layouts/country-code';
import { Icon } from 'react-native-elements'

export default function PhoneInput(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('+971');
    const [phone, setPhone] = useState('');
    const [data, setData] = useState(countries);


    const getPhoneNumber = (event) => {
        var regExp = /^0[0-9].*$/;
        var mobile = '';
        setPhone(event.nativeEvent.text);
        if (regExp.test(phone)) {
            var number = phone.substring(1);
            mobile = countryCode + number;
            console.log(mobile);
            props.phoneNumber(mobile);
        } else {
            mobile = countryCode + phone;
            console.log(mobile);
            props.phoneNumber(mobile);
        }

    }

    return (

        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                style={{ marginTop: StatusBar.currentHeight }}
            >
                <ScrollView>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Input placeholder="Enter country name" onChange={(event) => {
                                var value = event.nativeEvent.text;
                                var searchResult = data.filter((item) => {
                                    return item.name.toLowerCase().match(value.toLowerCase());
                                });

                                if (searchResult.length > 0) {
                                    setData(searchResult);
                                }


                            }} />
                            {
                                data.map((item, i) => (
                                    <ListItem key={i} bottomDivider onPress={() => {
                                        setCountryCode(item.dial_code);
                                        setModalVisible(false);
                                    }
                                    } >
                                        <ListItem.Content>
                                            <ListItem.Title>{item.dial_code} {'\t'} {item.name}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />

                                    </ListItem>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>

            </Modal>

            <Pressable
                style={style.country_code}
                onPress={() => {
                    setModalVisible(true);
                }}>

                <Text style={style.countryCodeLable}>
                    {countryCode}
                    <Icon style={style.arrowIcon} type='font-awesome' name='caret-down' />
                </Text>
            </Pressable>
            <Input
                placeholder="Enter phone number"
                style={style.input}
                rightIcon={{ type: 'font-awesome', name: 'mobile' }}
                onChange={getPhoneNumber}
            />
        </View>
    );
}

const style = StyleSheet.create({

    country_code: {
        position: 'absolute',
        marginTop: 10,
        zIndex: 3
    },
    input: {
        position: 'relative',
        marginLeft: '25%',
        width: Dimensions.get('screen').width / 2 + 50,
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35
    },
    modalView: {
        backgroundColor: "white"

    },
    countryCodeLable: {
        fontSize: 18
    },
    arrowIcon: {
        marginTop: 10
    }
});