import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus, faAddressBook } from '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import swal from 'sweetalert';
import '../App.css';

/* Importando componentes */
import ListContacts from './ListContacts';

const plus = (<FontAwesomeIcon icon={ faPlus } style={{color: '#fff'}}/>)
const shedule = (<FontAwesomeIcon icon={ faAddressBook }/>)

export default class TableContacts extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nome: '',
      fone: '',
      email: '',
      contacts: []
    }
  }

  /* Metodo de carregamento, GET  */
  componentWillMount() {
    axios.get('http://api.agenda.siteparaempresa.online/contatos')
      .then(res => {
        let contacts = res.data;
        this.setState({contacts})
      })
      .catch( () => console.log('Erro ao recuperar dados') )
  }

  /* Manipulação da requisição POST */
  handleNomeChange = event => {
    this.setState({ nome: event.target.value})
  }

  handleFoneChange = event => {
    this.setState({ fone: event.target.value})
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value})
  }

  /* Click no botão para envio de formulário */
  handleClick = event => {
    /* Padrão para formatação de dados para POST_REQUEST */
    let contact = new FormData();
    contact.append('nome', this.state.nome);
    contact.append('fone', this.state.fone);
    contact.append('mail', this.state.email);

    /* Enviando POST_REQUEST com Axios */
    axios.post('http://api.agenda.siteparaempresa.online/novo_contato', contact)
      .then( res => {
        console.log(res);

        /* Formatando array para atualização na tela */
        contact = [{
          ID: res.data.retorno.ID,
          NOME: this.state.nome,
          TELEFONE: this.state.fone,
          EMAIL: this.state.email
        }];

        /* Trata e concatena o novo valor a lista de contatos */
        if(this.state.contacts !== null){
          this.setState({contacts: this.state.contacts.concat(contact),
                          nome: '',
                          fone: '',
                          email: ''
                        });
        } else {
          this.setState({contacts: contact})
        }

        swal("Feito!", "Contato adicionado com successo!", "success");

      } )
      .catch( err => {
        console.log(err);

        swal("ERRO!", "Falha ao adicionar contato!", "warning");
      })

  }

  /* Callback para receber as props de um componente filho */
  callbackContact = contact => {

    this.setState({ contactDeleted: contact })

    let id_del = this.state.contactDeleted;
    this.setState({ contacts: this.state.contacts.filter(contact => contact.ID !== id_del)})

  }

  render() {

    return (
      <div>
        <div style={ styles.TableContacts }>
          <table className='table' >
            <tbody>
              <tr>
                <td>{shedule}</td>
                <td><input type='text' value={ this.state.nome } onChange={ this.handleNomeChange }/></td>
                <td><input type='text' value={ this.state.fone } onChange={ this.handleFoneChange }/></td>
                <td><input type='text' value={ this.state.email } onChange={ this.handleEmailChange }/></td>
                <td><button type='button' className='btn btn-success' onClick={ this.handleClick }>{plus}ADD</button></td>
              </tr>
              <tr>
                <th>#</th>
                <th>Nome:</th>
                <th>Fone:</th>
                <th>E-mail:</th>
                <th>Ações:</th>
              </tr>
              {
                this.state.contacts !== null? this.state.contacts.map( contact => ( <ListContacts contactDeleted={ this.callbackContact } id={ contact.ID } nome={ contact.NOME } fone={ contact.TELEFONE } email={ contact.EMAIL } /> )):<td></td>
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const styles = {
  TableContacts: {
    width: '90%',
    marginRight: '5%',
    marginLeft: '5%'
  },
  btnAdd: {
  }
}
