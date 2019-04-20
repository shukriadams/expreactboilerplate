import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { populateList } from './../actions/list';


class View extends React.Component {

    async loadList(){
        populateList();
    }

    render(){
        return(
            <Fragment>
                <button onClick={this.loadList.bind(this)}>Load list</button>

                <ul>
                    {
                        this.props.items.map((item)=>{
                            return(                            
                                <li key={item}>
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
                
            </Fragment>
        );
    }
}

export default connect(
    function (state) {
        return {
            items : state.list.items
        }
    }
)(View);