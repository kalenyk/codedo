import React from "react";
import Rnd from "react-rnd";

const style = {
    border: "2px solid red",
    zIndex: 1,

};
const screen = {
    width: 1280,
    height: 720
};
export default class DataContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
            url:""
        }
    }

    componentDidMount() {
        this.setState({
            height: this.props.height,
            width: this.props.width,
            x: this.props.x,
            y: this.props.y,
            url:this.props.url
        });

    }

    render() {

        return (

            <Rnd

                style={style}
                size={{width: this.state.width, height: this.state.height}}
                position={{x: this.state.x, y: this.state.y}}
                onDragStop={(e, d) => {
                    if ((d.x < screen.width - this.state.width) && (d.y < screen.height - this.state.height) && d.x > 0 && d.y > 0) {
                        this.setState({x: d.x, y: d.y});
                        this.props.blockData({
                            height: this.state.height,
                            width: this.state.width,
                            x: this.state.x,
                            y: this.state.y,
                            url:this.state.url
                        })
                    }
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    if ((screen.height > this.state.y + ref.offsetHeight) && (screen.width > this.state.x + ref.offsetWidth) && this.state.x > 0 && this.state.y > 0) {
                        this.setState({
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                            ...position,
                        });
                        this.props.blockData({
                            height: this.state.height,
                            width: this.state.width,
                            x: this.state.x,
                            y: this.state.y,
                            url:this.state.url
                        })


                    }
                }}
            >
                {/*
                <video  src="../images/video.mp4.mp4"/>
*/}

                <div style={{
                    height: "100%",
                    width: "100%",
                    backgroundImage: `url(${this.props.url})`,
                    backgroundSize: "100% 100%"
                }}/>

            </Rnd>

        )
    }
}