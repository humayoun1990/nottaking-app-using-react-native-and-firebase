import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView, Button } from "react-native"
import { SAVE_BTN, BACKGROUND_COLOR, color_BLACK, color_white } from "../../../res/drawables"
import { AdMobBanner } from 'expo-ads-admob';
import { getAuth, signOut} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import app from "../../../api";


const CreatNote = (props) => {
    const auth = getAuth();
    const email = auth.currentUser.email
    const db = getFirestore(app);
    let { title:noteTitle,description:noteDescription } = props.route.params
    const [title, setTitle] = useState(noteTitle)
    const [description, setDescription] = useState(noteDescription)
    useEffect(() => {
    }, [])
    // const loadData = async () => {
    //     if (noteTitle) {
    //         let description = await AsyncStorage.getItem(noteTitle)
    //         setTitle(noteTitle)
    //         setDescription(description)
    //     }
    // }
    const onAddPressed = async () => {
        if (title != '' && description != '') {
            const documentRef = doc(db, email, title);
            const docSnap = await getDoc(documentRef);
            if (!docSnap.data()) {
                try {
                    const docRef = await setDoc(doc(db, email, title), {
                        title,
                        description
                    });
                    props.navigation.replace('MAIN')
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                alert('title already exist')
            }
        } else {
            alert('kindly add title and dsecription')
        }
        //-----adding notes with Async call-----//
        // if (title != '' && description != '') {
        //     try {
        //         let value = await AsyncStorage.getItem(title)
        //         if (value && !noteTitle) {
        //             alert('title already exist')
        //         } else {
        //             await AsyncStorage.setItem(title, description)
        //             props.navigation.navigate('MAIN')
        //         }
        //     } catch (e) {
        //         console.log(e)
        //     }

        // } else {
        //     alert('kindly add title and dsecription')
        // }
    }
    const onSignoutPressed = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            props.navigation.navigate("LOGIN")
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <View><Button title="Sign out" onPress={() => onSignoutPressed()} /></View>
                    <View><Text>|</Text></View>
                    <View><Button title="HOME" onPress={() => props.navigation.goBack('MAIN')} /></View>
                </View>
                <View style={{ ...styles.card, height: '8%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        autoFocus={true}
                        placeholder={'Enter title'}
                        value={title}
                        editable={noteTitle?false:true}
                        onChangeText={(t) => setTitle(t)}
                    />

                </View >
                <View style={{ ...styles.card, height: '60%' }}>
                    <TextInput
                        style={{ margin: 10 }}
                        multiline={true}
                        value={description}
                        placeholder={'Write here'}
                        onChangeText={(t) => setDescription(t)}
                    />
                </View>
                <TouchableOpacity onPress={() => onAddPressed()} >
                    <View style={{ marginTop: 5, marginBottom: 20 }}>
                        <Image
                            style={styles.BTN}
                            source={SAVE_BTN}
                        />
                        {!noteTitle ? <Text style={styles.textStyle}>Save</Text> : <Text style={styles.textStyle}>Update</Text>}
                    </View>
                </TouchableOpacity>
                <View>
                    <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                        servePersonalizedAds // true or false
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: Platform.OS === 'android' ? 30 : 2
    }, card: {
        backgroundColor: color_white,
        borderRadius: 20,
        margin: 10,
        shadowColor: '#781E77',
        borderColor: color_BLACK,
        borderWidth: 0.5,
        elevation: 10,
        // add shadows for iOS only
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4
    }, textStyle: {
        alignSelf: "center",
        fontWeight: "bold",
        width: 80,
        textAlign: 'center',
        color: '#781E77',
        //textAlign: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.2
    }, BTN: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'darkgrey',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4,

    }, Back_BTN: {
        height: 40,
        width: '80%',
        color: '#4F4F4F',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'darkgrey',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4,
        backgroundColor: color_white

    }, BB_text: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 5,
        textAlign: 'center',
        color: '#781E77',
        //textAlign: 'center',
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 6, height: 2 },
        shadowOpacity: 0.2
    }, bottomBanner: {
        position: "absolute",
        bottom: 0
    }

})
export default CreatNote;