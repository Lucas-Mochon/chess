import { Image, StyleSheet, Text, View } from "react-native";


const PremiumBanner: React.FC = () => {
    return (
        <View style={styles.banner}>
            <Image
                style={styles.bannerPicture}
                source={require('../assets/images/diamond.jpg')}
            />
            <View style={styles.textContainer}>
                <Text style={styles.bannerText}>Essayez Premium</Text>
                <Text style={styles.bannerSubText}>Donnez le meilleur de vous-même</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    banner: {
        backgroundColor: "#0096D6",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
    },
    bannerPicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: "column",
    },
    bannerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    bannerSubText: {
        color: "white",
        fontSize: 14,
    },
});

export default PremiumBanner;