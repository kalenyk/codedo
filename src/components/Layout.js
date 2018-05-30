import React from 'react';
import DataContainer from "./DataContainer";

const styles = {
    height: 720,
    width: 1280,
    border: "3px solid black"
};

class Layout extends React.Component {
    constructor() {
        super();
        this.compareData = this.compareData.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);
        this.showResult = this.showResult.bind(this);
        this.addContent = this.addContent.bind(this);
        this.renderBlocks=this.renderBlocks.bind(this);
        this.state = {
            contentArr: [],
            urlsArr: [],
            url:""
        }
    }

    checkDuplicates(url) {
        for (let i = 0; i < this.state.contentArr.length; i++) {
            if (this.state.contentArr[i].url === url) return i;
        }
        return false
    }

    compareData(data) {
        console.log(data);
        const duplicate = this.checkDuplicates(data.url);
        let contentArr = this.state.contentArr;

        if (duplicate || typeof duplicate === "number") {
            contentArr[duplicate] = data;
            this.setState({
                contentArr: contentArr
            })
        }
        else {
            contentArr.push(data);
            this.setState({
                contentArr: contentArr
            })
        }

    }

    showResult() {
        alert("Look at console");
        console.log(JSON.stringify(this.state.contentArr));
    }

    addContent(url) {
        const duplicate=this.checkDuplicates(url);
        if(!(duplicate || typeof duplicate==="number" || url.length===0)){
            let contentArr=this.state.contentArr;
            contentArr.push({url:url,height:140,width:350,x:Math.floor(Math.random() * 930),y:Math.floor(Math.random()*580)});

            this.setState({
                urlsArr:contentArr
            })
        }
        else alert("Duplicate URL")

        this.setState({url:""})
    }
renderBlocks(){
         if(this.props.comparedData && this.props.comparedData.length!==0){
            return this.props.comparedData.map(item => {
                console.log(item)
                return <DataContainer key={Math.floor(Math.random()*(1000-1))} width={item.width} height={item.height} x={item.x} y={item.y} url={item.url}
                                      blockData={this.compareData}/>
            })
        }
        else{
            return this.state.contentArr.map(item => {
                return <DataContainer key={Math.floor(Math.random()*(1000-1))} width={item.width} height={item.height} x={item.x} y={item.y} url={item.url}
                                      blockData={this.compareData}/>
            })
        }
}
    render() {

        return (
            <div style={styles}>
                <form>
                    <input type="text" value={this.state.url} onChange={(event) => this.setState({url:event.target.value})}/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        this.addContent(this.state.url)
                    }}>Submit
                    </button>
                </form>
                {this.renderBlocks()}
                <button onClick={this.showResult}>Show data</button>
            </div>
        );
    }
}

export default Layout;
