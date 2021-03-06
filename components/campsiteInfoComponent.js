import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
//import { CAMPSITES } from '../shared/campsites';
//import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

//function RenderCampsite({campsite}) {
function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                //image={require('./images/react-lake.jpg')}>
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin:10}}>
                    {campsite.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already marked as a favorite') : props.markFavorite()}
                    />
                    <Icon
                    style={styles.cardItem}
                    name='pencil'
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => props.onShowModal()}
                    />
                </View>
            </Card> 
        );
    }
    return <View /> //return something for falsy
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    onFinishRating={(rating)=>this.setState({rating: rating})}
                    style={{
                        alignItems: 'flex-start',
                        paddingVertical: '5%'
                    }}
                    readonly='true'
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )

    };


    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}


//convert campsiteinfo component into a class component
//function CampsiteInfo(props) {
class CampsiteInfo extends Component {
    
    /*constructor(props) {
        super(props);
        this.state = {
            //campsites: CAMPSITES,
            //comments: COMMENTS,
            favorite: false
        }
    }*/

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId) {
        console.log(JSON.stringify(this.state));
        this.props.toggleModal(campsiteId);
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        })
    }

    markFavorite(campsiteId) {
        //this.setState({favorite: true});
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }
    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        //const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        //const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        //return <RenderCampsite campsite={props.campsite} />;
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    //favorite={this.state.favorite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            startingValue={this.state.rating}
                            imageSize={50}
                            onFinishRating={(rating)=>this.setState({rating: rating})}
                            style={{paddingVertical: 15}}
                            fractions={1}
                            ratingCount={5}
                            showRating='true'
                        />
                        <Input
                            placeholder='Enter Your Name'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(author)=>this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Enter Your Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(text)=>this.setState({text: text})}
                            value={this.state.text}
                        />
                        <View style={{paddingTop: 25}}>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    };
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);