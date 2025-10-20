import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BasicCardProps {
    title: string;
    subTitle: string;
    source: any;
}

const BasicCard: React.FC<BasicCardProps> = ({
    title,
    subTitle,
    source
}) => {
    return (
        <TouchableOpacity>
            <Image
                style={styles.sectionImage}
                source={source}
            />
            <View>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionSubtitle}>{subTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    sectionImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        color: '#AAAAAA',
        fontSize: 14,
    },
});


export default BasicCard;