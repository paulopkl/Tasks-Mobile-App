import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commonStyles';

import moment from 'moment';

import 'moment/locale/pt-br';

const Tasks = props => {

    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : { }

    const date = props.doneAt ? props.doneAt : props.estimateAt;
    const formattedDate = moment(date)
        .locale('pt-br')
        .format('dddd, D [de] MMMM');

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }
    
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={30} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toogleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    );
}

const getCheckView = doneAt => {

    if(doneAt !== null) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={20} color="#FFF" />
            </View>
        );
    } else {
        return (
            <View style={styles.pending} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },

    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#4D7031',
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },

    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },

    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },

    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },

    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },

    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
    
    excludeIcon: {
        marginLeft: 10
    }
})

export default Tasks;