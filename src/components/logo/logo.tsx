import React from "react";
import { View, Image, StyleSheet } from 'react-native';

export function Logo({style = {}}) {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('../../assets/restaurant.png')} style={[styles.logo,style]} resizeMode="contain"/>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems:'center'
    },
    logo: {
        width: 150,
        height: 270,
    },
});