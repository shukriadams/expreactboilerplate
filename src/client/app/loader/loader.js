import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data : null
        }
    }

    async componentWillReceiveProps(props){
        let data = await props.action();
        let newState = {};
        newState[props.dataAttribute] = data;
        this.setState(newState);        
    }

    render(){
        return(
            <Fragment>
                {
                    !this.state.data  && 
                        <div>
                            Wait for data ...
                        </div>
                }

                {
                    this.state.data  && 
                        <Fragment>
                             {React.cloneElement(this.props.children, this.state)}
                        </Fragment>
                }
            </Fragment>
        );
    }
}

View.defaultProps = {
    child : null,
    dataAttribute : 'myData'
};

export { View };
