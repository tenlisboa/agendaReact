import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/fontawesome-free-solid';
import '../App.css';

const pencil = (<FontAwesomeIcon icon={ faPencilAlt } style={{color: '#fff'}}/>)
const trash = (<FontAwesomeIcon icon={ faTrash }/>)

class ListContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactDeleted: ''
    }
  }

  /* Método para click no botão */
  handleClick = id => {

    swal({
      title: "Tem certeza?",
      text: "Se você deletar o contato não poderá recupera-lo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      /* Se foi sim */
      if(willDelete) {

        /* Padrão para formatação de dados para POST_REQUEST */
        let data = new FormData();
        data.append('id', id)

        /* Enviando POST_REQUEST */
        axios.post('http://api.agenda.siteparaempresa.online/deleta_contato', data)
          .then( res => {
            console.log(res);

            /* Atualizando estado */
            this.setState({
              contactDeleted: id
            });

            /* Enviando props de volta para o componente pai */
            this.props.contactDeleted(id)

          })
          swal("Feito! O contato foi deletado.", {
            icon: "success",
          });
      }
    })

  }

  render() {
    return (
        <tr>
          <td>{this.props.id}</td>
          <td>{this.props.nome}</td>
          <td>{this.props.fone}</td>
          <td>{this.props.email}</td>
          <td>
            <div>
              <button className="btn btn-warning" style={ styles.botao }>{ pencil }</button>
              <button className="btn btn-danger" onClick={() => this.handleClick(this.props.id) } style={ styles.botao }>{ trash }</button>
            </div>
          </td>
        </tr>
    );
  }
}

const styles = {
  botao: {
    width: 30,
    height: 30,
    padding: 5,
    marginRight: 5
  }
}

export default ListContacts;
