import React, {Component} from 'react'
import './footer.css'
import github from '../../../src/assets/img/github.png'
import email from '../../../src/assets/img/email.png'
import linkedin from '../../../src/assets/img/linkedin.png'

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="main-footer">
                    <div className="footer-block">
                        <span className="block-title">SOBRE</span>
                        <br/>
                        <div className="block-text">
                            <span >O Car Security é uma plataforma desenvolvida como trabalho de conclusão de curso do aluno Marcus Vinicius Leite Costa
                                da Universidade Federal de Campina Grande, cujo objetivo é oferecer um sistema capaz de realizar detecções de placas
                                veiculares de forma automática e simples.
                            </span>
                        </div>
                    </div>
                    <div className="footer-block">
                        <span className="block-title">CONTATO</span>
                        <div className="block-icons">
                            <a href="https://github.com/marcusvlc" target="_blank"><img className="footer-icon" src={github}/></a>
                            <a href="https://www.linkedin.com/in/marcus-vinicius-172210171/" target="_blank"><img className="footer-icon" src={linkedin}/></a>
                            <a href="marcus.costa@ccc.ufcg.edu.br"><img className="footer-icon" src={email}/></a>
                        </div>
                    </div>
                    <div className="footer-block">
                        <span className="block-title">LOCALIZAÇÃO</span>
                        <div className="block-text">
                            <span>
                                (UFCG) R. Aprígio Veloso, 882 - Universitário, Campina Grande - PB, 58428-830
                            </span>
                        </div>
                    </div>
                </div>
                <div className="footer-end">
                    <span className="copyright">Copyright © Marcus Costa - {new Date().getFullYear()}</span>
                </div>
            </div>
        )
    }
}

export default Footer