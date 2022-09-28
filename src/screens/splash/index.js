import { react,useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { BACKGROUND_COLOR } from '../../../res/drawables'


const Splash = (props) => {
    setTimeout(() => {
        props.navigation.replace('LOGIN')
    }, 2000);
    return (
        <View style={styles.container}>
            <View style={styles.logoshadow}>
                <Image style={styles.logo}
                    source={require('../../../assets/logo.png')} />
            </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
    }, logo: {
        height: 450,
        width: 280,
    }, logoshadow: {
        elevation: 10,
        // add shadows for iOS only
        shadowColor: '#781E77',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 0.4
    },
})
export default Splash;
