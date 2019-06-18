import React, { Component } from 'react';

import Fileupload from 'react-firebase-file-uploader'
import { firebase, firebasePlayers } from '../../../Firebase'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import classes from './Fileuploader.module.css'
import Button from '@material-ui/core/Button'

class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading: false
        })
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            name: filename,
            isUploading: false
        });

        console.log(filename)
        firebase
            .storage()
            .ref(this.props.dir)
            .child(filename)
            .getDownloadURL()
            .then(url => {
                console.log(url)
                this.setState({ fileURL: url })
                this.props.fileURL(url)
            })

        this.props.filename(filename)

    }


    static getDerivedStateFromProps(props, state) {
        if (props.defaultImg) {
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null
    }


    uploadAgain = () => {
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div className={classes.Image_Upload}>
                        <div className={classes.Tag}>
                            {this.props.tag}
                        </div>
                        <Fileupload
                            style={{ color: '#FED206' }}
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    : null
                }
                {this.state.isUploading ?
                    <div
                        style={{ textAlign: 'center', margin: '30px 0' }}
                    >
                        <Spinner height={'75px'} width={'75px'} marginLeft={'15%'} />
                    </div>
                    : null
                }
                {this.state.fileURL ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginBottom: '30px'
                    }}>
                        <img
                            style={{
                                width: '75%'
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        />
                        <div onClick={() => this.uploadAgain()}>
                            <Button
                                variant="contained"
                                style={{
                                    background: '#DF4554',
                                    color: 'white',
                                    marginLeft: '10px'
                                }}>
                                Remove</Button>
                        </div>
                    </div>

                    : null
                }
            </div>
        );
    }
}

export default Fileuploader;