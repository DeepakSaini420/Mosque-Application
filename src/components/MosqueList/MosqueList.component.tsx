import { View,StyleSheet,FlatList } from "react-native"
import { useSelector } from "react-redux"
import { selectMosques } from "../../redux/mosques/mosqueSelector";
import { Mosques } from "../../redux/mosques/mosqueSlice";
import MosqueName from "./MosueName/MosqueName.component";

const MosqueList = ({}):JSX.Element => {

    const names:Mosques[] = useSelector(selectMosques);
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={names}
                showsHorizontalScrollIndicator={true}
                renderItem={(data)=> {
                    return <MosqueName location={data.item.location} id={data.item.id} key={data.item.id} name={data.item.name}/>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        padding:8,
        width:350,
        height:700,
        top:25,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius:10
    }
})

export default MosqueList;