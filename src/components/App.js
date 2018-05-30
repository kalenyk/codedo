import React from "react";
import Layout from "./Layout";

export default class App extends React.Component {
    constructor(){
        super();
        this.renderLayout=this.renderLayout.bind(this);
        this.state={
            comparedData:"",
        }
    }

    renderLayout(){
        if(this.state.comparedData.length!==0){
            const data=JSON.parse(this.state.comparedData)
            return <Layout  comparedData={data}/>
        }
        return <Layout/>
    }
    render() {
        return (
            <div>
                {this.renderLayout()}
                <form>
                    <textarea placeholder="Past here image coordinate and url's" value={this.state.comparedData} onChange={(e)=>this.setState({comparedData:e.target.value})}/>

                </form>
            </div>
        )
    }
}