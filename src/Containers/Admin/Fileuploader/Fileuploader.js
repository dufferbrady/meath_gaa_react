import React, { Component } from 'react';

import Fileupload from 'react-firebase-file-uploader'
import { firebase } from '../../../Firebase'
import Spinner from '../../../Components/UI/Spinner/Spinner'

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

        console.log(filename)

        this.setState({
            name: filename,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir)
            .child(filename).getDownloadURL()
            .then(url => {
                this.setState({ fileURL: url })
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
                    <div>
                        <div>{this.props.tag}</div>
                        <Fileupload
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
                    <div>
                        <img
                            style={{
                                width: '100%'
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        />
                        <div onClick={() => this.uploadAgain()}>
                            Remove
                        </div>
                    </div>

                    : null
                }
            </div>
        );
    }
}

export default Fileuploader;