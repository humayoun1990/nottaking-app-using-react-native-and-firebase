import react from "react";
import { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, Platform, Button, ActivityIndicator, TextInput } from 'react-native'
import { ADD_BTN, NOTE_BTN } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";
import { BACKGROUND_COLOR } from "../../../res/drawables";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdMobBanner } from 'expo-ads-admob';
import FirebaseApp from "../../../api/index";
import { getAuth, signOut } from "firebase/auth";
import app from '../../../api/index'
import { query, collection, onSnapshot, getFirestore, deleteDoc, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { getWeather } from "../../services/weather";

const Main = (props) => {
    const db = getFirestore(app);
    const auth = getAuth();
    const email = auth.currentUser.email
    const [data, setData] = useState([])
    const [loding, setLoding] = useState(false)
    let unsub;
    useEffect(() => {
        loadAllKeyFromAsyncStorage();
    }, [])
    const loadAllKeyFromAsyncStorage = async () => {
        setLoding(true)
        const q = query(collection(db, email))
        try {
            let keys = []
            unsub = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    keys.push(doc.data())

                })
                setData(keys)
                setLoding(false)
                unsub();
                let w= getWeather('daska')

            })
        } catch (e) {
            console.log(e)
        }
        //==================================================
        // let keys = await AsyncStorage.getAllKeys()
        // if (keys.length != data.length)
        //     setData(keys)
    }
    const removeData = async (ke) => {
        await deleteDoc(doc(db, email, ke));
        alert(ke + ' Removed')
        loadAllKeyFromAsyncStorage()
        // let keys = await AsyncStorage.removeItem(ke)

    }
    const onSignoutPressed = async () => {
        try {
            signOut(auth)
            props.navigation.navigate("LOGIN")
            // Sign-out successful.
        } catch (error) {
            // An error happened.
        };
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                <View><Button title="Sign out" onPress={() => onSignoutPressed()} /></View>
                <View><Text>|</Text></View>
                <View></View>
            </View>
            {loding ? <ActivityIndicator color={'black'} /> : null}
            <FlatList
                data={data}
                numColumns={4}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onLongPress={() => {
                                Alert.alert(
                                    "Alert Title",
                                    "DO YOU WANT TO DELETE " + (item.title),
                                    [
                                        {
                                            text: "Cancel",
                                            style: "cancel"
                                        },
                                        {
                                            text: "DELETE",
                                            style: "cancel",
                                            onPress: () => {
                                                removeData(item.title)
                                            }
                                        }
                                    ]
                                )
                            }}
                            onPress={
                                () => {
                                    props.navigation.navigate('CREATNOTE', { title: item.title, description: item.description })
                                }
                            } >
                            <View style={{ margin: 5 }}>
                                <Image
                                    style={styles.BTN1}
                                    source={NOTE_BTN}
                                />
                                <Text style={styles.textStyle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item}
            />
            <ImageButton
                style={styles.BTN}
                source={ADD_BTN}
                onPress={() => props.navigation.navigate('CREATNOTE', { title: null, description: null })}

            />
            <View>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds // true or false
                />
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    }, BTN: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 20,
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.6
    }, textStyle: {
        alignSelf: "center",
        fontWeight: "bold",
        width: 80,
        color: '#781E77',
        textAlign: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.2
    }, BTN1: {
        height: 80,
        width: 80,
        margin: 7,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'darkgrey',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.8
    }
})
export default Main;
