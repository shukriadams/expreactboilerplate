import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class View extends React.Component {

    render(){
        return(
            <Fragment>
                Default
            </Fragment>
        );
    }
}


export default connect(
    function (state) {
        return {
            
        }
    }

)(View);