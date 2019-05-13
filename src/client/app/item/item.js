import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class View extends React.Component {
    render(){
        return(
            <Fragment>
                Item : {this.props.itemId}
            </Fragment>
        );
    }
}

View.defaultProps = {

};

View = connect(
    function (state, ownProps) {
        return {
            
        }
    }
)(View);

export { View };
