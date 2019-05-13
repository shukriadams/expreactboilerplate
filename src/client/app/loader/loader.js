import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data : null
        }
    }

    async componentDidMount(){
        let data = await this.props.action();
        this.setState(data);
    }

    render(){
        const Child = ()=> <div>{this.props.children}</div>        
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
                        <div>
                             {React.cloneElement(this.props.children, this.state)}
                        </div>
                }
            </Fragment>
        );
    }
}

View.defaultProps = {
    child : null
};

View = connect(
    function (state, ownProps) {
        return {
            
        }
    }
)(View);

export { View };
