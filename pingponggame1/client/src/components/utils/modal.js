import React ,{ Component } from 'react'
import Fade from 'react-reveal/Fade'


class Modal extends Component{

    render(){
        return(
            <Fade>
           
                <div className="container" style={{background:"white" , textAlign :"center",width:"40%" ,color : "black",position:"absolute",top:"20%",left:"30%",transform:"translate(-50%,-50%)"}}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="card" style={{zIndex:1000}}>
                                <div className="card-title">
                                   <h2>Waiting for the other player to join</h2>
                                </div>
                                <div className="card-body" style={{zIndex:100000}}>
                                <h3>Share Code : </h3> {this.props.code}
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            
            </Fade>
        )
    }

}

export default Modal